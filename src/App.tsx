import { useState } from "react";
import { Home, TrendingUp, BarChart3, Star, Activity, Lightbulb, Settings, Bell, Search, LogOut } from "lucide-react";
import { Dashboard } from "./components/Dashboard";
import { Recommendations } from "./components/Recommendations";
import { Analysis } from "./components/Analysis";
import { MyPicks } from "./components/MyPicks";
import { Performance } from "./components/Performance";
import { MarketInsights } from "./components/MarketInsights";
import { SettingsPage } from "./components/SettingsPage";
import { SubscriptionModal } from "./components/SubscriptionModal";
import { useAuth } from "./hooks/useAuth";
import { signOut } from "./lib/supabase";

type PageType = "dashboard" | "recommendations" | "analysis" | "mypicks" | "performance" | "insights" | "settings";

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  const [isPremium, setIsPremium] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const { user, isAuthenticated, loading } = useAuth();

  const handleUnlock = () => {
    setShowSubscriptionModal(true);
  };

  const handleSubscribe = () => {
    setIsPremium(true);
    setShowSubscriptionModal(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsPremium(false);
  };

  const menuItems = [
    { id: "dashboard" as PageType, label: "Dashboard", icon: Home },
    { id: "recommendations" as PageType, label: "AI Recommendations", icon: TrendingUp },
    { id: "analysis" as PageType, label: "Stock Analysis", icon: BarChart3 },
    { id: "mypicks" as PageType, label: "My Picks", icon: Star },
    { id: "performance" as PageType, label: "Performance", icon: Activity },
    { id: "insights" as PageType, label: "Market Insights", icon: Lightbulb },
    { id: "settings" as PageType, label: "Settings", icon: Settings },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard isPremium={isPremium} onUnlock={handleUnlock} />;
      case "recommendations":
        return <Recommendations isPremium={isPremium} onUnlock={handleUnlock} />;
      case "analysis":
        return <Analysis isPremium={isPremium} onUnlock={handleUnlock} />;
      case "mypicks":
        return <MyPicks isPremium={isPremium} onUnlock={handleUnlock} />;
      case "performance":
        return <Performance isPremium={isPremium} onUnlock={handleUnlock} />;
      case "insights":
        return <MarketInsights isPremium={isPremium} onUnlock={handleUnlock} />;
      case "settings":
        return <SettingsPage user={user} isAuthenticated={isAuthenticated} onLogin={handleUnlock} />;
      default:
        return <Dashboard isPremium={isPremium} onUnlock={handleUnlock} />;
    }
  };

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <div className="bg-black box-border content-stretch flex flex-col items-start pl-0 pr-px py-0 relative self-stretch shrink-0 w-[256px] border-r border-gray-900">
        <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-900 border-solid inset-0 pointer-events-none" />
        
        {/* Header */}
        <div className="relative shrink-0 w-[255px]">
          <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-900 border-solid inset-0 pointer-events-none" />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] items-start pb-[20px] pt-[20px] px-[20px] relative w-[255px]">
            <div className="relative shrink-0 w-full">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative w-full">
                <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white w-[110.69px]">
                  <p className="leading-[28px]">StockPicks</p>
                </div>
              </div>
            </div>
            <div className="relative shrink-0 w-full">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative w-full">
                <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 w-[127.64px]">
                  <p className="leading-[18px]">AI Stock Advisor</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 relative shrink-0 w-[255px]">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-full items-start p-[12px] relative w-[255px]">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`${
                    isActive ? "bg-white text-black" : "text-gray-400 hover:text-white"
                  } relative rounded-[6px] shrink-0 w-full transition-all`}
                >
                  <div className="flex flex-row items-center size-full">
                    <div className="box-border content-stretch flex items-center px-[12px] py-[10px] relative w-full">
                      <div className="content-stretch flex flex-col items-start relative shrink-0">
                        <Icon className="size-[16px]" />
                      </div>
                      <div className="box-border content-stretch flex flex-col items-start pl-[10px] pr-0 py-0 relative shrink-0">
                        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px]">
                          <p className="leading-[20px]">{item.label}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* User Footer */}
        <div className="relative shrink-0 w-[255px]">
          <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-gray-900 border-solid inset-0 pointer-events-none" />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-[12px] pt-[12px] px-[12px] relative w-[255px]">
            <div className="relative shrink-0 w-full">
              <div className="flex flex-row items-center size-full">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center px-[12px] py-[10px] relative w-full">
                  <div className="max-w-[223px] relative rounded-[9999px] shrink-0 size-[32px]">
                    {isAuthenticated && user?.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="Profile"
                        className="absolute inset-0 w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px] bg-white flex items-center justify-center">
                        <span className="text-black text-[14px]">
                          {isAuthenticated ? user?.email?.charAt(0).toUpperCase() : "AI"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="box-border content-stretch flex flex-col items-start pl-[10px] pr-0 py-0 relative shrink-0 flex-1">
                    <div className="content-stretch flex flex-col items-start relative shrink-0">
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-white">
                          <p className="leading-[18px] truncate max-w-[120px]">
                            {isAuthenticated ? (user?.user_metadata?.full_name || user?.email?.split('@')[0]) : "AI Advisor"}
                          </p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500">
                          <p className="leading-[14px]">{isPremium ? "Premium Plan" : "Free Plan"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {isAuthenticated && (
                    <button
                      onClick={handleSignOut}
                      className="text-gray-500 hover:text-white transition-colors ml-[8px]"
                      title="Sign out"
                    >
                      <LogOut className="size-[16px]" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-black overflow-y-auto">
        {/* Top Header */}
        <div className="bg-black relative shrink-0 w-full border-b border-gray-900">
          <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-900 border-solid inset-0 pointer-events-none" />
          <div className="size-full">
            <div className="box-border content-stretch flex flex-col items-start pb-[12px] pt-[12px] px-[24px] relative w-full">
              <div className="relative shrink-0 w-full">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-between relative w-full">
                  <div className="content-stretch flex items-center relative shrink-0 gap-[24px]">
                    <div className="content-stretch flex items-center relative shrink-0">
                      <div className="content-stretch flex flex-col items-start relative shrink-0">
                        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-gray-500">
                          <p className="leading-[18px]">Active Picks:</p>
                        </div>
                      </div>
                      <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0">
                        <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white">
                          <p className="leading-[24px]">8</p>
                        </div>
                      </div>
                    </div>
                    <div className="box-border content-stretch flex flex-col items-start relative shrink-0">
                      <div className="content-stretch flex gap-[0.01px] items-center relative shrink-0">
                        <div className="content-stretch flex flex-col items-start relative shrink-0">
                          <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-gray-500">
                            <p className="leading-[18px]">Win Rate:</p>
                          </div>
                        </div>
                        <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0">
                          <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-green-400">
                            <p className="leading-[24px]">73.5%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center relative shrink-0">
                    <button className="content-stretch flex flex-col items-center justify-center relative shrink-0 text-gray-500 hover:text-white transition-colors">
                      <Bell className="size-[18px]" />
                    </button>
                    <div className="box-border content-stretch flex flex-col items-start pl-[16px] pr-0 py-0 relative shrink-0">
                      <button className="content-stretch flex flex-col items-center justify-center relative shrink-0 text-gray-500 hover:text-white transition-colors">
                        <Search className="size-[18px]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        {renderPage()}
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSubscribe={handleSubscribe}
        isAuthenticated={isAuthenticated}
        userEmail={user?.email}
      />
    </div>
  );
}

export default App;