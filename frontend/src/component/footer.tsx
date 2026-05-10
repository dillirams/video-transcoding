import { Mail, MapPin, Phone, Globe, Share2, MessageCircle, Info } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#234b33] text-white pt-16 pb-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#d97757] rounded-xl flex items-center justify-center font-serif text-2xl font-bold">
              B
            </div>
            <span className="text-2xl font-serif font-bold tracking-tight">
              Brothers <span className="italic text-[#d97757]">Bhutan</span>
            </span>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Empowering Bhutan's next generation of thinkers, creators, and leaders through accessible, high-quality digital education.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#d97757] transition-colors">
              <Globe size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#d97757] transition-colors">
              <Share2 size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#d97757] transition-colors">
              <MessageCircle size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#d97757] transition-colors">
              <Info size={20} />
            </a>
          </div>

        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-serif font-bold mb-6 text-[#d97757]">Quick Links</h3>
          <ul className="space-y-4 text-gray-300">
            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="/courses" className="hover:text-white transition-colors">Browse Courses</a></li>
            <li><a href="/my-courses" className="hover:text-white transition-colors">My Learning</a></li>
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-serif font-bold mb-6 text-[#d97757]">Resources</h3>
          <ul className="space-y-4 text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Become a Tutor</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-serif font-bold mb-6 text-[#d97757]">Contact Us</h3>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start gap-3">
              <MapPin className="text-[#d97757] shrink-0" size={20} />
              <span>Thimphu, Bhutan<br />Main Street, Zone 1</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-[#d97757] shrink-0" size={20} />
              <span>+975 17123456</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-[#d97757] shrink-0" size={20} />
              <span>contact@brothersbhutan.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto border-t border-white/10 mt-16 pt-8 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Brothers Bhutan Academy. All rights reserved.</p>
      </div>
    </footer>
  );
}
