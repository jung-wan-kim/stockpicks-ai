import { X, Check, Sparkles, TrendingUp, BarChart3, Award } from "lucide-react";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

export function SubscriptionModal({ isOpen, onClose, onSubscribe }: SubscriptionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-black border border-gray-800 rounded-[8px] w-[600px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-black border-b border-gray-900 p-[24px] flex items-center justify-between">
          <div>
            <h2 className="text-white text-[24px] mb-[4px]">Unlock Premium Features</h2>
            <p className="text-gray-500 text-[13px]">Get full access to AI stock recommendations</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X className="size-[20px]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-[24px]">
          {/* Login Section */}
          <div className="bg-gray-950 border border-gray-900 rounded-[6px] p-[20px] mb-[24px]">
            <h3 className="text-white text-[16px] mb-[12px]">Sign in to continue</h3>
            <button className="w-full py-[12px] bg-white text-black rounded-[4px] text-[14px] hover:bg-gray-100 transition-colors flex items-center justify-center gap-[10px] mb-[12px]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.20443C17.64 8.56625 17.5827 7.95262 17.4764 7.36353H9V10.845H13.8436C13.635 11.97 13.0009 12.9231 12.0477 13.5613V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.20443Z" fill="#4285F4"/>
                <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z" fill="#34A853"/>
                <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.82999 3.96409 7.28999V4.95818H0.957275C0.347727 6.17318 0 7.54772 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
                <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </button>
            <div className="text-center text-gray-500 text-[11px]">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-white rounded-[8px] p-[24px] mb-[16px]">
            <div className="flex items-center justify-between mb-[16px]">
              <div className="flex items-center gap-[8px]">
                <Sparkles className="size-[20px] text-white" />
                <h3 className="text-white text-[20px]">Premium Plan</h3>
              </div>
              <div className="px-[12px] py-[4px] bg-white text-black rounded-full text-[11px]">
                MOST POPULAR
              </div>
            </div>

            <div className="mb-[20px]">
              <div className="flex items-baseline gap-[8px] mb-[4px]">
                <span className="text-white text-[40px]">$49</span>
                <span className="text-gray-500 text-[16px]">/month</span>
              </div>
              <div className="text-gray-400 text-[13px]">
                Cancel anytime • 7-day free trial
              </div>
            </div>

            <div className="space-y-[10px] mb-[20px]">
              {[
                { icon: TrendingUp, text: "Unlimited AI stock recommendations" },
                { icon: BarChart3, text: "Advanced technical analysis & charts" },
                { icon: Award, text: "Real-time market insights & alerts" },
                { icon: Sparkles, text: "Portfolio performance tracking" },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center gap-[10px]">
                    <div className="size-[32px] bg-white rounded-[6px] flex items-center justify-center">
                      <Icon className="size-[16px] text-black" />
                    </div>
                    <span className="text-white text-[14px]">{feature.text}</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={onSubscribe}
              className="w-full py-[14px] bg-white text-black rounded-[6px] text-[14px] hover:bg-gray-200 transition-colors"
            >
              Start 7-Day Free Trial
            </button>

            <div className="mt-[12px] text-center text-gray-500 text-[11px]">
              $49/month after trial ends • Cancel anytime
            </div>
          </div>

          {/* Basic Plan */}
          <div className="bg-black border border-gray-800 rounded-[8px] p-[20px]">
            <div className="flex items-center justify-between mb-[12px]">
              <h3 className="text-white text-[16px]">Basic Plan</h3>
              <span className="text-white text-[24px]">Free</span>
            </div>

            <div className="space-y-[8px] mb-[16px]">
              {[
                "3 AI recommendations per week",
                "Basic market insights",
                "Limited stock analysis",
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-[8px]">
                  <Check className="size-[16px] text-gray-500 mt-[2px]" />
                  <span className="text-gray-400 text-[13px]">{feature}</span>
                </div>
              ))}
            </div>

            <button className="w-full py-[10px] bg-gray-900 text-gray-400 rounded-[6px] text-[13px] cursor-default">
              Current Plan
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-[24px] pt-[24px] border-t border-gray-900">
            <div className="grid grid-cols-3 gap-[16px] text-center">
              <div>
                <div className="text-white text-[20px] mb-[4px]">73.5%</div>
                <div className="text-gray-500 text-[11px]">Win Rate</div>
              </div>
              <div>
                <div className="text-white text-[20px] mb-[4px]">10K+</div>
                <div className="text-gray-500 text-[11px]">Active Users</div>
              </div>
              <div>
                <div className="text-white text-[20px] mb-[4px]">+25%</div>
                <div className="text-gray-500 text-[11px]">Avg Return</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}