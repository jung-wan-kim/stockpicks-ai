import { useState } from "react";
import { Sparkles, TrendingUp, TrendingDown, Star, Filter } from "lucide-react";
import { BlurOverlay } from "./BlurOverlay";

const recommendations = [
  {
    id: 1,
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    action: "STRONG BUY",
    confidence: 92,
    currentPrice: 512.34,
    targetPrice: 580.00,
    potentialGain: 13.2,
    timeframe: "3-6 months",
    sector: "Technology",
    reasons: [
      "AI chip demand at all-time high",
      "Q4 earnings beat expectations by 23%",
      "Strong partnership with major cloud providers",
      "Data center revenue up 217% YoY"
    ],
    risks: ["High valuation concerns", "Market competition from AMD"],
    aiScore: 9.2,
  },
  {
    id: 2,
    symbol: "TSLA",
    name: "Tesla Inc.",
    action: "BUY",
    confidence: 78,
    currentPrice: 248.56,
    targetPrice: 285.00,
    potentialGain: 14.6,
    timeframe: "6-12 months",
    sector: "Automotive",
    reasons: [
      "Production capacity expanding globally",
      "New model launches in Q2 2024",
      "Energy storage business growing 40% YoY",
      "FSD technology improving rapidly"
    ],
    risks: ["CEO distraction concerns", "Increased competition"],
    aiScore: 7.8,
  },
  {
    id: 3,
    symbol: "PLTR",
    name: "Palantir Technologies",
    action: "BUY",
    confidence: 85,
    currentPrice: 23.45,
    targetPrice: 32.00,
    potentialGain: 36.5,
    timeframe: "6-12 months",
    sector: "Software",
    reasons: [
      "Government contracts secured $1.2B",
      "Commercial customer growth +55%",
      "AI platform adoption accelerating",
      "Operating margin improving"
    ],
    risks: ["Revenue concentration", "High P/E ratio"],
    aiScore: 8.5,
  },
  {
    id: 4,
    symbol: "SQ",
    name: "Block Inc.",
    action: "BUY",
    confidence: 72,
    currentPrice: 67.89,
    targetPrice: 85.00,
    potentialGain: 25.2,
    timeframe: "3-6 months",
    sector: "Fintech",
    reasons: [
      "Cash App user growth +20%",
      "Bitcoin strategy paying off",
      "Merchant ecosystem expanding",
      "Cost reduction initiatives working"
    ],
    risks: ["Regulatory scrutiny", "Economic headwinds"],
    aiScore: 7.2,
  },
  {
    id: 5,
    symbol: "AMD",
    name: "Advanced Micro Devices",
    action: "HOLD",
    confidence: 65,
    currentPrice: 178.45,
    targetPrice: 190.00,
    potentialGain: 6.5,
    timeframe: "6-12 months",
    sector: "Technology",
    reasons: [
      "AI chip development on track",
      "Data center market share gains",
      "Server CPU demand stable"
    ],
    risks: ["NVIDIA competition", "Market volatility", "Valuation stretched"],
    aiScore: 6.5,
  },
  {
    id: 6,
    symbol: "COIN",
    name: "Coinbase Global",
    action: "SPECULATIVE BUY",
    confidence: 68,
    currentPrice: 123.45,
    targetPrice: 165.00,
    potentialGain: 33.7,
    timeframe: "12+ months",
    sector: "Crypto",
    reasons: [
      "Crypto market recovery underway",
      "Institutional adoption growing",
      "New product launches successful",
      "Regulatory clarity improving"
    ],
    risks: ["High volatility", "Regulatory changes", "Crypto market dependent"],
    aiScore: 6.8,
  },
];

interface RecommendationsProps {
  isPremium: boolean;
  onUnlock: () => void;
}

