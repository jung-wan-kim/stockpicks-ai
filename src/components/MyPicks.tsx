import { useState, useEffect } from "react";
import { Star, TrendingUp, TrendingDown, X, Plus, Loader2 } from "lucide-react";
import { fetchRecommendations, Recommendation, calculatePerformanceMetrics } from "../lib/api";

interface MyPicksProps {
  isPremium: boolean;
  onUnlock: () => void;
}

interface PickData {
  symbol: string;
  action: string;
  entryPrice: number;
  currentPrice: number;
  entryDate: string;
  daysHeld: number;
  gain: number;
  status: "Active" | "Closed";
}

export function MyPicks({ isPremium, onUnlock }: MyPicksProps) {
  const [picks, setPicks] = useState<PickData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPicks() {
      try {
        setLoading(true);
        const data = await fetchRecommendations(100);
        const signals = data.allSignals;

        // Group signals by symbol
        const symbolMap = new Map<string, Recommendation[]>();
        signals.forEach((s) => {
          const existing = symbolMap.get(s.symbol) || [];
          existing.push(s);
          symbolMap.set(s.symbol, existing);
        });

        // Create picks from signals
        const picksData: PickData[] = [];
        const now = new Date();

        symbolMap.forEach((symbolSignals, symbol) => {
          // Sort by date
          const sorted = symbolSignals.sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );

          let currentEntry: { price: number; date: Date } | null = null;

          sorted.forEach((signal) => {
            if (signal.action.toLowerCase() === "buy") {
              if (!currentEntry) {
                currentEntry = {
                  price: signal.price,
                  date: new Date(signal.createdAt),
                };
              }
            } else if (signal.action.toLowerCase() === "sell" && currentEntry) {
              // Closed position
              const exitDate = new Date(signal.createdAt);
              const daysHeld = Math.floor(
                (exitDate.getTime() - currentEntry.date.getTime()) / (1000 * 60 * 60 * 24)
              );
              const gain = ((signal.price - currentEntry.price) / currentEntry.price) * 100;

              picksData.push({
                symbol,
                action: "SELL",
                entryPrice: currentEntry.price,
                currentPrice: signal.price,
                entryDate: currentEntry.date.toISOString().split("T")[0],
                daysHeld,
                gain,
                status: "Closed",
              });
              currentEntry = null;
            }
          });

          // Open position
          if (currentEntry) {
            const daysHeld = Math.floor(
              (now.getTime() - currentEntry.date.getTime()) / (1000 * 60 * 60 * 24)
            );
            // Use entry price as current price (we don't have real-time prices)
            const latestSignal = sorted[sorted.length - 1];
            picksData.push({
              symbol,
              action: "BUY",
              entryPrice: currentEntry.price,
              currentPrice: latestSignal.price,
              entryDate: currentEntry.date.toISOString().split("T")[0],
              daysHeld,
              gain: 0, // Unknown without real-time price
              status: "Active",
            });
          }
        });

        // Sort by entry date (newest first)
        picksData.sort((a, b) => new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime());
        setPicks(picksData);
      } catch (err) {
        console.error("Failed to load picks:", err);
        setError("Failed to load picks");
      } finally {
        setLoading(false);
      }
    }
    loadPicks();
  }, []);

  const activePicks = picks.filter((p) => p.status === "Active");
  const closedPicks = picks.filter((p) => p.status === "Closed");

  // Calculate stats from closed picks
  const closedReturns = closedPicks.map((p) => p.gain);
  const avgReturn = closedReturns.length > 0
    ? closedReturns.reduce((sum, g) => sum + g, 0) / closedReturns.length
    : 0;
  const winningPicks = closedPicks.filter((p) => p.gain > 0).length;
  const bestPick = closedPicks.length > 0
    ? closedPicks.reduce((best, p) => (p.gain > best.gain ? p : best), closedPicks[0])
    : null;

  if (loading) {
    return (
      <div className="p-[24px] flex items-center justify-center h-[400px]">
        <div className="text-center">
          <Loader2 className="size-[32px] text-white animate-spin mx-auto mb-[12px]" />
          <p className="text-gray-500 text-[13px]">Loading picks...</p>
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
      {/* Header */}
      <div className="flex items-center justify-between mb-[16px]">
        <div>
          <h2 className="text-white text-[20px] mb-[4px]">My Picks</h2>
          <p className="text-gray-500 text-[12px]">Track positions from TradingView signals</p>
        </div>
        <button className="flex items-center gap-[6px] px-[12px] py-[8px] bg-white text-black rounded-[4px] hover:bg-gray-200 transition-colors text-[13px]">
          <Plus className="size-[14px]" />
          Add Pick
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-[16px] mb-[16px]">
        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="text-gray-500 text-[12px] mb-[8px]">Active Positions</div>
          <div className="text-white text-[24px]">{activePicks.length}</div>
          <div className="text-gray-600 text-[11px] mt-[4px]">Currently tracking</div>
        </div>

        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="text-gray-500 text-[12px] mb-[8px]">Avg Return (Closed)</div>
          <div className={`text-[24px] ${avgReturn >= 0 ? "text-green-400" : "text-red-400"}`}>
            {avgReturn >= 0 ? "+" : ""}{avgReturn.toFixed(1)}%
          </div>
          <div className="text-gray-600 text-[11px] mt-[4px]">{closedPicks.length} closed trades</div>
        </div>

        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="text-gray-500 text-[12px] mb-[8px]">Win Rate</div>
          <div className="text-white text-[24px]">
            {closedPicks.length > 0 ? `${winningPicks}/${closedPicks.length}` : "N/A"}
          </div>
          <div className="text-green-400 text-[11px] mt-[4px]">
            {closedPicks.length > 0
              ? `${((winningPicks / closedPicks.length) * 100).toFixed(0)}% success rate`
              : "No closed trades yet"}
          </div>
        </div>

        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="text-gray-500 text-[12px] mb-[8px]">Best Performer</div>
          <div className="text-white text-[24px]">{bestPick?.symbol || "N/A"}</div>
          <div className="text-green-400 text-[11px] mt-[4px]">
            {bestPick ? `+${bestPick.gain.toFixed(1)}% return` : "No closed trades"}
          </div>
        </div>
      </div>

      {/* Picks List */}
      <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
        <h3 className="text-white text-[15px] mb-[12px]">All Positions</h3>
        {picks.length === 0 ? (
          <div className="text-center py-[40px]">
            <p className="text-gray-500 text-[14px]">No positions tracked yet</p>
            <p className="text-gray-600 text-[12px] mt-[8px]">
              Positions are created from TradingView buy/sell signals
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-900">
                  <th className="text-left text-gray-500 pb-[10px] text-[12px]">Stock</th>
                  <th className="text-right text-gray-500 pb-[10px] text-[12px]">Entry Date</th>
                  <th className="text-right text-gray-500 pb-[10px] text-[12px]">Entry Price</th>
                  <th className="text-right text-gray-500 pb-[10px] text-[12px]">Current/Exit</th>
                  <th className="text-right text-gray-500 pb-[10px] text-[12px]">Return</th>
                  <th className="text-right text-gray-500 pb-[10px] text-[12px]">Days</th>
                  <th className="text-right text-gray-500 pb-[10px] text-[12px]">Status</th>
                  <th className="text-right text-gray-500 pb-[10px] text-[12px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {picks.map((pick, idx) => (
                  <tr key={`${pick.symbol}-${idx}`} className="border-b border-gray-900 hover:bg-gray-950">
                    <td className="py-[12px]">
                      <div className="flex items-center gap-[8px]">
                        <Star className={`size-[12px] ${pick.status === "Active" ? "text-white fill-white" : "text-gray-600"}`} />
                        <div>
                          <div className="text-white text-[13px]">{pick.symbol}</div>
                          <div className={`text-[11px] ${pick.action === "BUY" ? "text-green-400" : "text-red-400"}`}>
                            {pick.action}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-[12px] text-right text-gray-400 text-[12px]">{pick.entryDate}</td>
                    <td className="py-[12px] text-right text-white text-[12px]">${pick.entryPrice.toFixed(2)}</td>
                    <td className="py-[12px] text-right text-white text-[12px]">${pick.currentPrice.toFixed(2)}</td>
                    <td className="py-[12px] text-right">
                      {pick.status === "Closed" ? (
                        <div className="flex items-center justify-end gap-[3px]">
                          {pick.gain >= 0 ? (
                            <TrendingUp className="size-[12px] text-green-400" />
                          ) : (
                            <TrendingDown className="size-[12px] text-red-400" />
                          )}
                          <span className={`text-[12px] ${pick.gain >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {pick.gain >= 0 ? "+" : ""}{pick.gain.toFixed(1)}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-[12px]">—</span>
                      )}
                    </td>
                    <td className="py-[12px] text-right text-white text-[12px]">{pick.daysHeld}</td>
                    <td className="py-[12px] text-right">
                      <span className={`px-[8px] py-[2px] rounded-[3px] text-[11px] ${
                        pick.status === "Active" ? "bg-white text-black" : "bg-gray-700 text-white"
                      }`}>
                        {pick.status}
                      </span>
                    </td>
                    <td className="py-[12px] text-right">
                      <button className="text-gray-500 hover:text-white transition-colors">
                        <X className="size-[14px]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
