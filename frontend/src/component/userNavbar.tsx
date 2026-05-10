import { UserCircle2, BookOpen, Compass, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface UserNavbarProps {
  userName?: string;
}

export function UserNavbar({ userName }: UserNavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Basic logout handling: clear cookies/localstorage as needed, redirect.
    // For now we'll just redirect since no global state management is explicit
    navigate("/studentLogin");
  };

  return (
    <nav className="w-full bg-[#2c3e50] border-b border-[#1a252f] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#e6b89c] text-[#2c3e50] flex items-center justify-center font-bold text-xl">
            B
          </div>

          <div>
            <h1 className="font-bold text-lg text-white">
              Brothers Bhutan
            </h1>
            <p className="text-xs tracking-[0.3em] text-[#e6b89c] uppercase">
              Student
            </p>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-white/80 font-medium">
          <Link
            to="/courses"
            className="flex items-center gap-2 hover:text-[#e6b89c] transition-colors"
          >
            <Compass size={18} />
            Browse Courses
          </Link>

          <Link
            to="/my-courses"
            className="flex items-center gap-2 hover:text-[#e6b89c] transition-colors"
          >
            <BookOpen size={18} />
            My Learning
          </Link>
        </div>

        {/* Right: User Profile & Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-[#1a252f] px-4 py-2 rounded-full">
            <UserCircle2 className="w-6 h-6 text-[#e6b89c]" />
            <span className="font-medium text-white text-sm">
              {userName || "Student"}
            </span>
          </div>
          
          <button
            onClick={handleLogout}
            className="text-white/60 hover:text-white p-2 rounded-full transition-colors bg-[#1a252f] hover:bg-red-500"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}
