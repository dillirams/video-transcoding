import { WalletProvider } from "@solana/wallet-adapter-react";
import { UserCircle2 } from "lucide-react";


interface TutorNavbarProps {
  tutorName?: string;
}

export function TutorNavbar({ tutorName }: TutorNavbarProps) {
  return (
    <nav className="w-full bg-white border-b border-[#e8dfd2] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#d97757] text-white flex items-center justify-center font-bold text-xl">
            B
          </div>

          <div>
            <h1 className="font-bold text-lg text-[#234b33]">
              Brothers Bhutan
            </h1>
            <p className="text-xs tracking-[0.3em] text-[#d97757] uppercase">
              Academy
            </p>
          </div>
        </div>

        <div>
        
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 bg-[#f6f1e9] px-4 py-2 rounded-full">
          <UserCircle2 className="w-8 h-8 text-[#234b33]" />
          <span className="font-medium text-[#234b33]">
            {tutorName || "Tutor"}
          </span>
        </div>
      </div>
    </nav>
  );
}