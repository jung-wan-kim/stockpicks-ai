import { useState } from "react";
import { User, Bell, Shield, CreditCard, Globe, Palette, Save, LogIn } from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface SettingsPageProps {
  user?: SupabaseUser | null;
  isAuthenticated?: boolean;
  onLogin?: () => void;
}

export function SettingsPage({ user, isAuthenticated, onLogin }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState("profile");

  // Extract user info from Google OAuth
  const userMetadata = user?.user_metadata || {};
  const fullName = userMetadata.full_name || userMetadata.name || "";
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";
  const email = user?.email || "";
  const avatarUrl = userMetadata.avatar_url || userMetadata.picture || "";
  const initials = firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    : email ? email.charAt(0).toUpperCase() : "?";

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "preferences", label: "Preferences", icon: Globe },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  return (
    <div className="p-[24px]">
      <h2 className="text-white text-[20px] mb-[16px]">Settings</h2>

      <div className="grid grid-cols-[250px_1fr] gap-[16px]">
        {/* Sidebar Tabs */}
        <div className="bg-black rounded-[4px] p-[12px] border border-gray-900 h-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-[10px] px-[12px] py-[10px] rounded-[4px] mb-[6px] transition-colors text-[13px] ${
                  activeTab === tab.id
                    ? "bg-white text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon className="size-[14px]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-black rounded-[4px] p-[24px] border border-gray-900">
          {activeTab === "profile" && (
            <div>
              <h3 className="text-white text-[20px] mb-[24px]">Profile Settings</h3>

              {!isAuthenticated ? (
                <div className="flex flex-col items-center justify-center py-[60px]">
                  <User className="size-[48px] text-gray-600 mb-[16px]" />
                  <h4 className="text-white text-[18px] mb-[8px]">Sign in to view your profile</h4>
                  <p className="text-gray-500 text-[14px] mb-[24px]">Access your account settings after logging in</p>
                  <button
                    onClick={onLogin}
                    className="flex items-center gap-[8px] px-[20px] py-[12px] bg-white text-black rounded-[6px] hover:bg-gray-200 transition-colors"
                  >
                    <LogIn className="size-[16px]" />
                    Sign in with Google
                  </button>
                </div>
              ) : (
                <div className="space-y-[24px]">
                  <div className="flex items-center gap-[24px]">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="Profile"
                        className="size-[80px] rounded-full object-cover"
                      />
                    ) : (
                      <div className="size-[80px] bg-blue-500 rounded-full flex items-center justify-center text-white text-[32px]">
                        {initials}
                      </div>
                    )}
                    <div>
                      <div className="text-white text-[18px] mb-[4px]">{fullName || "User"}</div>
                      <div className="text-gray-400 text-[14px]">{email}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-[16px]">
                    <div>
                      <label className="text-gray-400 text-[14px] block mb-[8px]">First Name</label>
                      <input
                        type="text"
                        defaultValue={firstName}
                        className="w-full bg-gray-700 text-white rounded-[4px] px-[12px] py-[10px] border border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-[14px] block mb-[8px]">Last Name</label>
                      <input
                        type="text"
                        defaultValue={lastName}
                        className="w-full bg-gray-700 text-white rounded-[4px] px-[12px] py-[10px] border border-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-[14px] block mb-[8px]">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full bg-gray-800 text-gray-400 rounded-[4px] px-[12px] py-[10px] border border-gray-600 cursor-not-allowed"
                    />
                    <p className="text-gray-500 text-[11px] mt-[4px]">Email is managed by your Google account</p>
                  </div>

                  <div>
                    <label className="text-gray-400 text-[14px] block mb-[8px]">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Add phone number"
                      className="w-full bg-gray-700 text-white rounded-[4px] px-[12px] py-[10px] border border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-[14px] block mb-[8px]">Bio</label>
                    <textarea
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className="w-full bg-gray-700 text-white rounded-[4px] px-[12px] py-[10px] border border-gray-600"
                    />
                  </div>

                  <button className="flex items-center gap-[8px] px-[16px] py-[10px] bg-blue-600 text-white rounded-[4px] hover:bg-blue-700 transition-colors">
                    <Save className="size-[16px]" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "notifications" && (
            <div>
              <h3 className="text-white text-[20px] mb-[24px]">Notification Preferences</h3>
              
              <div className="space-y-[24px]">
                {[
                  { label: "Email Notifications", sublabel: "Receive updates via email", defaultChecked: true },
                  { label: "Price Alerts", sublabel: "Get notified when prices reach your targets", defaultChecked: true },
                  { label: "Trade Confirmations", sublabel: "Receive confirmation for all trades", defaultChecked: true },
                  { label: "Market News", sublabel: "Daily market news and analysis", defaultChecked: false },
                  { label: "Portfolio Updates", sublabel: "Weekly portfolio performance reports", defaultChecked: true },
                  { label: "Promotional Emails", sublabel: "Receive offers and promotions", defaultChecked: false },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-[16px] bg-gray-700 rounded-[4px]">
                    <div>
                      <div className="text-white mb-[4px]">{item.label}</div>
                      <div className="text-gray-400 text-[12px]">{item.sublabel}</div>
                    </div>
                    <label className="relative inline-block w-[48px] h-[24px]">
                      <input type="checkbox" defaultChecked={item.defaultChecked} className="sr-only peer" />
                      <div className="w-full h-full bg-gray-600 rounded-full peer-checked:bg-blue-600 transition-colors cursor-pointer"></div>
                      <div className="absolute left-[2px] top-[2px] size-[20px] bg-white rounded-full transition-transform peer-checked:translate-x-[24px]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <h3 className="text-white text-[20px] mb-[24px]">Security Settings</h3>
              
              <div className="space-y-[24px]">
                <div>
                  <h4 className="text-white mb-[16px]">Change Password</h4>
                  <div className="space-y-[16px]">
                    <div>
                      <label className="text-gray-400 text-[14px] block mb-[8px]">Current Password</label>
                      <input
                        type="password"
                        className="w-full bg-gray-700 text-white rounded-[4px] px-[12px] py-[10px] border border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-[14px] block mb-[8px]">New Password</label>
                      <input
                        type="password"
                        className="w-full bg-gray-700 text-white rounded-[4px] px-[12px] py-[10px] border border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-[14px] block mb-[8px]">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full bg-gray-700 text-white rounded-[4px] px-[12px] py-[10px] border border-gray-600"
                      />
                    </div>
                    <button className="px-[16px] py-[10px] bg-blue-600 text-white rounded-[4px] hover:bg-blue-700 transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="pt-[24px] border-t border-gray-700">
                  <h4 className="text-white mb-[16px]">Two-Factor Authentication</h4>
                  <div className="p-[16px] bg-gray-700 rounded-[4px] mb-[16px]">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white mb-[4px]">2FA Status</div>
                        <div className="text-green-400 text-[12px]">Enabled</div>
                      </div>
                      <button className="px-[16px] py-[8px] bg-red-600 text-white rounded-[4px] hover:bg-red-700 transition-colors text-[14px]">
                        Disable
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-[24px] border-t border-gray-700">
                  <h4 className="text-white mb-[16px]">Login Sessions</h4>
                  <div className="space-y-[12px]">
                    {[
                      { device: "Chrome on MacBook Pro", location: "New York, USA", date: "Active now" },
                      { device: "Safari on iPhone", location: "New York, USA", date: "2 hours ago" },
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-[16px] bg-gray-700 rounded-[4px]">
                        <div>
                          <div className="text-white mb-[4px]">{session.device}</div>
                          <div className="text-gray-400 text-[12px]">
                            {session.location} • {session.date}
                          </div>
                        </div>
                        <button className="px-[12px] py-[6px] bg-gray-600 text-white rounded-[4px] hover:bg-gray-500 transition-colors text-[14px]">
                          Revoke
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div>
              <h3 className="text-white text-[20px] mb-[24px]">Billing & Subscription</h3>
              
              <div className="space-y-[24px]">
                <div className="p-[24px] bg-blue-900/20 border border-blue-500 rounded-[8px]">
                  <div className="flex items-center justify-between mb-[16px]">
                    <div>
                      <div className="text-white text-[18px] mb-[4px]">Premium Account</div>
                      <div className="text-gray-400 text-[14px]">$29.99 / month</div>
                    </div>
                    <span className="px-[12px] py-[6px] bg-blue-600 text-white rounded-[4px] text-[12px]">
                      Active
                    </span>
                  </div>
                  <p className="text-gray-300 text-[14px] mb-[16px]">
                    Next billing date: February 15, 2024
                  </p>
                  <button className="px-[16px] py-[8px] bg-gray-700 text-white rounded-[4px] hover:bg-gray-600 transition-colors text-[14px]">
                    Manage Subscription
                  </button>
                </div>

                <div>
                  <h4 className="text-white mb-[16px]">Payment Method</h4>
                  <div className="p-[16px] bg-gray-700 rounded-[4px] flex items-center justify-between">
                    <div className="flex items-center gap-[16px]">
                      <div className="size-[40px] bg-blue-600 rounded-[4px] flex items-center justify-center text-white">
                        💳
                      </div>
                      <div>
                        <div className="text-white">•••• •••• •••• 4242</div>
                        <div className="text-gray-400 text-[12px]">Expires 12/25</div>
                      </div>
                    </div>
                    <button className="px-[12px] py-[6px] bg-gray-600 text-white rounded-[4px] hover:bg-gray-500 transition-colors text-[14px]">
                      Update
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-white mb-[16px]">Billing History</h4>
                  <div className="space-y-[8px]">
                    {[
                      { date: "Jan 15, 2024", amount: "$29.99", status: "Paid" },
                      { date: "Dec 15, 2023", amount: "$29.99", status: "Paid" },
                      { date: "Nov 15, 2023", amount: "$29.99", status: "Paid" },
                    ].map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between p-[16px] bg-gray-700 rounded-[4px]">
                        <div>
                          <div className="text-white">{transaction.date}</div>
                          <div className="text-gray-400 text-[12px]">Premium Subscription</div>
                        </div>
                        <div className="flex items-center gap-[16px]">
                          <span className="text-white">{transaction.amount}</span>
                          <span className="px-[12px] py-[4px] bg-green-600 text-white rounded-[4px] text-[12px]">
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div>
              <h3 className="text-white text-[20px] mb-[24px]">Trading Preferences</h3>
              
              <div className="space-y-[24px]">
                <div>
                  <label className="text-gray-400 text-[14px] block mb-[8px]">Default Order Type</label>
                  <select className="w-full bg-gray-700 text-white rounded-[4px] px-[12px] py-[10px] border border-gray-600">
                    <option>Market Order</option>
                    <option>Limit Order</option>
                    <option>Stop Order</option>
                    <option>Stop Limit Order</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 text-[14px] block mb-[8px]">Default Quantity</label>
                  <input
                    type="number"
                    defaultValue="10"
                    className="w-full bg-gray-700 text-white rounded-[4px] px-[12px] py-[10px] border border-gray-600"
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-[14px] block mb-[8px]">Time Zone</label>
                  <select className="w-full bg-gray-700 text-white rounded-[4px] px-[12px] py-[10px] border border-gray-600">
                    <option>Eastern Time (ET)</option>
                    <option>Central Time (CT)</option>
                    <option>Mountain Time (MT)</option>
                    <option>Pacific Time (PT)</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 text-[14px] block mb-[8px]">Currency</label>
                  <select className="w-full bg-gray-700 text-white rounded-[4px] px-[12px] py-[10px] border border-gray-600">
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                    <option>GBP - British Pound</option>
                    <option>JPY - Japanese Yen</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-[16px] bg-gray-700 rounded-[4px]">
                  <div>
                    <div className="text-white mb-[4px]">Confirm All Trades</div>
                    <div className="text-gray-400 text-[12px]">Require confirmation before executing trades</div>
                  </div>
                  <label className="relative inline-block w-[48px] h-[24px]">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-full h-full bg-gray-600 rounded-full peer-checked:bg-blue-600 transition-colors cursor-pointer"></div>
                    <div className="absolute left-[2px] top-[2px] size-[20px] bg-white rounded-full transition-transform peer-checked:translate-x-[24px]"></div>
                  </label>
                </div>

                <button className="flex items-center gap-[8px] px-[16px] py-[10px] bg-blue-600 text-white rounded-[4px] hover:bg-blue-700 transition-colors">
                  <Save className="size-[16px]" />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div>
              <h3 className="text-white text-[20px] mb-[24px]">Appearance Settings</h3>
              
              <div className="space-y-[24px]">
                <div>
                  <label className="text-gray-400 text-[14px] block mb-[16px]">Theme</label>
                  <div className="grid grid-cols-3 gap-[16px]">
                    {[
                      { name: "Dark", active: true },
                      { name: "Light", active: false },
                      { name: "Auto", active: false },
                    ].map((theme) => (
                      <button
                        key={theme.name}
                        className={`p-[16px] rounded-[4px] border-2 transition-colors ${
                          theme.active
                            ? "border-blue-500 bg-blue-900/20"
                            : "border-gray-700 bg-gray-700 hover:border-gray-600"
                        }`}
                      >
                        <div className="text-white mb-[4px]">{theme.name}</div>
                        {theme.active && (
                          <div className="text-blue-400 text-[12px]">Active</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-[14px] block mb-[8px]">Chart Style</label>
                  <select className="w-full bg-gray-700 text-white rounded-[4px] px-[12px] py-[10px] border border-gray-600">
                    <option>Line Chart</option>
                    <option>Candlestick</option>
                    <option>Bar Chart</option>
                    <option>Area Chart</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 text-[14px] block mb-[8px]">Compact Mode</label>
                  <div className="flex items-center justify-between p-[16px] bg-gray-700 rounded-[4px]">
                    <div>
                      <div className="text-white mb-[4px]">Enable Compact Mode</div>
                      <div className="text-gray-400 text-[12px]">Reduce spacing and padding</div>
                    </div>
                    <label className="relative inline-block w-[48px] h-[24px]">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-full h-full bg-gray-600 rounded-full peer-checked:bg-blue-600 transition-colors cursor-pointer"></div>
                      <div className="absolute left-[2px] top-[2px] size-[20px] bg-white rounded-full transition-transform peer-checked:translate-x-[24px]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}