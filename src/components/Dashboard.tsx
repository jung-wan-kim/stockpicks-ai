import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, BarChart3, Zap, Loader2 } from "lucide-react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Area, ReferenceDot } from "recharts";
import { BlurOverlay } from "./BlurOverlay";
import {
  fetchRecommendations,
  fetchStockChart,
  mergeChartWithSignals,
  getSignalsForSymbol,
  type Recommendation,
  type ChartDataWithSignals
} from "../lib/api";

interface DashboardProps {
  isPremium: boolean;
  onUnlock: () => void;
  onNavigate?: (page: string) => void;
}

// Custom dot component for signal markers
const SignalDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (!payload.signal) return null;

  const isBuy = payload.signal === 'buy';
  const color = isBuy ? '#10b981' : '#ef4444';
  const size = 8;

  return (
    <g>
      {/* Outer circle */}
      <circle cx={cx} cy={cy} r={size + 4} fill={color} fillOpacity={0.3} />
      {/* Inner circle */}
      <circle cx={cx} cy={cy} r={size} fill={color} stroke="white" strokeWidth={2} />
      {/* Arrow */}
      <text x={cx} y={cy + 4} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold">
        {isBuy ? '▲' : '▼'}
      </text>
    </g>
  );
};

export function Dashboard({ isPremium, onUnlock, onNavigate }: DashboardProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [allSignals, setAllSignals] = useState<Recommendation[]>([]);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [chartData, setChartData] = useState<ChartDataWithSignals[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch recommendations on mount
  useEffect(() => {
    async function loadRecommendations() {
      try {
        setLoading(true);
        const data = await fetchRecommendations(20);
        setRecommendations(data.recommendations);
        setAllSignals(data.allSignals);

        // Select first stock for chart
        if (data.recommendations.length > 0) {
          const firstSymbol = data.recommendations[0].symbol;
          setSelectedStock(firstSymbol);
          loadChartData(firstSymbol, data.allSignals);
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

  // Load chart data for selected stock with signal markers
  async function loadChartData(symbol: string, signals?: Recommendation[]) {
    try {
      setChartLoading(true);
      const data = await fetchStockChart(symbol, '3mo', '1d');

      // Get signals for this symbol
      const symbolSignals = getSignalsForSymbol(signals || allSignals, symbol);

      // Merge chart data with signals
      const mergedData = mergeChartWithSignals(data.chartData, symbolSignals);

      // Add 5 future days with null close values for chart extension
      if (mergedData.length > 0) {
        const lastDate = new Date(mergedData[mergedData.length - 1].date);
        for (let i = 1; i <= 5; i++) {
          const futureDate = new Date(lastDate);
          futureDate.setDate(futureDate.getDate() + i);
          mergedData.push({
            date: futureDate.toISOString().split('T')[0],
            close: null as any,
            signal: null,
          });
        }
      }

      setChartData(mergedData);
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
    fullDate: d.date,
    close: parseFloat(d.close),
    volume: d.volume,
    signal: d.signal,
    signalPrice: d.signalPrice
  }));

  // Calculate price change (filter out null values for future dates)
  const validChartData = formattedChartData.filter(d => d.close != null);
  const priceChange = validChartData.length >= 2
    ? ((validChartData[validChartData.length - 1].close - validChartData[0].close) / validChartData[0].close * 100)
    : 0;

  // Get signal markers for reference dots
  const signalMarkers = formattedChartData.filter(d => d.signal);

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
          <div className="text-gray-500 text-[12px] mt-[6px]">Entry positions</div>
        </div>

        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center justify-between mb-[12px]">
            <span className="text-gray-500 text-[13px]">Sell Signals</span>
            <TrendingDown className="size-[14px] text-red-500" />
          </div>
          <div className="text-red-400 text-[28px]">{sellSignals}</div>
          <div className="text-gray-500 text-[12px] mt-[6px]">Exit positions</div>
        </div>

        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center justify-between mb-[12px]">
            <span className="text-gray-500 text-[13px]">Latest Signal</span>
            <Zap className="size-[14px] text-yellow-500" />
          </div>
          <div className="text-white text-[28px]">
            {recommendations[0]?.symbol || '-'}
          </div>
          <div className={`text-[12px] mt-[6px] ${recommendations[0]?.action === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
            {recommendations[0]?.action?.toUpperCase() || 'No signals'}
          </div>
        </div>
      </div>

      {/* Chart & Recommendations */}
      <div className="grid grid-cols-[1fr_400px] gap-[16px]">
        {/* Stock Chart with Signal Markers */}
        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center justify-between mb-[20px]">
            <div>
              <h3 className="text-white text-[16px] mb-[4px]">
                {selectedStock || 'Select a Stock'}
                {currentPrice && <span className="text-gray-500 ml-2">${currentPrice.toFixed(2)}</span>}
              </h3>
              <p className="text-gray-500 text-[12px]">
                Daily chart with entry/exit signals
                {priceChange !== 0 && (
                  <span className={`ml-2 ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-[12px]">
              {/* Legend */}
              <div className="flex items-center gap-[8px] text-[11px]">
                <div className="flex items-center gap-[4px]">
                  <div className="size-[10px] rounded-full bg-green-500" />
                  <span className="text-gray-400">Buy</span>
                </div>
                <div className="flex items-center gap-[4px]">
                  <div className="size-[10px] rounded-full bg-red-500" />
                  <span className="text-gray-400">Sell</span>
                </div>
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
          </div>

          {chartLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <Loader2 className="size-[24px] text-gray-500 animate-spin" />
            </div>
          ) : formattedChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={formattedChartData}>
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
                  contentStyle={{ backgroundColor: "#000", border: "1px solid #333", borderRadius: "4px" }}
                  labelStyle={{ color: "#fff" }}
                  formatter={(value: number, name: string) => {
                    if (name === 'close') return [`$${value.toFixed(2)}`, 'Price'];
                    return [value, name];
                  }}
                  labelFormatter={(label, payload) => {
                    const data = payload?.[0]?.payload;
                    if (data?.signal) {
                      return `${data.fullDate} - ${data.signal.toUpperCase()} Signal @ $${data.signalPrice?.toFixed(2) || data.close.toFixed(2)}`;
                    }
                    return data?.fullDate || label;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="close"
                  stroke={priceChange >= 0 ? "#10b981" : "#ef4444"}
                  strokeWidth={2}
                  fill="url(#colorPrice)"
                  dot={<SignalDot />}
                  connectNulls={false}
                />
                {/* Signal markers as reference dots */}
                {signalMarkers.map((marker, idx) => (
                  <ReferenceDot
                    key={idx}
                    x={marker.date}
                    y={marker.close}
                    r={0}
                    fill="none"
                    stroke="none"
                  />
                ))}
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              No chart data available
            </div>
          )}
        </div>

        {/* Latest Signals */}
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
            <div className="space-y-[10px] max-h-[420px] overflow-y-auto">
              {recommendations.slice(0, 6).map((rec) => (
                <div
                  key={rec.id}
                  className={`bg-gray-950 rounded-[4px] p-[12px] cursor-pointer transition-colors ${
                    selectedStock === rec.symbol ? 'border border-white' : 'border border-transparent hover:border-gray-700'
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
                    <div className={`px-[6px] py-[2px] rounded-[3px] text-[10px] flex items-center gap-[4px] ${
                      rec.action === "buy" ? "bg-green-400 text-black" :
                      rec.action === "sell" ? "bg-red-400 text-white" :
                      "bg-gray-700 text-white"
                    }`}>
                      {rec.action === "buy" ? "▲" : "▼"} {rec.action.toUpperCase()}
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

          <button
            onClick={() => onNavigate && onNavigate('recommendations')}
            className="w-full mt-[12px] py-[8px] bg-white text-black rounded-[4px] text-[12px] hover:bg-gray-200 transition-colors"
          >
            View All Signals
          </button>
        </div>
      </div>

      {/* All Trading Signals Table */}
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
                <th className="text-right text-gray-500 pb-[10px] text-[12px]">Timeframe</th>
                <th className="text-right text-gray-500 pb-[10px] text-[12px]">Time</th>
              </tr>
            </thead>
            <tbody>
              {allSignals.slice(0, 10).map((rec) => (
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
                      {rec.action === "buy" ? "▲" : "▼"} {rec.action.toUpperCase()}
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
                  <td className="py-[12px] text-right text-gray-400 text-[12px]">
                    {rec.timeframe || '1D'}
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
