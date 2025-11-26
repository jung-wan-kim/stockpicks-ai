import { Star, TrendingUp, TrendingDown, X, Plus } from "lucide-react";

const myPicks = [
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    addedDate: "2024-01-10",
    addedPrice: 485.20,
    currentPrice: 512.34,
    targetPrice: 580.00,
    shares: 0,
    status: "Active",
    gain: 5.6,
    daysHeld: 15,
    aiRecommendation: "STRONG BUY",
    confidence: 92,
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    addedDate: "2024-01-08",
    addedPrice: 235.40,
    currentPrice: 248.56,
    targetPrice: 285.00,
    shares: 0,
    status: "Active",
    gain: 5.6,
    daysHeld: 17,
    aiRecommendation: "BUY",
    confidence: 78,
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    addedDate: "2023-12-20",
    addedPrice: 182.50,
    currentPrice: 185.42,
    targetPrice: 210.00,
    shares: 0,
    status: "Active",
    gain: 1.6,
    daysHeld: 36,
    aiRecommendation: "BUY",
    confidence: 75,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    addedDate: "2023-12-15",
    addedPrice: 365.80,
    currentPrice: 378.92,
    targetPrice: 420.00,
    shares: 0,
    status: "Active",
    gain: 3.6,
    daysHeld: 41,
    aiRecommendation: "BUY",
    confidence: 82,
  },
  {
    symbol: "META",
    name: "Meta Platforms",
    addedDate: "2023-11-05",
    addedPrice: 312.50,
    currentPrice: 348.90,
    targetPrice: 380.00,
    shares: 0,
    status: "Closed",
    gain: 11.7,
    daysHeld: 71,
    aiRecommendation: "HOLD",
    confidence: 68,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    addedDate: "2024-01-05",
    addedPrice: 145.30,
    currentPrice: 142.34,
    targetPrice: 165.00,
    shares: 0,
    status: "Active",
    gain: -2.0,
    daysHeld: 20,
    aiRecommendation: "HOLD",
    confidence: 70,
  },
];

interface MyPicksProps {
  isPremium: boolean;
  onUnlock: () => void;
}

export function MyPicks({ isPremium, onUnlock }: MyPicksProps) {
  const activePicks = myPicks.filter((p) => p.status === "Active");
  const avgReturn = activePicks.reduce((sum, p) => sum + p.gain, 0) / activePicks.length;
  const winningPicks = activePicks.filter((p) => p.gain > 0).length;

  return (
    <div className="p-[24px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-[16px]">
        <div>
          <h2 className="text-white text-[20px] mb-[4px]">My Picks</h2>
          <p className="text-gray-500 text-[12px]">Track your selected AI recommendations</p>
        </div>
        <button className="flex items-center gap-[6px] px-[12px] py-[8px] bg-white text-black rounded-[4px] hover:bg-gray-200 transition-colors text-[13px]">
          <Plus className="size-[14px]" />
          Add Pick
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-[16px] mb-[16px]">
        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="text-gray-500 text-[12px] mb-[8px]">Active Picks</div>
          <div className="text-white text-[24px]">{activePicks.length}</div>
          <div className="text-gray-600 text-[11px] mt-[4px]">Currently tracking</div>
        </div>

        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="text-gray-500 text-[12px] mb-[8px]">Avg Return</div>
          <div className={`text-[24px] ${avgReturn > 0 ? "text-green-400" : "text-red-400"}`}>
            {avgReturn > 0 ? "+" : ""}{avgReturn.toFixed(1)}%
          </div>
          <div className="text-gray-600 text-[11px] mt-[4px]">Since added</div>
        </div>

        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="text-gray-500 text-[12px] mb-[8px]">Winning Picks</div>
          <div className="text-white text-[24px]">{winningPicks}/{activePicks.length}</div>
          <div className="text-green-400 text-[11px] mt-[4px]">
            {((winningPicks / activePicks.length) * 100).toFixed(0)}% success rate
          </div>
        </div>

        <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
          <div className="text-gray-500 text-[12px] mb-[8px]">Best Performer</div>
          <div className="text-white text-[24px]">META</div>
          <div className="text-green-400 text-[11px] mt-[4px]">+11.7% return</div>
        </div>
      </div>

      {/* Picks List */}
      <div className="bg-black rounded-[4px] p-[20px] border border-gray-900">
        <h3 className="text-white text-[15px] mb-[12px]">All Picks</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-900">
                <th className="text-left text-gray-500 pb-[10px] text-[12px]">Stock</th>
                <th className="text-right text-gray-500 pb-[10px] text-[12px]">Added</th>
                <th className="text-right text-gray-500 pb-[10px] text-[12px]">Entry Price</th>
                <th className="text-right text-gray-500 pb-[10px] text-[12px]">Current Price</th>
                <th className="text-right text-gray-500 pb-[10px] text-[12px]">Target</th>
                <th className="text-right text-gray-500 pb-[10px] text-[12px]">Return</th>
                <th className="text-right text-gray-500 pb-[10px] text-[12px]">Days</th>
                <th className="text-right text-gray-500 pb-[10px] text-[12px]">Status</th>
                <th className="text-right text-gray-500 pb-[10px] text-[12px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {myPicks.map((pick) => (
                <tr key={pick.symbol} className="border-b border-gray-900 hover:bg-gray-950">
                  <td className="py-[12px]">
                    <div className="flex items-center gap-[8px]">
                      <Star className="size-[12px] text-white fill-white" />
                      <div>
                        <div className="text-white text-[13px]">{pick.symbol}</div>
                        <div className="text-gray-500 text-[11px]">{pick.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-[12px] text-right text-gray-400 text-[12px]">{pick.addedDate}</td>
                  <td className="py-[12px] text-right text-white text-[12px]">${pick.addedPrice}</td>
                  <td className="py-[12px] text-right text-white text-[12px]">${pick.currentPrice}</td>
                  <td className="py-[12px] text-right text-green-400 text-[12px]">${pick.targetPrice}</td>
                  <td className="py-[12px] text-right">
                    <div className="flex items-center justify-end gap-[3px]">
                      {pick.gain > 0 ? (
                        <TrendingUp className="size-[12px] text-green-400" />
                      ) : (
                        <TrendingDown className="size-[12px] text-red-400" />
                      )}
                      <span className={`text-[12px] ${pick.gain > 0 ? "text-green-400" : "text-red-400"}`}>
                        {pick.gain > 0 ? "+" : ""}{pick.gain}%
                      </span>
                    </div>
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
      </div>
    </div>
  );
}