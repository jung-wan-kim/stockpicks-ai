import { TrendingUp, TrendingDown, Target, Award, BarChart3, Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BlurOverlay } from "./BlurOverlay";

const performanceData = [
  { month: "Jul", value: 100 },
  { month: "Aug", value: 108 },
  { month: "Sep", value: 112 },
  { month: "Oct", value: 105 },
  { month: "Nov", value: 118 },
  { month: "Dec", value: 125 },
];

const todayRecommendations = [
  { 
    symbol: "NVDA", 
    name: "NVIDIA Corporation", 
    action: "STRONG BUY",
    confidence: 92,
    currentPrice: 512.34,
    targetPrice: 580.00,
    potentialGain: 13.2,
    reason: "AI leadership & strong earnings"
  },
  { 
    symbol: "TSLA", 
    name: "Tesla Inc.", 
    action: "BUY",
    confidence: 78,
    currentPrice: 248.56,
    targetPrice: 285.00,
    potentialGain: 14.6,
    reason: "Production scaling up"
  },
  { 
    symbol: "AMD", 
    name: "Advanced Micro Devices", 
    action: "HOLD",
    confidence: 65,
    currentPrice: 178.45,
    targetPrice: 190.00,
    potentialGain: 6.5,
    reason: "Wait for market stabilization"
  },
];

const recentPerformers = [
  { symbol: "AAPL", name: "Apple Inc.", gain: 24.5, duration: "30 days", status: "Closed" },
  { symbol: "MSFT", name: "Microsoft", gain: 18.3, duration: "45 days", status: "Closed" },
  { symbol: "GOOGL", name: "Alphabet", gain: -3.2, duration: "15 days", status: "Closed" },
  { symbol: "META", name: "Meta Platforms", gain: 31.7, duration: "60 days", status: "Closed" },
];

interface DashboardProps {
  isPremium: boolean;
  onUnlock: () => void;
}

