import { TrendingUp, Lightbulb, AlertCircle, Sparkles } from "lucide-react";

const insights = [
  {
    id: 1,
    title: "AI Chip Sector Momentum Strong",
    category: "Sector Analysis",
    date: "2 hours ago",
    summary: "AI chip manufacturers showing exceptional growth with NVDA leading the pack. Data center demand remains robust.",
    impact: "High",
    relatedStocks: ["NVDA", "AMD", "INTC"],
    confidence: 88,
  },
  {
    id: 2,
    title: "Electric Vehicle Market Consolidation",
    category: "Industry Trend",
    date: "5 hours ago",
    summary: "EV market entering consolidation phase. Major players gaining market share while smaller competitors struggle.",
    impact: "Medium",
    relatedStocks: ["TSLA", "RIVN", "LCID"],
    confidence: 75,
  },
  {
    id: 3,
    title: "Federal Reserve Rate Decision Ahead",
    category: "Economic Event",
    date: "1 day ago",
    summary: "Fed meeting scheduled for next week. Market expects rates to remain unchanged, but forward guidance will be critical.",
    impact: "High",
    relatedStocks: ["SPY", "QQQ"],
    confidence: 82,
  },
  {
    id: 4,
    title: "Cloud Computing Growth Accelerating",
    category: "Technology",
    date: "1 day ago",
    summary: "Enterprise cloud adoption up 35% YoY. Major cloud providers reporting strong quarterly results.",
    impact: "High",
    relatedStocks: ["MSFT", "GOOGL", "AMZN"],
    confidence: 90,
  },
];

const marketAlerts = [
  {
    type: "opportunity",
    title: "NVDA Breaking Resistance",
    message: "Price momentum building above $510 level",
    time: "15 min ago",
  },
  {
    type: "warning",
    title: "Market Volatility Rising",
    message: "VIX up 12% today, consider hedging positions",
    time: "1 hour ago",
  },
  {
    type: "info",
    title: "Earnings Season Starting",
    message: "Tech sector earnings begin next week",
    time: "3 hours ago",
  },
];

const trendingTopics = [
  { topic: "Artificial Intelligence", sentiment: 92, change: "+8" },
  { topic: "Federal Reserve", sentiment: 45, change: "-5" },
  { topic: "Electric Vehicles", sentiment: 68, change: "+3" },
  { topic: "Cloud Computing", sentiment: 85, change: "+12" },
  { topic: "Cryptocurrency", sentiment: 58, change: "-2" },
];

const aiPredictions = [
  {
    prediction: "Tech sector likely to outperform in Q1 2024",
    probability: 78,
    timeframe: "Next 3 months",
    reasoning: "Strong earnings momentum and AI adoption continuing",
  },
  {
    prediction: "Energy sector may face headwinds",
    probability: 65,
    timeframe: "Next month",
    reasoning: "Oil prices stabilizing and demand concerns",
  },
  {
    prediction: "Small-cap stocks showing reversal signals",
    probability: 72,
    timeframe: "Next 2 months",
    reasoning: "Improved economic data and Fed policy clarity",
  },
];

interface MarketInsightsProps {
  isPremium: boolean;
  onUnlock: () => void;
}

export function MarketInsights({ isPremium, onUnlock }: MarketInsightsProps) {
  return (
    <div className="p-[24px]">
      <div className="grid grid-cols-[1fr_350px] gap-[16px]">
        {/* Main Insights */}
        <div>
          <div className="flex items-center justify-between mb-[16px]">
            <h2 className="text-white text-[20px]">AI Market Insights</h2>
            <div className="flex items-center gap-[6px] text-gray-500 text-[12px]">
              <Sparkles className="size-[14px]" />
              <span>Powered by AI</span>
            </div>
          </div>

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
                    <span className="text-gray-500 text-[11px]">Related:</span>
                    {insight.relatedStocks.map((stock) => (
                      <span key={stock} className="px-[6px] py-[2px] bg-gray-950 text-white rounded-[3px] text-[11px]">
                        {stock}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <span className="text-gray-500 text-[11px]">AI Confidence:</span>
                    <span className="text-white text-[12px]">{insight.confidence}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-[16px]">
          {/* Market Alerts */}
          <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
            <div className="flex items-center gap-[8px] mb-[12px]">
              <AlertCircle className="size-[14px] text-white" />
              <h3 className="text-white text-[15px]">Market Alerts</h3>
            </div>
            <div className="space-y-[8px]">
              {marketAlerts.map((alert, index) => (
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
          </div>

          {/* Trending Topics */}
          <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
            <div className="flex items-center gap-[8px] mb-[12px]">
              <TrendingUp className="size-[14px] text-white" />
              <h3 className="text-white text-[15px]">Trending Topics</h3>
            </div>
            <div className="space-y-[8px]">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-[10px] bg-gray-950 rounded-[4px]">
                  <div className="flex-1">
                    <div className="text-white text-[12px] mb-[4px]">{topic.topic}</div>
                    <div className="bg-gray-900 rounded-full h-[4px] w-full">
                      <div
                        className={`h-[4px] rounded-full ${
                          topic.sentiment >= 70 ? "bg-green-400" :
                          topic.sentiment >= 50 ? "bg-yellow-400" :
                          "bg-red-400"
                        }`}
                        style={{ width: `${topic.sentiment}%` }}
                      />
                    </div>
                  </div>
                  <span className={`ml-[8px] text-[11px] ${
                    topic.change.startsWith("+") ? "text-green-400" : "text-red-400"
                  }`}>
                    {topic.change}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Predictions */}
          <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
            <div className="flex items-center gap-[8px] mb-[12px]">
              <Lightbulb className="size-[14px] text-white" />
              <h3 className="text-white text-[15px]">AI Predictions</h3>
            </div>
            <div className="space-y-[10px]">
              {aiPredictions.map((pred, index) => (
                <div key={index} className="p-[10px] bg-gray-950 rounded-[4px]">
                  <div className="text-white text-[12px] mb-[6px]">{pred.prediction}</div>
                  <div className="flex items-center justify-between mb-[6px]">
                    <span className="text-gray-500 text-[11px]">{pred.timeframe}</span>
                    <span className="text-white text-[11px]">{pred.probability}%</span>
                  </div>
                  <div className="bg-gray-900 rounded-full h-[4px] mb-[6px]">
                    <div
                      className="bg-green-400 h-[4px] rounded-full"
                      style={{ width: `${pred.probability}%` }}
                    />
                  </div>
                  <div className="text-gray-500 text-[10px] italic">{pred.reasoning}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}