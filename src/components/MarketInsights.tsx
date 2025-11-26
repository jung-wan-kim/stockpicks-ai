import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Lightbulb, AlertCircle, Sparkles, Loader2 } from "lucide-react";
import { fetchRecommendations, Recommendation, groupRecommendations, calculatePerformanceMetrics } from "../lib/api";

interface MarketInsightsProps {
  isPremium: boolean;
  onUnlock: () => void;
}

interface Insight {
  id: number;
  title: string;
  category: string;
  date: string;
  summary: string;
  impact: "High" | "Medium" | "Low";
  relatedStocks: string[];
  confidence: number;
}

interface Alert {
  type: "opportunity" | "warning" | "info";
  title: string;
  message: string;
  time: string;
}

export function MarketInsights({ isPremium, onUnlock }: MarketInsightsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [trendingSymbols, setTrendingSymbols] = useState<{ symbol: string; count: number; action: string }[]>([]);
  const [strategyStats, setStrategyStats] = useState<{ strategy: string; count: number; buyRatio: number }[]>([]);

  useEffect(() => {
    async function loadInsights() {
      try {
        setLoading(true);
        const data = await fetchRecommendations(100);
        const grouped = groupRecommendations(data.allSignals);
        const metrics = calculatePerformanceMetrics(data.allSignals);

        // Generate insights from signal data
        const generatedInsights: Insight[] = [];

        // Insight 1: Most active symbols
        const symbolCounts = Object.entries(grouped.bySymbol)
          .map(([symbol, signals]) => ({ symbol, count: signals.length }))
          .sort((a, b) => b.count - a.count);

        if (symbolCounts.length > 0) {
          const topSymbols = symbolCounts.slice(0, 3);
          generatedInsights.push({
            id: 1,
            title: `High Signal Activity: ${topSymbols.map((s) => s.symbol).join(", ")}`,
            category: "Signal Analysis",
            date: "Live",
            summary: `These stocks have the most trading signals in your watchlist. ${topSymbols[0].symbol} leads with ${topSymbols[0].count} signals.`,
            impact: "High",
            relatedStocks: topSymbols.map((s) => s.symbol),
            confidence: 85,
          });
        }

        // Insight 2: Strategy performance
        const strategies = Object.entries(grouped.byStrategy);
        if (strategies.length > 0) {
          const strategyInfo = strategies.map(([strategy, signals]) => ({
            strategy,
            count: signals.length,
            buyCount: signals.filter((s) => s.action.toLowerCase() === "buy").length,
          }));

          setStrategyStats(
            strategyInfo.map((s) => ({
              strategy: s.strategy,
              count: s.count,
              buyRatio: s.count > 0 ? (s.buyCount / s.count) * 100 : 0,
            }))
          );

          const topStrategy = strategyInfo.sort((a, b) => b.count - a.count)[0];
          generatedInsights.push({
            id: 2,
            title: `Most Active Strategy: ${topStrategy.strategy}`,
            category: "Strategy",
            date: "Live",
            summary: `${topStrategy.strategy} has generated ${topStrategy.count} signals with ${((topStrategy.buyCount / topStrategy.count) * 100).toFixed(0)}% buy signals.`,
            impact: "Medium",
            relatedStocks: [],
            confidence: 78,
          });
        }

        // Insight 3: Recent signal trend
        const recentSignals = data.allSignals.slice(0, 10);
        const recentBuys = recentSignals.filter((s) => s.action.toLowerCase() === "buy").length;
        const recentSells = recentSignals.filter((s) => s.action.toLowerCase() === "sell").length;

        if (recentSignals.length > 0) {
          const trend = recentBuys > recentSells ? "bullish" : recentBuys < recentSells ? "bearish" : "neutral";
          generatedInsights.push({
            id: 3,
            title: `Recent Signal Trend: ${trend.charAt(0).toUpperCase() + trend.slice(1)}`,
            category: "Trend Analysis",
            date: "Last 10 signals",
            summary: `Out of the last 10 signals, ${recentBuys} were buy signals and ${recentSells} were sell signals, indicating a ${trend} short-term sentiment.`,
            impact: trend === "neutral" ? "Low" : "Medium",
            relatedStocks: [...new Set(recentSignals.map((s) => s.symbol))].slice(0, 4),
            confidence: 70,
          });
        }

        // Insight 4: Performance summary
        if (metrics.closedTrades > 0) {
          generatedInsights.push({
            id: 4,
            title: `Performance: ${metrics.winRate.toFixed(0)}% Win Rate`,
            category: "Performance",
            date: "All time",
            summary: `Based on ${metrics.closedTrades} closed trades, the average return is ${metrics.avgReturn >= 0 ? "+" : ""}${metrics.avgReturn.toFixed(1)}% with an average holding period of ${Math.round(metrics.avgHoldingDays)} days.`,
            impact: metrics.winRate >= 60 ? "High" : "Medium",
            relatedStocks: [],
            confidence: 90,
          });
        }

        setInsights(generatedInsights);

        // Generate alerts
        const generatedAlerts: Alert[] = [];

        // Alert for recent buy signals
        const latestBuy = data.allSignals.find((s) => s.action.toLowerCase() === "buy");
        if (latestBuy) {
          const timeDiff = Date.now() - new Date(latestBuy.createdAt).getTime();
          const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
          generatedAlerts.push({
            type: "opportunity",
            title: `New Buy Signal: ${latestBuy.symbol}`,
            message: `Entry at $${latestBuy.price?.toFixed(2)} - ${latestBuy.strategy}`,
            time: hoursAgo < 1 ? "Just now" : `${hoursAgo}h ago`,
          });
        }

        // Alert for recent sell signals
        const latestSell = data.allSignals.find((s) => s.action.toLowerCase() === "sell");
        if (latestSell) {
          const timeDiff = Date.now() - new Date(latestSell.createdAt).getTime();
          const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
          generatedAlerts.push({
            type: "warning",
            title: `Exit Signal: ${latestSell.symbol}`,
            message: `Exit at $${latestSell.price?.toFixed(2)} - ${latestSell.strategy}`,
            time: hoursAgo < 1 ? "Just now" : `${hoursAgo}h ago`,
          });
        }

        // Info alert about total signals
        generatedAlerts.push({
          type: "info",
          title: "Signal Summary",
          message: `${data.allSignals.length} total signals tracked`,
          time: "Today",
        });

        setAlerts(generatedAlerts);

        // Trending symbols
        setTrendingSymbols(
          symbolCounts.slice(0, 5).map((s) => {
            const symbolSignals = grouped.bySymbol[s.symbol];
            const latestAction = symbolSignals[0]?.action || "hold";
            return {
              symbol: s.symbol,
              count: s.count,
              action: latestAction,
            };
          })
        );
      } catch (err) {
        console.error("Failed to load insights:", err);
        setError("Failed to load market insights");
      } finally {
        setLoading(false);
      }
    }
    loadInsights();
  }, []);

  if (loading) {
    return (
      <div className="p-[24px] flex items-center justify-center h-[400px]">
        <div className="text-center">
          <Loader2 className="size-[32px] text-white animate-spin mx-auto mb-[12px]" />
          <p className="text-gray-500 text-[13px]">Loading market insights...</p>
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

  return (
    <div className="p-[24px]">
      <div className="grid grid-cols-[1fr_350px] gap-[16px]">
        {/* Main Insights */}
        <div>
          <div className="flex items-center justify-between mb-[16px]">
            <h2 className="text-white text-[20px]">AI Market Insights</h2>
            <div className="flex items-center gap-[6px] text-gray-500 text-[12px]">
              <Sparkles className="size-[14px]" />
              <span>Based on your signals</span>
            </div>
          </div>

          {insights.length === 0 ? (
            <div className="bg-black rounded-[4px] p-[40px] border border-gray-900 text-center">
              <p className="text-gray-500 text-[14px]">No insights available yet</p>
              <p className="text-gray-600 text-[12px] mt-[8px]">
                Insights will appear as more trading signals are collected
              </p>
            </div>
          ) : (
            <div className="space-y-[16px]">
              {insights.map((insight) => (
                <div key={insight.id} className="bg-black rounded-[4px] p-[20px] border border-gray-900 hover:border-gray-700 transition-colors">
                  <div className="flex items-start justify-between mb-[12px]">
                    <div className="flex-1">
                      <div className="flex items-center gap-[8px] mb-[6px]">
                        <span className="px-[8px] py-[2px] bg-white text-black rounded-[3px] text-[11px]">
                          {insight.category}
                        </span>
                        <span className={`px-[6px] py-[2px] rounded-[3px] text-[10px] ${
                          insight.impact === "High" ? "bg-red-500 text-white" :
                          insight.impact === "Medium" ? "bg-yellow-500 text-black" :
                          "bg-gray-700 text-white"
                        }`}>
                          {insight.impact} Impact
                        </span>
                        <span className="text-gray-500 text-[11px]">{insight.date}</span>
                      </div>
                      <h3 className="text-white text-[16px] mb-[8px]">{insight.title}</h3>
                      <p className="text-gray-400 text-[13px] mb-[12px]">{insight.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[6px]">
                      {insight.relatedStocks.length > 0 && (
                        <>
                          <span className="text-gray-500 text-[11px]">Related:</span>
                          {insight.relatedStocks.map((stock) => (
                            <span key={stock} className="px-[6px] py-[2px] bg-gray-950 text-white rounded-[3px] text-[11px]">
                              {stock}
                            </span>
                          ))}
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-[6px]">
                      <span className="text-gray-500 text-[11px]">Confidence:</span>
                      <span className="text-white text-[12px]">{insight.confidence}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-[16px]">
          {/* Market Alerts */}
          <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
            <div className="flex items-center gap-[8px] mb-[12px]">
              <AlertCircle className="size-[14px] text-white" />
              <h3 className="text-white text-[15px]">Recent Alerts</h3>
            </div>
            {alerts.length === 0 ? (
              <div className="text-gray-500 text-[13px] text-center py-[20px]">No alerts</div>
            ) : (
              <div className="space-y-[8px]">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`p-[10px] rounded-[4px] border-l-2 ${
                      alert.type === "opportunity" ? "bg-gray-950 border-green-400" :
                      alert.type === "warning" ? "bg-gray-950 border-yellow-400" :
                      "bg-gray-950 border-blue-400"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-[3px]">
                      <span className="text-white text-[12px]">{alert.title}</span>
                      <span className="text-gray-500 text-[11px]">{alert.time}</span>
                    </div>
                    <p className="text-gray-400 text-[11px]">{alert.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Trending Symbols */}
          <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
            <div className="flex items-center gap-[8px] mb-[12px]">
              <TrendingUp className="size-[14px] text-white" />
              <h3 className="text-white text-[15px]">Most Active Symbols</h3>
            </div>
            {trendingSymbols.length === 0 ? (
              <div className="text-gray-500 text-[13px] text-center py-[20px]">No data</div>
            ) : (
              <div className="space-y-[8px]">
                {trendingSymbols.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-[10px] bg-gray-950 rounded-[4px]">
                    <div className="flex-1">
                      <div className="text-white text-[12px] mb-[4px]">{item.symbol}</div>
                      <div className="bg-gray-900 rounded-full h-[4px] w-full">
                        <div
                          className={`h-[4px] rounded-full ${
                            item.action.toLowerCase() === "buy" ? "bg-green-400" : "bg-red-400"
                          }`}
                          style={{ width: `${Math.min(item.count * 20, 100)}%` }}
                        />
                      </div>
                    </div>
                    <span className={`ml-[8px] text-[11px] ${
                      item.action.toLowerCase() === "buy" ? "text-green-400" : "text-red-400"
                    }`}>
                      {item.count} signals
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Strategy Performance */}
          <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
            <div className="flex items-center gap-[8px] mb-[12px]">
              <Lightbulb className="size-[14px] text-white" />
              <h3 className="text-white text-[15px]">Strategy Breakdown</h3>
            </div>
            {strategyStats.length === 0 ? (
              <div className="text-gray-500 text-[13px] text-center py-[20px]">No strategy data</div>
            ) : (
              <div className="space-y-[10px]">
                {strategyStats.map((stat, index) => (
                  <div key={index} className="p-[10px] bg-gray-950 rounded-[4px]">
                    <div className="text-white text-[12px] mb-[6px]">{stat.strategy}</div>
                    <div className="flex items-center justify-between mb-[6px]">
                      <span className="text-gray-500 text-[11px]">{stat.count} signals</span>
                      <span className="text-white text-[11px]">{stat.buyRatio.toFixed(0)}% buy</span>
                    </div>
                    <div className="bg-gray-900 rounded-full h-[4px]">
                      <div
                        className="bg-green-400 h-[4px] rounded-full"
                        style={{ width: `${stat.buyRatio}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
