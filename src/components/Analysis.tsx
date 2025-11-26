import { useState, useEffect } from "react";
import { Search, TrendingUp, TrendingDown, BarChart3, Activity, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Area } from "recharts";
import { fetchRecommendations, fetchStockChart, Recommendation, StockChartData, getSignalsForSymbol, mergeChartWithSignals, ChartDataWithSignals } from "../lib/api";

interface AnalysisProps {
  isPremium: boolean;
  onUnlock: () => void;
}

export function Analysis({ isPremium, onUnlock }: AnalysisProps) {
  const [selectedStock, setSelectedStock] = useState<string>("");
  const [stockList, setStockList] = useState<{ symbol: string; action: string; price: number; createdAt: string }[]>([]);
  const [chartData, setChartData] = useState<ChartDataWithSignals[]>([]);
  const [stockInfo, setStockInfo] = useState<StockChartData | null>(null);
  const [allSignals, setAllSignals] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Load stock list from recommendations
  useEffect(() => {
    async function loadStockList() {
      try {
        setLoading(true);
        const data = await fetchRecommendations(50);
        setAllSignals(data.allSignals);

        // Get unique stocks with their latest recommendation
        const stockMap = new Map<string, { symbol: string; action: string; price: number; createdAt: string }>();
        data.recommendations.forEach((rec) => {
          if (!stockMap.has(rec.symbol)) {
            stockMap.set(rec.symbol, {
              symbol: rec.symbol,
              action: rec.action,
              price: rec.price,
              createdAt: rec.createdAt,
            });
          }
        });

        const stocks = Array.from(stockMap.values());
        setStockList(stocks);

        // Select first stock by default
        if (stocks.length > 0 && !selectedStock) {
          setSelectedStock(stocks[0].symbol);
        }
      } catch (err) {
        console.error("Failed to load stocks:", err);
        setError("Failed to load stock list");
      } finally {
        setLoading(false);
      }
    }
    loadStockList();
  }, []);

  // Load chart data when stock is selected
  useEffect(() => {
    if (!selectedStock) return;

    async function loadChartData() {
      try {
        setChartLoading(true);
        const data = await fetchStockChart(selectedStock, "3mo", "1d");
        setStockInfo(data);

        // Merge chart data with signals
        const stockSignals = getSignalsForSymbol(allSignals, selectedStock);
        const mergedData = mergeChartWithSignals(data.chartData, stockSignals);
        setChartData(mergedData);
      } catch (err) {
        console.error("Failed to load chart data:", err);
        setChartData([]);
      } finally {
        setChartLoading(false);
      }
    }
    loadChartData();
  }, [selectedStock, allSignals]);

  const filteredStocks = stockList.filter((s) =>
    s.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get signals for selected stock
  const stockSignals = getSignalsForSymbol(allSignals, selectedStock);
  const buySignals = stockSignals.filter((s) => s.action.toLowerCase() === "buy");
  const sellSignals = stockSignals.filter((s) => s.action.toLowerCase() === "sell");

  // Custom dot component for signals
  const SignalDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (!payload.signal) return null;

    const isBuy = payload.signal === "buy";
    const color = isBuy ? "#10b981" : "#ef4444";

    return (
      <g>
        <circle cx={cx} cy={cy} r={8} fill={color} fillOpacity={0.3} />
        <circle cx={cx} cy={cy} r={5} fill={color} stroke="white" strokeWidth={1.5} />
        <text x={cx} y={cy + 3} textAnchor="middle" fill="white" fontSize={8} fontWeight="bold">
          {isBuy ? "▲" : "▼"}
        </text>
      </g>
    );
  };

  if (loading) {
    return (
      <div className="p-[24px] flex items-center justify-center h-[400px]">
        <div className="text-center">
          <Loader2 className="size-[32px] text-white animate-spin mx-auto mb-[12px]" />
          <p className="text-gray-500 text-[13px]">Loading stock analysis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-[24px] flex items-center justify-center h-[400px]">
        <div className="text-center">
          <p className="text-red-400 text-[14px] mb-[8px]">{error}</p>
          <button onClick={() => window.location.reload()} className="text-white text-[13px] underline">
            Try again
          </button>
        </div>
      </div>
    );
  }

  // Calculate price change
  const priceChange = stockInfo?.previousClose
    ? stockInfo.regularMarketPrice - stockInfo.previousClose
    : 0;
  const priceChangePercent = stockInfo?.previousClose
    ? ((priceChange / stockInfo.previousClose) * 100).toFixed(2)
    : "0.00";

  return (
    <div className="p-[24px]">
      <div className="grid grid-cols-[280px_1fr] gap-[16px]">
        {/* Stock List */}
        <div className="bg-black rounded-[4px] border border-gray-900 flex flex-col">
          <div className="p-[20px] border-b border-gray-900">
            <h3 className="text-white text-[15px] mb-[12px]">Search Stock</h3>
            <div className="relative">
              <Search className="absolute left-[10px] top-[8px] size-[14px] text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-950 text-white rounded-[4px] pl-[32px] pr-[10px] py-[7px] border border-gray-900 text-[12px]"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[500px]">
            <div className="p-[12px]">
              <div className="text-gray-500 text-[11px] mb-[8px]">Stocks with Signals ({filteredStocks.length})</div>
              {filteredStocks.length === 0 ? (
                <div className="text-gray-600 text-[12px] text-center py-[20px]">No stocks found</div>
              ) : (
                filteredStocks.map((s) => (
                  <button
                    key={s.symbol}
                    onClick={() => setSelectedStock(s.symbol)}
                    className={`w-full p-[10px] text-left rounded-[4px] mb-[4px] transition-colors ${
                      selectedStock === s.symbol ? "bg-gray-950" : "hover:bg-gray-950"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-[2px]">
                      <span className="text-white text-[13px]">{s.symbol}</span>
                      <span className="text-white text-[12px]">${s.price?.toFixed(2) || "N/A"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] ${s.action.toLowerCase() === "buy" ? "text-green-400" : "text-red-400"}`}>
                        {s.action.toUpperCase()}
                      </span>
                      <span className="text-gray-500 text-[10px]">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Analysis Panel */}
        <div className="space-y-[16px]">
          {selectedStock && stockInfo ? (
            <>
              {/* Stock Header */}
              <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-white text-[24px] mb-[4px]">{selectedStock}</h2>
                    <p className="text-gray-500 text-[13px] mb-[8px]">{stockInfo.currency || "USD"}</p>
                    <div className="flex items-center gap-[12px]">
                      <span className="text-white text-[32px]">${stockInfo.regularMarketPrice?.toFixed(2)}</span>
                      <div className="flex items-center gap-[4px]">
                        {priceChange >= 0 ? (
                          <TrendingUp className="size-[16px] text-green-400" />
                        ) : (
                          <TrendingDown className="size-[16px] text-red-400" />
                        )}
                        <span className={`text-[16px] ${priceChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {priceChange >= 0 ? "+" : ""}
                          {priceChange.toFixed(2)} ({priceChangePercent}%)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-[8px]">
                      <span className="px-[8px] py-[4px] bg-green-500/20 text-green-400 rounded-[4px] text-[12px]">
                        Buy: {buySignals.length}
                      </span>
                      <span className="px-[8px] py-[4px] bg-red-500/20 text-red-400 rounded-[4px] text-[12px]">
                        Sell: {sellSignals.length}
                      </span>
                    </div>
                    <div className="text-gray-500 text-[11px] mt-[8px]">Total signals: {stockSignals.length}</div>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
                <h3 className="text-white text-[15px] mb-[16px]">Price Movement with Signals</h3>
                {chartLoading ? (
                  <div className="flex items-center justify-center h-[250px]">
                    <Loader2 className="size-[24px] text-white animate-spin" />
                  </div>
                ) : chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <ComposedChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                      <XAxis
                        dataKey="date"
                        stroke="#6b7280"
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          return `${date.getMonth() + 1}/${date.getDate()}`;
                        }}
                      />
                      <YAxis stroke="#6b7280" domain={["auto", "auto"]} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#000", border: "1px solid #1a1a1a", borderRadius: "4px" }}
                        labelStyle={{ color: "#fff" }}
                        formatter={(value: any, name: string) => {
                          if (name === "close") return [`$${parseFloat(value).toFixed(2)}`, "Price"];
                          return [value, name];
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="close"
                        stroke="#10b981"
                        fill="url(#colorPrice)"
                        strokeWidth={2}
                        dot={<SignalDot />}
                      />
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                    </ComposedChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-[250px] text-gray-500 text-[13px]">
                    No chart data available
                  </div>
                )}

                {/* Legend */}
                <div className="flex items-center justify-center gap-[24px] mt-[12px]">
                  <div className="flex items-center gap-[6px]">
                    <div className="size-[12px] rounded-full bg-green-400" />
                    <span className="text-gray-400 text-[11px]">Buy Signal</span>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <div className="size-[12px] rounded-full bg-red-400" />
                    <span className="text-gray-400 text-[11px]">Sell Signal</span>
                  </div>
                </div>
              </div>

              {/* Signal History */}
              <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
                <h3 className="text-white text-[15px] mb-[12px]">Signal History</h3>
                {stockSignals.length === 0 ? (
                  <div className="text-gray-500 text-[13px]">No signals recorded for this stock</div>
                ) : (
                  <div className="space-y-[8px] max-h-[200px] overflow-y-auto">
                    {stockSignals.map((signal, idx) => (
                      <div key={idx} className="flex items-center justify-between p-[10px] bg-gray-950 rounded-[4px]">
                        <div className="flex items-center gap-[10px]">
                          {signal.action.toLowerCase() === "buy" ? (
                            <TrendingUp className="size-[14px] text-green-400" />
                          ) : (
                            <TrendingDown className="size-[14px] text-red-400" />
                          )}
                          <div>
                            <span className={`text-[12px] ${signal.action.toLowerCase() === "buy" ? "text-green-400" : "text-red-400"}`}>
                              {signal.action.toUpperCase()}
                            </span>
                            <span className="text-gray-500 text-[11px] ml-[8px]">{signal.strategy}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white text-[12px]">${signal.price?.toFixed(2)}</div>
                          <div className="text-gray-500 text-[10px]">
                            {new Date(signal.timestamp || signal.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-black rounded-[4px] p-[40px] border border-gray-900 text-center">
              <p className="text-gray-500 text-[14px]">Select a stock to view analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
