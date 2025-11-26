import { useState, useEffect } from "react";
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
import { useSubscription } from "./hooks/useSubscription";
import { signOut } from "./lib/supabase";

type PageType = "dashboard" | "recommendations" | "analysis" | "mypicks" | "performance" | "insights" | "settings";

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const { user, isAuthenticated, loading } = useAuth();
  const { isPremium, subscription, refetch: refetchSubscription } = useSubscription();

  const handleUnlock = () => {
    setShowSubscriptionModal(true);
  };

  const handleSubscribe = () => {
    // Refetch subscription status after successful payment
    refetchSubscription();
    setShowSubscriptionModal(false);
  };

  const handleSignOut = async () => {
    await signOut();
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
              {isAuthenticated ? (
                <div className="flex flex-row items-center size-full">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center px-[12px] py-[10px] relative w-full">
                    <div className="max-w-[223px] relative rounded-[9999px] shrink-0 size-[32px]">
                      {user?.user_metadata?.avatar_url ? (
                        <img
                          src={user.user_metadata.avatar_url}
                          alt="Profile"
                          className="absolute inset-0 w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px] bg-white flex items-center justify-center">
                          <span className="text-black text-[14px]">
                            {user?.email?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="box-border content-stretch flex flex-col items-start pl-[10px] pr-0 py-0 relative shrink-0 flex-1">
                      <div className="content-stretch flex flex-col items-start relative shrink-0">
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                          <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-white">
                            <p className="leading-[18px] truncate max-w-[120px]">
                              {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                            </p>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                          <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-gray-500">
                            <p className="leading-[14px]">{isPremium ? `Pro ${subscription?.plan === 'yearly' ? 'Yearly' : 'Monthly'}` : "Free Plan"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="text-gray-500 hover:text-white transition-colors ml-[8px]"
                      title="Sign out"
                    >
                      <LogOut className="size-[16px]" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleUnlock}
                  className="w-full flex items-center gap-[12px] px-[12px] py-[10px] rounded-[6px] hover:bg-gray-900 transition-colors"
                >
                  <div className="size-[32px] bg-white rounded-full flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.64 9.20443C17.64 8.56625 17.5827 7.95262 17.4764 7.36353H9V10.845H13.8436C13.635 11.97 13.0009 12.9231 12.0477 13.5613V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.20443Z" fill="#4285F4"/>
                      <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z" fill="#34A853"/>
                      <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.82999 3.96409 7.28999V4.95818H0.957275C0.347727 6.17318 0 7.54772 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
                      <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-white text-[13px]">Sign in with Google</div>
                    <div className="text-gray-500 text-[11px]">Get full access</div>
                  </div>
                </button>
              )}
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
        userId={user?.id}
      />
    </div>
  );
}

export default App;