import { useState } from "react";
import { Search, TrendingUp, TrendingDown, BarChart3, Activity } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stockData = {
  NVDA: {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 512.34,
    change: 12.45,
    changePercent: 2.49,
    priceData: [
      { date: "Dec 1", price: 480 },
      { date: "Dec 8", price: 495 },
      { date: "Dec 15", price: 505 },
      { date: "Dec 22", price: 498 },
      { date: "Dec 29", price: 512 },
    ],
    fundamentals: {
      marketCap: "1.26T",
      peRatio: 75.2,
      eps: 6.81,
      revenue: "60.9B",
      profitMargin: "48.2%",
      roe: "35.4%",
    },
    aiAnalysis: {
      technicalScore: 8.5,
      fundamentalScore: 9.2,
      sentimentScore: 8.8,
      overallScore: 8.8,
      recommendation: "STRONG BUY",
      confidence: 92,
    },
    strengths: [
      "Dominant AI chip market position",
      "Exceptional revenue growth trajectory",
      "Strong profit margins and cash flow",
      "Innovation in GPU technology"
    ],
    weaknesses: [
      "High valuation multiples",
      "Geopolitical risks in supply chain",
      "Increasing competition from AMD"
    ]
  }
};

const popularStocks = [
  { symbol: "NVDA", name: "NVIDIA", price: 512.34, change: 2.49 },
  { symbol: "TSLA", name: "Tesla", price: 248.56, change: 3.47 },
  { symbol: "AAPL", name: "Apple", price: 185.42, change: 1.28 },
  { symbol: "MSFT", name: "Microsoft", price: 378.92, change: 1.22 },
  { symbol: "GOOGL", name: "Alphabet", price: 142.34, change: -0.86 },
];

interface AnalysisProps {
  isPremium: boolean;
  onUnlock: () => void;
}

export function Analysis({ isPremium, onUnlock }: AnalysisProps) {
  const [selectedStock, setSelectedStock] = useState("NVDA");
  const stock = stockData[selectedStock as keyof typeof stockData];

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
                className="w-full bg-gray-950 text-white rounded-[4px] pl-[32px] pr-[10px] py-[7px] border border-gray-900 text-[12px]"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-[12px]">
              <div className="text-gray-500 text-[11px] mb-[8px]">Popular Stocks</div>
              {popularStocks.map((s) => (
                <button
                  key={s.symbol}
                  onClick={() => setSelectedStock(s.symbol)}
                  className={`w-full p-[10px] text-left rounded-[4px] mb-[4px] transition-colors ${
                    selectedStock === s.symbol ? "bg-gray-950" : "hover:bg-gray-950"
                  }`}
                >
                  <div className="flex items-center justify-between mb-[2px]">
                    <span className="text-white text-[13px]">{s.symbol}</span>
                    <span className="text-white text-[12px]">${s.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-[11px]">{s.name}</span>
                    <span className={`text-[11px] ${s.change > 0 ? "text-green-400" : "text-red-400"}`}>
                      {s.change > 0 ? "+" : ""}{s.change}%
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Analysis Panel */}
        <div className="space-y-[16px]">
          {/* Stock Header */}
          <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-white text-[24px] mb-[4px]">{stock.symbol}</h2>
                <p className="text-gray-500 text-[13px] mb-[8px]">{stock.name}</p>
                <div className="flex items-center gap-[12px]">
                  <span className="text-white text-[32px]">${stock.price}</span>
                  <div className="flex items-center gap-[4px]">
                    {stock.change > 0 ? (
                      <TrendingUp className="size-[16px] text-green-400" />
                    ) : (
                      <TrendingDown className="size-[16px] text-red-400" />
                    )}
                    <span className={`text-[16px] ${stock.change > 0 ? "text-green-400" : "text-red-400"}`}>
                      {stock.change > 0 ? "+" : ""}{stock.change} ({stock.changePercent}%)
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`inline-block px-[12px] py-[6px] rounded-[4px] text-[13px] ${
                  stock.aiAnalysis.recommendation === "STRONG BUY" ? "bg-green-400 text-black" :
                  stock.aiAnalysis.recommendation === "BUY" ? "bg-green-500 text-white" :
                  "bg-gray-700 text-white"
                }`}>
                  {stock.aiAnalysis.recommendation}
                </div>
                <div className="text-gray-500 text-[11px] mt-[4px]">
                  AI Confidence: {stock.aiAnalysis.confidence}%
                </div>
              </div>
            </div>
          </div>

          {/* Chart & AI Scores */}
          <div className="grid grid-cols-[1fr_350px] gap-[16px]">
            {/* Price Chart */}
            <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
              <h3 className="text-white text-[15px] mb-[16px]">Price Movement</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={stock.priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" domain={[470, 520]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#000", border: "1px solid #1a1a1a", borderRadius: "4px" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Line type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* AI Analysis Scores */}
            <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
              <h3 className="text-white text-[15px] mb-[16px]">AI Analysis Scores</h3>
              <div className="space-y-[12px]">
                {[
                  { label: "Technical", score: stock.aiAnalysis.technicalScore, icon: Activity },
                  { label: "Fundamental", score: stock.aiAnalysis.fundamentalScore, icon: BarChart3 },
                  { label: "Sentiment", score: stock.aiAnalysis.sentimentScore, icon: TrendingUp },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-[6px]">
                        <div className="flex items-center gap-[6px]">
                          <Icon className="size-[12px] text-gray-500" />
                          <span className="text-gray-500 text-[12px]">{item.label}</span>
                        </div>
                        <span className="text-white text-[13px]">{item.score}/10</span>
                      </div>
                      <div className="bg-gray-900 rounded-full h-[6px]">
                        <div
                          className={`h-[6px] rounded-full ${
                            item.score >= 8 ? "bg-green-400" : item.score >= 6 ? "bg-green-500" : "bg-yellow-500"
                          }`}
                          style={{ width: `${item.score * 10}%` }}
                        />
                      </div>
                    </div>
                  );
                })}

                <div className="pt-[12px] mt-[12px] border-t border-gray-900">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-[13px]">Overall Score</span>
                    <span className="text-white text-[20px]">{stock.aiAnalysis.overallScore}/10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fundamentals & Analysis */}
          <div className="grid grid-cols-2 gap-[16px]">
            {/* Fundamentals */}
            <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
              <h3 className="text-white text-[15px] mb-[12px]">Key Fundamentals</h3>
              <div className="grid grid-cols-2 gap-[12px]">
                {Object.entries(stock.fundamentals).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-gray-500 text-[11px] mb-[2px]">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-white text-[13px]">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
              <h3 className="text-white text-[15px] mb-[12px]">AI Analysis</h3>
              <div className="space-y-[12px]">
                <div>
                  <div className="text-green-400 text-[12px] mb-[6px]">Strengths</div>
                  <ul className="space-y-[3px]">
                    {stock.strengths.slice(0, 2).map((s, i) => (
                      <li key={i} className="text-white text-[11px] flex items-start gap-[6px]">
                        <span className="text-green-400 mt-[2px]">✓</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-red-400 text-[12px] mb-[6px]">Weaknesses</div>
                  <ul className="space-y-[3px]">
                    {stock.weaknesses.slice(0, 2).map((w, i) => (
                      <li key={i} className="text-white text-[11px] flex items-start gap-[6px]">
                        <span className="text-red-400 mt-[2px]">✗</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full py-[12px] bg-white text-black rounded-[4px] text-[13px] hover:bg-gray-200 transition-colors">
            Add {stock.symbol} to My Picks
          </button>
        </div>
      </div>
    </div>
  );
}