export function Dashboard({ isPremium, onUnlock }: DashboardProps) {
  return (
    <div className="p-[24px] space-y-[16px]">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-[16px]">
        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center justify-between mb-[12px]">
            <span className="text-gray-500 text-[13px]">Total Return</span>
            <BarChart3 className="size-[14px] text-gray-600" />
          </div>
          <div className="text-white text-[28px]">+25.3%</div>
          <div className="text-green-400 text-[12px] mt-[6px]">Since joining</div>
        </div>

        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center justify-between mb-[12px]">
            <span className="text-gray-500 text-[13px]">Win Rate</span>
            <Target className="size-[14px] text-gray-600" />
          </div>
          <div className="text-white text-[28px]">73.5%</div>
          <div className="text-gray-500 text-[12px] mt-[6px]">49 of 67 picks</div>
        </div>

        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center justify-between mb-[12px]">
            <span className="text-gray-500 text-[13px]">Active Picks</span>
            <Zap className="size-[14px] text-gray-600" />
          </div>
          <div className="text-white text-[28px]">8</div>
          <div className="text-gray-500 text-[12px] mt-[6px]">Currently tracking</div>
        </div>

        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="flex items-center justify-between mb-[12px]">
            <span className="text-gray-500 text-[13px]">Best Performer</span>
            <Award className="size-[14px] text-gray-600" />
          </div>
          <div className="text-white text-[28px]">+31.7%</div>
          <div className="text-gray-500 text-[12px] mt-[6px]">META (60 days)</div>
        </div>
      </div>

      {/* Performance Chart & Today's Recommendations */}
      <div className="grid grid-cols-[1fr_400px] gap-[16px]">
        {/* Performance Chart */}
        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="mb-[20px]">
            <h3 className="text-white text-[16px] mb-[4px]">Your Portfolio Performance</h3>
            <p className="text-gray-500 text-[12px]">Cumulative return from AI recommendations</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={performanceData}>
              <defs>
                <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[95, 130]} />
              <Tooltip
                contentStyle={{ backgroundColor: "#000", border: "1px solid #1a1a1a", borderRadius: "4px" }}
                labelStyle={{ color: "#fff" }}
                formatter={(value: number) => [`${value}%`, "Return"]}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#10b981" 
                strokeWidth={2} 
                fill="url(#colorPerformance)"
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Today's Top Recommendations */}
        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900 relative">
          {!isPremium && <BlurOverlay onClick={onUnlock} message="Unlock AI Recommendations" />}
          
          <div className="flex items-center justify-between mb-[16px]">
            <h3 className="text-white text-[15px]">Today's Top Picks</h3>
            <span className="px-[8px] py-[2px] bg-white text-black rounded-[3px] text-[11px]">AI POWERED</span>
          </div>
          
          <div className="space-y-[10px]">
            {todayRecommendations.map((rec) => (
              <div key={rec.symbol} className="bg-gray-950 rounded-[4px] p-[12px] relative">
                <div className="flex items-start justify-between mb-[8px]">
                  <div>
                    <div className={`text-[14px] mb-[2px] ${isPremium ? "text-white" : "text-white blur-[4px]"}`}>
                      {rec.symbol}
                    </div>
                    <div className={`text-[11px] ${isPremium ? "text-gray-500" : "text-gray-500 blur-[4px]"}`}>
                      {rec.name}
                    </div>
                  </div>
                  <div className={`px-[6px] py-[2px] rounded-[3px] text-[10px] ${
                    rec.action === "STRONG BUY" ? "bg-green-400 text-black" :
                    rec.action === "BUY" ? "bg-green-500 text-white" :
                    "bg-gray-700 text-white"
                  }`}>
                    {rec.action}
                  </div>
                </div>
                
                <div className="flex items-center gap-[8px] mb-[8px]">
                  <div className="text-gray-500 text-[11px]">Confidence:</div>
                  <div className="flex-1 bg-gray-900 rounded-full h-[4px]">
                    <div 
                      className="bg-green-400 h-[4px] rounded-full" 
                      style={{ width: `${rec.confidence}%` }}
                    />
                  </div>
                  <div className="text-white text-[11px]">{rec.confidence}%</div>
                </div>

                <div className="grid grid-cols-2 gap-[8px] text-[11px] mb-[8px]">
                  <div>
                    <div className="text-gray-500">Current</div>
                    <div className="text-white">${rec.currentPrice}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Target</div>
                    <div className="text-green-400">${rec.targetPrice}</div>
                  </div>
                </div>

                <div className="text-green-400 text-[11px] mb-[6px]">
                  ↑ {rec.potentialGain}% potential gain
                </div>
                <div className="text-gray-500 text-[10px] italic">{rec.reason}</div>
              </div>
            ))}
          </div>

          <button className="w-full mt-[12px] py-[8px] bg-white text-black rounded-[4px] text-[12px] hover:bg-gray-200 transition-colors">
            View All Recommendations
          </button>
        </div>
      </div>

      {/* Recent Performance */}
      <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
        <h3 className="text-white text-[15px] mb-[12px]">Recent Closed Positions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-900">
                <th className="text-left text-gray-500 pb-[10px] text-[12px]">Symbol</th>
                <th className="text-left text-gray-500 pb-[10px] text-[12px]">Name</th>
                <th className="text-right text-gray-500 pb-[10px] text-[12px]">Return</th>
                <th className="text-right text-gray-500 pb-[10px] text-[12px]">Duration</th>
                <th className="text-right text-gray-500 pb-[10px] text-[12px]">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentPerformers.map((performer) => (
                <tr key={performer.symbol} className="border-b border-gray-900">
                  <td className="py-[12px] text-white text-[13px]">{performer.symbol}</td>
                  <td className="py-[12px] text-gray-400 text-[12px]">{performer.name}</td>
                  <td className="py-[12px] text-right">
                    <div className="flex items-center justify-end gap-[3px]">
                      {performer.gain > 0 ? (
                        <TrendingUp className="size-[12px] text-green-400" />
                      ) : (
                        <TrendingDown className="size-[12px] text-red-400" />
                      )}
                      <span className={`text-[12px] ${performer.gain > 0 ? "text-green-400" : "text-red-400"}`}>
                        {performer.gain > 0 ? "+" : ""}{performer.gain}%
                      </span>
                    </div>
                  </td>
                  <td className="py-[12px] text-right text-white text-[12px]">{performer.duration}</td>
                  <td className="py-[12px] text-right">
                    <span className="px-[8px] py-[2px] bg-white text-black rounded-[3px] text-[11px]">
                      {performer.status}
                    </span>
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