import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Award, Target, Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { fetchRecommendations, Recommendation, calculatePerformanceMetrics } from "../lib/api";

interface PerformanceProps {
  isPremium: boolean;
  onUnlock: () => void;
}

interface TradePerformance {
  symbol: string;
  entry: number;
  exit?: number;
  pnl?: number;
  daysHeld?: number;
}

export function Performance({ isPremium, onUnlock }: PerformanceProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<{
    totalSignals: number;
    buySignals: number;
    sellSignals: number;
    closedTrades: number;
    openPositions: number;
    winRate: number;
    avgReturn: number;
    totalReturn: number;
    avgHoldingDays: number;
    trades: TradePerformance[];
    winningTrades: number;
    losingTrades: number;
  } | null>(null);
  const [monthlyData, setMonthlyData] = useState<{ month: string; return: number }[]>([]);

  useEffect(() => {
    async function loadPerformance() {
      try {
        setLoading(true);
        const data = await fetchRecommendations(200);
        const calcMetrics = calculatePerformanceMetrics(data.allSignals);
        setMetrics(calcMetrics);

        // Group trades by month for chart
        const monthlyMap = new Map<string, number[]>();
        calcMetrics.trades.forEach((trade) => {
          if (trade.pnl !== undefined) {
            // Estimate trade date from daysHeld
            const now = new Date();
            const tradeDate = new Date(now.getTime() - (trade.daysHeld || 0) * 24 * 60 * 60 * 1000);
            const monthKey = tradeDate.toLocaleString("en-US", { month: "short" });
            const existing = monthlyMap.get(monthKey) || [];
            existing.push(trade.pnl);
            monthlyMap.set(monthKey, existing);
          }
        });

        // Calculate monthly averages
        const monthlyPerf: { month: string; return: number }[] = [];
        monthlyMap.forEach((returns, month) => {
          const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
          monthlyPerf.push({ month, return: parseFloat(avgReturn.toFixed(1)) });
        });

        setMonthlyData(monthlyPerf);
      } catch (err) {
        console.error("Failed to load performance:", err);
        setError("Failed to load performance data");
      } finally {
        setLoading(false);
      }
    }
    loadPerformance();
  }, []);

  if (loading) {
    return (
      <div className="p-[24px] flex items-center justify-center h-[400px]">
        <div className="text-center">
          <Loader2 className="size-[32px] text-white animate-spin mx-auto mb-[12px]" />
          <p className="text-gray-500 text-[13px]">Loading performance data...</p>
        </div>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="p-[24px] flex items-center justify-center h-[400px]">
        <div className="text-center">
          <p className="text-red-400 text-[14px] mb-[8px]">{error || "No data available"}</p>
          <button onClick={() => window.location.reload()} className="text-white text-[13px] underline">
            Try again
          </button>
        </div>
      </div>
    );
  }

  // Prepare pie chart data
  const performanceByAction = [
    { action: "Buy Signals", value: metrics.buySignals, color: "#10b981" },
    { action: "Sell Signals", value: metrics.sellSignals, color: "#ef4444" },
  ].filter((item) => item.value > 0);

  // Top performers (sorted by PnL)
  const closedTrades = metrics.trades.filter((t) => t.pnl !== undefined);
  const topPerformers = [...closedTrades]
    .sort((a, b) => (b.pnl || 0) - (a.pnl || 0))
    .slice(0, 5);
  const poorPerformers = [...closedTrades]
    .sort((a, b) => (a.pnl || 0) - (b.pnl || 0))
    .slice(0, 3);

  // Best pick calculation
  const bestPick = topPerformers[0];

  return (
    <div className="p-[24px] space-y-[16px]">
      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-[16px]">
        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center justify-between mb-[12px]">
            <span className="text-gray-500 text-[13px]">Total Return</span>
            <TrendingUp className="size-[14px] text-gray-600" />
          </div>
          <div className={`text-[28px] ${metrics.totalReturn >= 0 ? "text-green-400" : "text-red-400"}`}>
            {metrics.totalReturn >= 0 ? "+" : ""}{metrics.totalReturn.toFixed(1)}%
          </div>
          <div className="text-gray-500 text-[12px] mt-[6px]">{metrics.closedTrades} closed trades</div>
        </div>

        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center justify-between mb-[12px]">
            <span className="text-gray-500 text-[13px]">Win Rate</span>
            <Target className="size-[14px] text-gray-600" />
          </div>
          <div className="text-white text-[28px]">{metrics.winRate.toFixed(1)}%</div>
          <div className="text-gray-500 text-[12px] mt-[6px]">
            {metrics.winningTrades} of {metrics.closedTrades} trades
          </div>
        </div>

        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center justify-between mb-[12px]">
            <span className="text-gray-500 text-[13px]">Avg Holding</span>
            <Award className="size-[14px] text-gray-600" />
          </div>
          <div className="text-white text-[28px]">{Math.round(metrics.avgHoldingDays)}</div>
          <div className="text-gray-500 text-[12px] mt-[6px]">Days per trade</div>
        </div>

        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center justify-between mb-[12px]">
            <span className="text-gray-500 text-[13px]">Best Trade</span>
            <Award className="size-[14px] text-gray-600" />
          </div>
          <div className="text-white text-[28px]">
            {bestPick ? `+${(bestPick.pnl || 0).toFixed(1)}%` : "N/A"}
          </div>
          <div className="text-gray-500 text-[12px] mt-[6px]">
            {bestPick ? `${bestPick.symbol} (${bestPick.daysHeld}d)` : "No trades yet"}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-[1fr_400px] gap-[16px]">
        {/* Trade Performance */}
        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="mb-[20px]">
            <h3 className="text-white text-[16px] mb-[4px]">Trade Performance</h3>
            <p className="text-gray-500 text-[12px]">Returns from closed positions</p>
          </div>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#000", border: "1px solid #1a1a1a", borderRadius: "4px" }}
                  labelStyle={{ color: "#fff" }}
                  formatter={(value: number) => [`${value.toFixed(1)}%`, "Return"]}
                />
                <Bar dataKey="return" fill="#10b981" name="Return" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[280px] text-gray-500 text-[13px]">
              No trade data available yet
            </div>
          )}
        </div>

        {/* Signal Distribution */}
        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <h3 className="text-white text-[16px] mb-[20px]">Signal Distribution</h3>
          {performanceByAction.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={performanceByAction}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ action, value }) => `${value}`}
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
                    <span className="text-white">{item.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between text-[12px] pt-[6px] border-t border-gray-900">
                  <span className="text-gray-400">Total Signals</span>
                  <span className="text-white">{metrics.totalSignals}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-[200px] text-gray-500 text-[13px]">
              No signal data available
            </div>
          )}
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
          {topPerformers.length > 0 ? (
            <div className="space-y-[8px]">
              {topPerformers.map((trade, index) => (
                <div key={`${trade.symbol}-${index}`} className="flex items-center justify-between p-[10px] bg-gray-950 rounded-[4px]">
                  <div className="flex items-center gap-[10px]">
                    <span className="text-gray-500 text-[12px]">#{index + 1}</span>
                    <div>
                      <div className="text-white text-[13px]">{trade.symbol}</div>
                      <div className="text-gray-500 text-[11px]">
                        ${trade.entry.toFixed(2)} → ${trade.exit?.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 text-[13px]">+{(trade.pnl || 0).toFixed(1)}%</div>
                    <div className="text-gray-500 text-[11px]">{trade.daysHeld} days</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-[13px] text-center py-[20px]">No closed trades yet</div>
          )}
        </div>

        {/* Poor Performers */}
        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center gap-[8px] mb-[12px]">
            <TrendingDown className="size-[16px] text-red-400" />
            <h3 className="text-white text-[15px]">Areas for Improvement</h3>
          </div>
          {poorPerformers.length > 0 && poorPerformers[0].pnl !== undefined && poorPerformers[0].pnl < 0 ? (
            <div className="space-y-[8px]">
              {poorPerformers
                .filter((t) => (t.pnl || 0) < 0)
                .map((trade, index) => (
                  <div key={`${trade.symbol}-${index}`} className="flex items-center justify-between p-[10px] bg-gray-950 rounded-[4px]">
                    <div>
                      <div className="text-white text-[13px]">{trade.symbol}</div>
                      <div className="text-gray-500 text-[11px]">
                        ${trade.entry.toFixed(2)} → ${trade.exit?.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-red-400 text-[13px]">{(trade.pnl || 0).toFixed(1)}%</div>
                      <div className="text-gray-500 text-[11px]">{trade.daysHeld} days</div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-gray-500 text-[13px] text-center py-[20px]">No losing trades - great job!</div>
          )}

          <div className="mt-[12px] p-[10px] bg-gray-950 rounded-[4px] text-[11px] text-gray-400">
            💡 Tip: Review losing trades to improve your strategy
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
        <h3 className="text-white text-[15px] mb-[12px]">Performance Insights</h3>
        <div className="grid grid-cols-3 gap-[12px]">
          <div className="p-[12px] bg-gray-950 rounded-[4px]">
            <div className="text-green-400 text-[12px] mb-[6px]">✓ Summary</div>
            <div className="text-white text-[11px] mb-[3px]">
              {metrics.closedTrades} trades with {metrics.winRate.toFixed(0)}% win rate
            </div>
            <div className="text-gray-500 text-[10px]">
              Avg return: {metrics.avgReturn >= 0 ? "+" : ""}{metrics.avgReturn.toFixed(1)}% per trade
            </div>
          </div>
          <div className="p-[12px] bg-gray-950 rounded-[4px]">
            <div className="text-yellow-400 text-[12px] mb-[6px]">⚠ Open Positions</div>
            <div className="text-white text-[11px] mb-[3px]">{metrics.openPositions} positions active</div>
            <div className="text-gray-500 text-[10px]">Monitor these for exit signals</div>
          </div>
          <div className="p-[12px] bg-gray-950 rounded-[4px]">
            <div className="text-blue-400 text-[12px] mb-[6px]">📊 Stats</div>
            <div className="text-white text-[11px] mb-[3px]">
              Avg holding: {Math.round(metrics.avgHoldingDays)} days
            </div>
            <div className="text-gray-500 text-[10px]">Based on {metrics.closedTrades} closed trades</div>
          </div>
        </div>
      </div>
    </div>
  );
}
