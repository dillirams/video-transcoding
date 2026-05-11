import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Leaf,
  MessageCircle,
} from "lucide-react";
import { Footer } from "../component/footer";
import { Button } from "../component/button";
import { useCourseState } from "../store/create";
import { ChatWithAi } from "../component/chatWithAi";

export function Dashboard() {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  const {chatAi, setChatAi}=useCourseState();

  const pathways = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Mathematics & Logic",
      description:
        "Build foundations through intuitive understanding rather than rote memorization.",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Language & Dzongkha",
      description:
        "Preserve our voice and connect with global narratives through expressive speech.",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Science & Environment",
      description:
        "Understand our natural world through stewardship and modern discovery.",
    },
    {
      icon: <HeartHandshake className="w-6 h-6" />,
      title: "Counselling & Wellbeing",
      description:
        "Compassionate guidance for academic decisions, careers, and personal growth.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f6f1e9] text-[#1c1c1c]">
      {/* Navbar */}
      <nav className="w-full border-b border-[#e5ded3] bg-[#f6f1e9] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d97757] text-white flex items-center justify-center font-bold text-xl">
              B
            </div>
            <div>
              <h1 className="font-bold text-lg">Brothers Bhutan</h1>
              <p className="text-sm tracking-[0.3em] text-[#d97757] uppercase">
                Academy
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10 text-sm font-medium">
            <a href="#pathways" className="hover:text-[#d97757]">
              Pathways
            </a>
            <a href="#mentors" className="hover:text-[#d97757]">
              Mentors
            </a>
            <a href="#story" className="hover:text-[#d97757]">
              Our Story
            </a>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => navigate("/studentLogin")}
              className="px-4 py-2 text-sm font-medium"
            >
              Student Login
            </button>
            <button
              onClick={() => navigate("/tutorSignup")}
              className="px-5 py-2 rounded-full bg-[#234b33] text-white"
            >
              Tutor Entrance
            </button>
          </div>

          {/* Mobile Menu */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenu && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-4 bg-[#f6f1e9]">
            <a href="#pathways">Pathways</a>
            <a href="#mentors">Mentors</a>
            <a href="#story">Our Story</a>
            <button
              onClick={() => navigate("/studentLogin")}
              className="text-left"
            >
              Student Login
            </button>
            <button
              onClick={() => navigate("/tutorSignup")}
              className="text-left"
            >
              Tutor Entrance
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-14 items-center">
        {/* Left */}
        <div>
          <p className="uppercase tracking-[0.2em] text-sm text-[#d97757] mb-4">
            Guided by Heritage • Built for the Future
          </p>

          <h1 className="text-5xl md:text-7xl leading-tight font-serif">
            A supportive home for{" "}
            <span className="italic text-[#d97757]">lifelong learning</span>{" "}
            and growth.
          </h1>

          <p className="mt-8 text-lg text-gray-600 max-w-xl leading-relaxed">
            Brothers Bhutan Academy connects students with mentors who teach
            with patience, care, and the wisdom of Himalayan heritage.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Button
              name="Begin as a Student"
              size="sm"
              variant="primary"
              onClick={() => navigate("/studentLogin")}
            > Join as Student</Button>
            <button
              onClick={() => navigate("/tutorSignup")}
              className="px-8 py-3 rounded-full border border-gray-300 bg-white hover:shadow-md"
            >
              Join as a Tutor
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="relative">
          <div className="rounded-[2rem] overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80"
              alt="Bhutan"
              className="w-full h-[500px] object-cover"
            />
          </div>

         

          <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-lg max-w-xs">
            <p className="italic text-[#d97757] text-xl">
              “Education is a shared cup of tea.”
            </p>
            <p className="text-xs tracking-[0.3em] mt-3 text-gray-500 uppercase">
              Bhutanese Proverb
            </p>
          </div>
        </div>
      </section>

      <div className="">
        <button
  onClick={()=>{setChatAi(!chatAi)}}
  className="fixed top-1/2 right-0 -translate-y-1/2 z-50 flex items-center gap-2 rounded-l-2xl bg-blue-600 px-4 py-3 text-white shadow-lg transition-all duration-300 hover:-translate-x-1 hover:shadow-2xl"
>
  <MessageCircle className="h-5 w-5" />
  <span className="font-medium whitespace-nowrap">Ask AI</span>
</button>
<div>
  {chatAi&&<ChatWithAi/>}
</div>
        
      </div>

      {/* Philosophy Section */}
      <section className="bg-[#234b33] text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-sm text-[#f2d5c4] mb-8">
            Our Guiding Wisdom
          </p>

          <h2 className="text-4xl md:text-6xl leading-relaxed font-serif">
            Give a man a fish and you feed him for a day;{" "}
            <span className="italic text-[#f2d5c4]">
              teach a man to fish and you feed him for a lifetime.
            </span>
          </h2>

          <p className="uppercase tracking-[0.3em] text-sm mt-8 text-[#f2d5c4]">
            The philosophy behind our academy
          </p>
        </div>
      </section>

      {/* Pathways */}
      <section
        id="pathways"
        className="max-w-7xl mx-auto px-6 py-24"
      >
        <div className="grid lg:grid-cols-2 gap-10 mb-14">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-[#d97757] mb-4">
              What We Teach
            </p>
            <h2 className="text-5xl font-serif">
              Pathways of <span className="italic">discovery.</span>
            </h2>
          </div>

          <p className="text-lg text-gray-600 max-w-lg">
            Subjects taught with patience, personal care, and deep subject
            mastery.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pathways.map((path, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition"
            >
              <div className="w-14 h-14 rounded-full bg-[#f6f1e9] flex items-center justify-center text-[#d97757] mb-6">
                {path.icon}
              </div>

              <h3 className="text-2xl font-serif mb-4">{path.title}</h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                {path.description}
              </p>

              <button className="text-[#d97757] font-medium">
                Explore path →
              </button>
            </div>
          ))}
        </div>
      </section>

      
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto bg-white rounded-[3rem] py-16 px-8 text-center shadow-sm">
          <h2 className="text-4xl md:text-6xl font-serif">
            Begin your <span className="italic text-[#d97757]">journey</span>{" "}
            today.
          </h2>

          <p className="text-lg text-gray-600 mt-6">
            Whether you're here to learn or to teach — the door is open, and
            the tea is warm.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Button
              name="Login as Student"
              size="sm"
              variant="primary"
              onClick={() => navigate("/studentLogin")}
            >Join as Student</Button>

            <button
              onClick={() => navigate("/tutorSignup")}
              className="px-8 py-3 rounded-full bg-[#234b33] text-white"
            >
              Login as Tutor
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}