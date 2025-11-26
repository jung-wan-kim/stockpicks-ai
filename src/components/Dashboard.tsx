import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Target, Award, BarChart3, Zap, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { BlurOverlay } from "./BlurOverlay";
import { fetchRecommendations, fetchStockChart, type Recommendation, type ChartDataPoint } from "../lib/api";

interface DashboardProps {
  isPremium: boolean;
  onUnlock: () => void;
}

export function Dashboard({ isPremium, onUnlock }: DashboardProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch recommendations on mount
  useEffect(() => {
    async function loadRecommendations() {
      try {
        setLoading(true);
        const data = await fetchRecommendations(10);
        setRecommendations(data.recommendations);

        // Select first stock for chart
        if (data.recommendations.length > 0) {
          const firstSymbol = data.recommendations[0].symbol;
          setSelectedStock(firstSymbol);
          loadChartData(firstSymbol);
        }
      } catch (err) {
        setError('Failed to load recommendations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadRecommendations();
  }, []);

  // Load chart data for selected stock
  async function loadChartData(symbol: string) {
    try {
      setChartLoading(true);
      const data = await fetchStockChart(symbol, '1mo', '1d');
      setChartData(data.chartData);
      setCurrentPrice(data.regularMarketPrice);
    } catch (err) {
      console.error(`Failed to load chart for ${symbol}:`, err);
      setChartData([]);
    } finally {
      setChartLoading(false);
    }
  }

  // Calculate stats from recommendations
  const buySignals = recommendations.filter(r => r.action === 'buy').length;
  const sellSignals = recommendations.filter(r => r.action === 'sell').length;
  const totalSignals = recommendations.length;

  // Format chart data for Recharts
  const formattedChartData = chartData.map(d => ({
    date: d.date.slice(5), // MM-DD format
    close: parseFloat(d.close),
    volume: d.volume
  }));

  // Calculate price change
  const priceChange = formattedChartData.length >= 2
    ? ((formattedChartData[formattedChartData.length - 1].close - formattedChartData[0].close) / formattedChartData[0].close * 100)
    : 0;

  return (
    <div className="p-[24px] space-y-[16px]">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-[16px]">
        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center justify-between mb-[12px]">
            <span className="text-gray-500 text-[13px]">Total Signals</span>
            <BarChart3 className="size-[14px] text-gray-600" />
          </div>
          <div className="text-white text-[28px]">{totalSignals}</div>
          <div className="text-gray-500 text-[12px] mt-[6px]">From TradingView</div>
        </div>

        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center justify-between mb-[12px]">
            <span className="text-gray-500 text-[13px]">Buy Signals</span>
            <TrendingUp className="size-[14px] text-green-500" />
          </div>
          <div className="text-green-400 text-[28px]">{buySignals}</div>
          <div className="text-gray-500 text-[12px] mt-[6px]">Active buy recommendations</div>
        </div>

        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center justify-between mb-[12px]">
            <span className="text-gray-500 text-[13px]">Sell Signals</span>
            <TrendingDown className="size-[14px] text-red-500" />
          </div>
          <div className="text-red-400 text-[28px]">{sellSignals}</div>
          <div className="text-gray-500 text-[12px] mt-[6px]">Active sell recommendations</div>
        </div>

        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center justify-between mb-[12px]">
            <span className="text-gray-500 text-[13px]">Latest Signal</span>
            <Zap className="size-[14px] text-yellow-500" />
          </div>
          <div className="text-white text-[28px]">
            {recommendations[0]?.symbol || '-'}
          </div>
          <div className="text-gray-500 text-[12px] mt-[6px]">
            {recommendations[0]?.action?.toUpperCase() || 'No signals'}
          </div>
        </div>
      </div>

      {/* Chart & Recommendations */}
      <div className="grid grid-cols-[1fr_400px] gap-[16px]">
        {/* Stock Chart */}
        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center justify-between mb-[20px]">
            <div>
              <h3 className="text-white text-[16px] mb-[4px]">
                {selectedStock || 'Select a Stock'}
                {currentPrice && <span className="text-gray-500 ml-2">${currentPrice.toFixed(2)}</span>}
              </h3>
              <p className="text-gray-500 text-[12px]">
                Daily price chart (1 month)
                {priceChange !== 0 && (
                  <span className={`ml-2 ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                  </span>
                )}
              </p>
            </div>
            {/* Stock selector */}
            <select
              value={selectedStock || ''}
              onChange={(e) => {
                setSelectedStock(e.target.value);
                loadChartData(e.target.value);
              }}
              className="bg-gray-950 text-white text-[12px] px-[10px] py-[6px] rounded-[4px] border border-gray-800"
            >
              {recommendations.map((rec) => (
                <option key={rec.id} value={rec.symbol}>
                  {rec.symbol} - {rec.action.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {chartLoading ? (
            <div className="flex items-center justify-center h-[280px]">
              <Loader2 className="size-[24px] text-gray-500 animate-spin" />
            </div>
          ) : formattedChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={formattedChartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={priceChange >= 0 ? "#10b981" : "#ef4444"} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={priceChange >= 0 ? "#10b981" : "#ef4444"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                <XAxis
                  dataKey="date"
                  stroke="#6b7280"
                  tick={{ fontSize: 11 }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  stroke="#6b7280"
                  tick={{ fontSize: 11 }}
                  domain={['auto', 'auto']}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#000", border: "1px solid #1a1a1a", borderRadius: "4px" }}
                  labelStyle={{ color: "#fff" }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
                />
                <Area
                  type="monotone"
                  dataKey="close"
                  stroke={priceChange >= 0 ? "#10b981" : "#ef4444"}
                  strokeWidth={2}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[280px] text-gray-500">
              No chart data available
            </div>
          )}
        </div>

        {/* Today's Top Recommendations */}
        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900 relative">
          {!isPremium && <BlurOverlay onClick={onUnlock} message="Unlock AI Recommendations" />}

          <div className="flex items-center justify-between mb-[16px]">
            <h3 className="text-white text-[15px]">Latest Signals</h3>
            <span className="px-[8px] py-[2px] bg-white text-black rounded-[3px] text-[11px]">LIVE</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-[200px]">
              <Loader2 className="size-[24px] text-gray-500 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-red-400 text-[12px]">{error}</div>
          ) : (
            <div className="space-y-[10px] max-h-[400px] overflow-y-auto">
              {recommendations.slice(0, 5).map((rec) => (
                <div
                  key={rec.id}
                  className={`bg-gray-950 rounded-[4px] p-[12px] cursor-pointer transition-colors ${
                    selectedStock === rec.symbol ? 'border border-white' : 'hover:border hover:border-gray-700'
                  }`}
                  onClick={() => {
                    setSelectedStock(rec.symbol);
                    loadChartData(rec.symbol);
                  }}
                >
                  <div className="flex items-start justify-between mb-[8px]">
                    <div>
                      <div className={`text-[14px] mb-[2px] ${isPremium ? "text-white" : "text-white blur-[4px]"}`}>
                        {rec.symbol}
                      </div>
                      <div className={`text-[11px] ${isPremium ? "text-gray-500" : "text-gray-500 blur-[4px]"}`}>
                        {rec.strategy}
                      </div>
                    </div>
                    <div className={`px-[6px] py-[2px] rounded-[3px] text-[10px] ${
                      rec.action === "buy" ? "bg-green-400 text-black" :
                      rec.action === "sell" ? "bg-red-400 text-white" :
                      "bg-gray-700 text-white"
                    }`}>
                      {rec.action.toUpperCase()}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-[8px] text-[11px]">
                    <div>
                      <div className="text-gray-500">Signal Price</div>
                      <div className="text-white">${rec.price?.toFixed(2) || '-'}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Timeframe</div>
                      <div className="text-white">{rec.timeframe || '1D'}</div>
                    </div>
                  </div>

                  <div className="text-gray-600 text-[10px] mt-[8px]">
                    {new Date(rec.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}

          <button className="w-full mt-[12px] py-[8px] bg-white text-black rounded-[4px] text-[12px] hover:bg-gray-200 transition-colors">
            View All Signals
          </button>
        </div>
      </div>

      {/* Recent Signals Table */}
      <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
        <h3 className="text-white text-[15px] mb-[12px]">All Trading Signals</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-900">
                <th className="text-left text-gray-500 pb-[10px] text-[12px]">Symbol</th>
                <th className="text-left text-gray-500 pb-[10px] text-[12px]">Action</th>
                <th className="text-right text-gray-500 pb-[10px] text-[12px]">Price</th>
                <th className="text-right text-gray-500 pb-[10px] text-[12px]">Volume</th>
                <th className="text-right text-gray-500 pb-[10px] text-[12px]">Strategy</th>
                <th className="text-right text-gray-500 pb-[10px] text-[12px]">Time</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((rec) => (
                <tr
                  key={rec.id}
                  className="border-b border-gray-900 hover:bg-gray-950 cursor-pointer"
                  onClick={() => {
                    setSelectedStock(rec.symbol);
                    loadChartData(rec.symbol);
                  }}
                >
                  <td className="py-[12px] text-white text-[13px]">{rec.symbol}</td>
                  <td className="py-[12px]">
                    <span className={`px-[6px] py-[2px] rounded-[3px] text-[10px] ${
                      rec.action === "buy" ? "bg-green-400 text-black" :
                      rec.action === "sell" ? "bg-red-400 text-white" :
                      "bg-gray-700 text-white"
                    }`}>
                      {rec.action.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-[12px] text-right text-white text-[12px]">
                    ${rec.price?.toFixed(2) || '-'}
                  </td>
                  <td className="py-[12px] text-right text-gray-400 text-[12px]">
                    {rec.volume?.toLocaleString() || '-'}
                  </td>
                  <td className="py-[12px] text-right text-gray-400 text-[12px]">
                    {rec.strategy}
                  </td>
                  <td className="py-[12px] text-right text-gray-500 text-[11px]">
                    {new Date(rec.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
