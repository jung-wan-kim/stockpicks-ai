import { TrendingUp, TrendingDown, Award, Target } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const monthlyPerformance = [
  { month: "Jul", return: 2.3, benchmark: 1.5 },
  { month: "Aug", return: 5.2, benchmark: 2.1 },
  { month: "Sep", return: 3.8, benchmark: 1.8 },
  { month: "Oct", return: -2.5, benchmark: -1.2 },
  { month: "Nov", return: 8.7, benchmark: 3.4 },
  { month: "Dec", return: 6.1, benchmark: 2.8 },
];

const performanceByAction = [
  { action: "Strong Buy", value: 45, color: "#10b981" },
  { action: "Buy", value: 30, color: "#22c55e" },
  { action: "Hold", value: 15, color: "#a3a3a3" },
  { action: "Sell", value: 10, color: "#ef4444" },
];

const topPerformers = [
  { symbol: "META", name: "Meta Platforms", return: 31.7, duration: 60, action: "STRONG BUY" },
  { symbol: "AAPL", name: "Apple Inc.", return: 24.5, duration: 30, action: "BUY" },
  { symbol: "MSFT", name: "Microsoft", return: 18.3, duration: 45, action: "BUY" },
  { symbol: "NVDA", name: "NVIDIA", return: 15.8, duration: 25, action: "STRONG BUY" },
  { symbol: "TSLA", name: "Tesla", return: 12.4, duration: 20, action: "BUY" },
];

const poorPerformers = [
  { symbol: "GOOGL", name: "Alphabet", return: -3.2, duration: 15, action: "HOLD" },
  { symbol: "AMD", name: "AMD", return: -2.1, duration: 12, action: "HOLD" },
  { symbol: "COIN", name: "Coinbase", return: -1.5, duration: 8, action: "SPECULATIVE BUY" },
];

interface PerformanceProps {
  isPremium: boolean;
  onUnlock: () => void;
}

export function Performance({ isPremium, onUnlock }: PerformanceProps) {
  const totalReturn = 25.3;
  const winRate = 73.5;
  const totalPicks = 67;
  const winningPicks = 49;

  return (
    <div className="p-[24px] space-y-[16px]">
      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-[16px]">
        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center justify-between mb-[12px]">
            <span className="text-gray-500 text-[13px]">Total Return</span>
            <TrendingUp className="size-[14px] text-gray-600" />
          </div>
          <div className="text-white text-[28px]">+{totalReturn}%</div>
          <div className="text-green-400 text-[12px] mt-[6px]">Since joining</div>
        </div>

        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center justify-between mb-[12px]">
            <span className="text-gray-500 text-[13px]">Win Rate</span>
            <Target className="size-[14px] text-gray-600" />
          </div>
          <div className="text-white text-[28px]">{winRate}%</div>
          <div className="text-gray-500 text-[12px] mt-[6px]">{winningPicks} of {totalPicks} picks</div>
        </div>

        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center justify-between mb-[12px]">
            <span className="text-gray-500 text-[13px]">Avg Holding</span>
            <Award className="size-[14px] text-gray-600" />
          </div>
          <div className="text-white text-[28px]">32</div>
          <div className="text-gray-500 text-[12px] mt-[6px]">Days per pick</div>
        </div>

        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center justify-between mb-[12px]">
            <span className="text-gray-500 text-[13px]">Best Pick</span>
            <Award className="size-[14px] text-gray-600" />
          </div>
          <div className="text-white text-[28px]">+31.7%</div>
          <div className="text-gray-500 text-[12px] mt-[6px]">META (60 days)</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-[1fr_400px] gap-[16px]">
        {/* Monthly Performance */}
        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="mb-[20px]">
            <h3 className="text-white text-[16px] mb-[4px]">Monthly Performance</h3>
            <p className="text-gray-500 text-[12px]">Your returns vs S&P 500 benchmark</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: "#000", border: "1px solid #1a1a1a", borderRadius: "4px" }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar dataKey="return" fill="#10b981" name="Your Return" />
              <Bar dataKey="benchmark" fill="#6b7280" name="S&P 500" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance by Action */}
        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <h3 className="text-white text-[16px] mb-[20px]">Performance by AI Rating</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={performanceByAction}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ action, value }) => `${action}: ${value}%`}
              >
                {performanceByAction.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#000", border: "1px solid #1a1a1a", borderRadius: "4px" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-[16px] space-y-[6px]">
            {performanceByAction.map((item) => (
              <div key={item.action} className="flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-[6px]">
                  <div className="size-[10px] rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-400">{item.action}</span>
                </div>
                <span className="text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top & Poor Performers */}
      <div className="grid grid-cols-2 gap-[16px]">
        {/* Top Performers */}
        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center gap-[8px] mb-[12px]">
            <TrendingUp className="size-[16px] text-green-400" />
            <h3 className="text-white text-[15px]">Top Performers</h3>
          </div>
          <div className="space-y-[8px]">
            {topPerformers.map((stock, index) => (
              <div key={stock.symbol} className="flex items-center justify-between p-[10px] bg-gray-950 rounded-[4px]">
                <div className="flex items-center gap-[10px]">
                  <span className="text-gray-500 text-[12px]">#{index + 1}</span>
                  <div>
                    <div className="text-white text-[13px]">{stock.symbol}</div>
                    <div className="text-gray-500 text-[11px]">{stock.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 text-[13px]">+{stock.return}%</div>
                  <div className="text-gray-500 text-[11px]">{stock.duration} days</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Poor Performers */}
        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center gap-[8px] mb-[12px]">
            <TrendingDown className="size-[16px] text-red-400" />
            <h3 className="text-white text-[15px]">Areas for Improvement</h3>
          </div>
          <div className="space-y-[8px]">
            {poorPerformers.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between p-[10px] bg-gray-950 rounded-[4px]">
                <div>
                  <div className="text-white text-[13px]">{stock.symbol}</div>
                  <div className="text-gray-500 text-[11px]">{stock.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-red-400 text-[13px]">{stock.return}%</div>
                  <div className="text-gray-500 text-[11px]">{stock.duration} days</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[12px] p-[10px] bg-gray-950 rounded-[4px] text-[11px] text-gray-400">
            💡 Tip: Consider setting stop-loss limits on HOLD recommendations
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
        <h3 className="text-white text-[15px] mb-[12px]">AI Performance Insights</h3>
        <div className="grid grid-cols-3 gap-[12px]">
          <div className="p-[12px] bg-gray-950 rounded-[4px]">
            <div className="text-green-400 text-[12px] mb-[6px]">✓ Strengths</div>
            <div className="text-white text-[11px] mb-[3px]">Strong Buy picks performing +28% avg</div>
            <div className="text-gray-500 text-[10px]">Continue following high-confidence picks</div>
          </div>
          <div className="p-[12px] bg-gray-950 rounded-[4px]">
            <div className="text-yellow-400 text-[12px] mb-[6px]">⚠ Watch</div>
            <div className="text-white text-[11px] mb-[3px]">Hold picks underperforming by -2%</div>
            <div className="text-gray-500 text-[10px]">Review exit strategies on neutral picks</div>
          </div>
          <div className="p-[12px] bg-gray-950 rounded-[4px]">
            <div className="text-blue-400 text-[12px] mb-[6px]">📊 Stats</div>
            <div className="text-white text-[11px] mb-[3px]">Avg holding period: 32 days</div>
            <div className="text-gray-500 text-[10px]">Optimal range is 30-60 days</div>
          </div>
        </div>
      </div>
    </div>
  );
}