export function Recommendations({ isPremium, onUnlock }: RecommendationsProps) {
  const [filter, setFilter] = useState<"all" | "buy" | "hold">("all");

  const filteredRecs = recommendations.filter((rec) => {
    if (filter === "all") return true;
    if (filter === "buy") return rec.action.includes("BUY");
    if (filter === "hold") return rec.action === "HOLD";
    return true;
  });

  return (
    <div className="p-[24px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-[16px]">
        <div>
          <h2 className="text-white text-[20px] mb-[4px]">AI Stock Recommendations</h2>
          <p className="text-gray-500 text-[12px]">Powered by advanced machine learning algorithms</p>
        </div>
        <div className="flex items-center gap-[8px]">
          <span className="text-gray-500 text-[12px]">Last updated: 2 hours ago</span>
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
            Buy Only ({recommendations.filter(r => r.action.includes("BUY")).length})
          </button>
          <button
            onClick={() => setFilter("hold")}
            className={`px-[10px] py-[5px] rounded-[4px] text-[12px] transition-colors ${
              filter === "hold" ? "bg-white text-black" : "bg-gray-950 text-gray-400 hover:text-white"
            }`}
          >
            Hold ({recommendations.filter(r => r.action === "HOLD").length})
          </button>
        </div>
      </div>

      {/* Recommendations Grid */}
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
                    rec.action === "STRONG BUY" ? "bg-green-400 text-black" :
                    rec.action.includes("BUY") ? "bg-green-500 text-white" :
                    "bg-gray-700 text-white"
                  }`}>
                    {rec.action}
                  </span>
                </div>
                <p className={`text-[12px] mb-[2px] ${isPremium ? "text-gray-500" : "text-gray-500 blur-[4px]"}`}>{rec.name}</p>
                <span className="text-gray-600 text-[11px]">{rec.sector}</span>
              </div>
              <button className="text-gray-600 hover:text-white transition-colors">
                <Star className="size-[16px]" />
              </button>
            </div>

            {/* AI Score */}
            <div className="mb-[12px] p-[10px] bg-gray-950 rounded-[4px]">
              <div className="flex items-center justify-between mb-[6px]">
                <span className="text-gray-500 text-[11px]">AI Confidence Score</span>
                <span className="text-white text-[13px]">{rec.aiScore}/10</span>
              </div>
              <div className="flex-1 bg-gray-900 rounded-full h-[6px]">
                <div 
                  className={`h-[6px] rounded-full ${
                    rec.aiScore >= 8 ? "bg-green-400" :
                    rec.aiScore >= 7 ? "bg-green-500" :
                    "bg-yellow-500"
                  }`}
                  style={{ width: `${rec.confidence}%` }}
                />
              </div>
            </div>

            {/* Price Info */}
            <div className="grid grid-cols-3 gap-[8px] mb-[12px]">
              <div>
                <div className="text-gray-500 text-[11px] mb-[2px]">Current</div>
                <div className="text-white text-[13px]">${rec.currentPrice}</div>
              </div>
              <div>
                <div className="text-gray-500 text-[11px] mb-[2px]">Target</div>
                <div className="text-green-400 text-[13px]">${rec.targetPrice}</div>
              </div>
              <div>
                <div className="text-gray-500 text-[11px] mb-[2px]">Upside</div>
                <div className="flex items-center gap-[3px]">
                  <TrendingUp className="size-[11px] text-green-400" />
                  <span className="text-green-400 text-[13px]">{rec.potentialGain}%</span>
                </div>
              </div>
            </div>

            {/* Timeframe */}
            <div className="mb-[12px] text-[11px] text-gray-500">
              Timeframe: <span className="text-white">{rec.timeframe}</span>
            </div>

            {/* Reasons */}
            <div className="mb-[12px]">
              <div className="text-gray-500 text-[11px] mb-[6px]">Key Reasons:</div>
              <ul className="space-y-[3px]">
                {rec.reasons.slice(0, 3).map((reason, idx) => (
                  <li key={idx} className="text-white text-[11px] flex items-start gap-[6px]">
                    <span className="text-green-400 mt-[2px]">✓</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risks */}
            <div className="mb-[12px]">
              <div className="text-gray-500 text-[11px] mb-[6px]">Risks:</div>
              <div className="flex flex-wrap gap-[4px]">
                {rec.risks.map((risk, idx) => (
                  <span key={idx} className="px-[6px] py-[2px] bg-gray-950 text-gray-400 rounded-[3px] text-[10px]">
                    {risk}
                  </span>
                ))}
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
    </div>
  );
}