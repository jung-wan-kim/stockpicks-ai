import { useState, useEffect } from "react";
import { Sparkles, TrendingUp, TrendingDown, Star, Filter, Loader2 } from "lucide-react";
import { BlurOverlay } from "./BlurOverlay";
import { fetchRecommendations, Recommendation, groupRecommendations } from "../lib/api";

interface RecommendationsProps {
  isPremium: boolean;
  onUnlock: () => void;
}

export function Recommendations({ isPremium, onUnlock }: RecommendationsProps) {
  const [filter, setFilter] = useState<"all" | "buy" | "sell">("all");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    async function loadRecommendations() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchRecommendations(50);
        setRecommendations(data.recommendations);

        // Set last updated time
        if (data.recommendations.length > 0) {
          const latestTime = new Date(data.recommendations[0].createdAt);
          const now = new Date();
          const diffMs = now.getTime() - latestTime.getTime();
          const diffMins = Math.floor(diffMs / 60000);
          const diffHours = Math.floor(diffMins / 60);

          if (diffMins < 60) {
            setLastUpdated(`${diffMins} minutes ago`);
          } else if (diffHours < 24) {
            setLastUpdated(`${diffHours} hours ago`);
          } else {
            setLastUpdated(`${Math.floor(diffHours / 24)} days ago`);
          }
        }
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
        setError("Failed to load recommendations");
      } finally {
        setLoading(false);
      }
    }
    loadRecommendations();
  }, []);

  const grouped = groupRecommendations(recommendations);

  const filteredRecs = recommendations.filter((rec) => {
    if (filter === "all") return true;
    if (filter === "buy") return rec.action.toLowerCase() === "buy";
    if (filter === "sell") return rec.action.toLowerCase() === "sell";
    return true;
  });

  const buyCount = grouped.byAction.buy.length;
  const sellCount = grouped.byAction.sell.length;

  if (loading) {
    return (
      <div className="p-[24px] flex items-center justify-center h-[400px]">
        <div className="text-center">
          <Loader2 className="size-[32px] text-white animate-spin mx-auto mb-[12px]" />
          <p className="text-gray-500 text-[13px]">Loading recommendations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-[24px] flex items-center justify-center h-[400px]">
        <div className="text-center">
          <p className="text-red-400 text-[14px] mb-[8px]">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-white text-[13px] underline"
          >
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
          <h2 className="text-white text-[20px] mb-[4px]">AI Stock Recommendations</h2>
          <p className="text-gray-500 text-[12px]">Signals from TradingView strategy alerts</p>
        </div>
        <div className="flex items-center gap-[8px]">
          <span className="text-gray-500 text-[12px]">Last updated: {lastUpdated || "N/A"}</span>
          <Sparkles className="size-[14px] text-white" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-[12px] mb-[16px]">
        <Filter className="size-[14px] text-gray-500" />
        <div className="flex gap-[6px]">
          <button
            onClick={() => setFilter("all")}
            className={`px-[10px] py-[5px] rounded-[4px] text-[12px] transition-colors ${
              filter === "all" ? "bg-white text-black" : "bg-gray-950 text-gray-400 hover:text-white"
            }`}
          >
            All ({recommendations.length})
          </button>
          <button
            onClick={() => setFilter("buy")}
            className={`px-[10px] py-[5px] rounded-[4px] text-[12px] transition-colors ${
              filter === "buy" ? "bg-white text-black" : "bg-gray-950 text-gray-400 hover:text-white"
            }`}
          >
            Buy ({buyCount})
          </button>
          <button
            onClick={() => setFilter("sell")}
            className={`px-[10px] py-[5px] rounded-[4px] text-[12px] transition-colors ${
              filter === "sell" ? "bg-white text-black" : "bg-gray-950 text-gray-400 hover:text-white"
            }`}
          >
            Sell ({sellCount})
          </button>
        </div>
      </div>

      {/* Recommendations Grid */}
      {filteredRecs.length === 0 ? (
        <div className="bg-black rounded-[4px] p-[40px] border border-gray-900 text-center">
          <p className="text-gray-500 text-[14px]">No recommendations found</p>
          <p className="text-gray-600 text-[12px] mt-[8px]">Signals will appear when TradingView alerts are triggered</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-[16px]">
          {filteredRecs.map((rec) => (
            <div key={rec.id} className="bg-black rounded-[4px] p-[20px] border border-gray-900 hover:border-gray-700 transition-colors relative">
              {!isPremium && <BlurOverlay onClick={onUnlock} message="Unlock Full Details" />}

              {/* Header */}
              <div className="flex items-start justify-between mb-[12px]">
                <div className="flex-1">
                  <div className="flex items-center gap-[8px] mb-[4px]">
                    <h3 className={`text-[16px] ${isPremium ? "text-white" : "text-white blur-[6px]"}`}>{rec.symbol}</h3>
                    <span className={`px-[6px] py-[2px] rounded-[3px] text-[10px] ${
                      rec.action.toLowerCase() === "buy" ? "bg-green-500 text-white" :
                      rec.action.toLowerCase() === "sell" ? "bg-red-500 text-white" :
                      "bg-gray-700 text-white"
                    }`}>
                      {rec.action.toUpperCase()}
                    </span>
                  </div>
                  <p className={`text-[12px] mb-[2px] ${isPremium ? "text-gray-500" : "text-gray-500 blur-[4px]"}`}>
                    Strategy: {rec.strategy || "Unknown"}
                  </p>
                  <span className="text-gray-600 text-[11px]">Timeframe: {rec.timeframe || "1D"}</span>
                </div>
                <button className="text-gray-600 hover:text-white transition-colors">
                  <Star className="size-[16px]" />
                </button>
              </div>

              {/* WR Signal Score */}
              {rec.wrSignal !== undefined && (
                <div className="mb-[12px] p-[10px] bg-gray-950 rounded-[4px]">
                  <div className="flex items-center justify-between mb-[6px]">
                    <span className="text-gray-500 text-[11px]">WR Signal Score</span>
                    <span className="text-white text-[13px]">{rec.wrSignal.toFixed(1)}</span>
                  </div>
                  <div className="flex-1 bg-gray-900 rounded-full h-[6px]">
                    <div
                      className={`h-[6px] rounded-full ${
                        rec.wrSignal > 0 ? "bg-green-400" : "bg-red-400"
                      }`}
                      style={{ width: `${Math.min(Math.abs(rec.wrSignal), 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Price Info */}
              <div className="grid grid-cols-2 gap-[8px] mb-[12px]">
                <div>
                  <div className="text-gray-500 text-[11px] mb-[2px]">Signal Price</div>
                  <div className="text-white text-[13px]">${rec.price?.toFixed(2) || "N/A"}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-[11px] mb-[2px]">Volume</div>
                  <div className="text-white text-[13px]">{rec.volume?.toLocaleString() || "N/A"}</div>
                </div>
              </div>

              {/* Timestamp */}
              <div className="mb-[12px] text-[11px] text-gray-500">
                Signal Time: <span className="text-white">
                  {new Date(rec.timestamp || rec.createdAt).toLocaleString()}
                </span>
              </div>

              {/* Signal Type Indicator */}
              <div className="mb-[12px] p-[10px] bg-gray-950 rounded-[4px]">
                <div className="flex items-center gap-[8px]">
                  {rec.action.toLowerCase() === "buy" ? (
                    <>
                      <TrendingUp className="size-[16px] text-green-400" />
                      <span className="text-green-400 text-[12px]">Entry Signal - Consider buying</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="size-[16px] text-red-400" />
                      <span className="text-red-400 text-[12px]">Exit Signal - Consider selling</span>
                    </>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-[6px]">
                <button className="flex-1 py-[8px] bg-white text-black rounded-[4px] text-[12px] hover:bg-gray-200 transition-colors">
                  Add to My Picks
                </button>
                <button className="px-[12px] py-[8px] bg-gray-950 text-white rounded-[4px] text-[12px] hover:bg-gray-900 transition-colors">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
