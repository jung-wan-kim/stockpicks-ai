import { Lock } from "lucide-react";

interface BlurOverlayProps {
  onClick: () => void;
  message?: string;
}

export function BlurOverlay({ onClick, message = "Premium Feature" }: BlurOverlayProps) {
  return (
    <div
      onClick={onClick}
      className="absolute inset-0 backdrop-blur-[8px] bg-black/30 flex items-center justify-center cursor-pointer group z-10 rounded-[4px]"
    >
      <div className="bg-black/80 border border-white/20 rounded-[8px] px-[20px] py-[16px] flex flex-col items-center gap-[8px] group-hover:scale-105 transition-transform">
        <Lock className="size-[24px] text-white" />
        <div className="text-white text-[14px]">{message}</div>
        <div className="text-gray-400 text-[11px]">Click to unlock</div>
      </div>
    </div>
  );
}
