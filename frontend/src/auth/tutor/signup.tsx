import { useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft } from "lucide-react";
import axios from "axios";
import { Input } from "../../component/input";
import { Button } from "../../component/button";

export function TutorSignup() {
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  async function signup() {
    try {
      setLoading(true);

      const name = nameRef.current?.value;
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      const res = await axios.post(
        "http://localhost:3000/v1/api/adminSignup",
        {
          name,
          email,
          password,
        }
      );

      alert(res.data.message);
      navigate("/tutorSignin");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f1e9] flex">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 bg-[#234b33] text-white p-16 flex-col justify-between">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>

        <div>
          <p className="uppercase tracking-[0.3em] text-sm text-[#f2d5c4] mb-6">
            Become a Mentor
          </p>

          <h1 className="text-5xl font-serif leading-tight">
            Share your wisdom,
            <span className="italic text-[#f2d5c4]">
              {" "}shape futures.
            </span>
          </h1>

          <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-lg">
            Join Bhutan Brothers Academy as a tutor and help students grow
            through meaningful education.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <GraduationCap className="w-10 h-10 text-[#f2d5c4]" />
          <p className="text-sm tracking-[0.3em] uppercase">
            Brothers Bhutan Academy
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-serif text-[#234b33]">
              Tutor Sign Up
            </h2>
            <p className="text-gray-500 mt-3">
              Start your mentorship journey today.
            </p>
          </div>

          <div className="space-y-5">
            <Input
              ref={nameRef}
              id="name"
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
            />

            <Input
              ref={emailRef}
              id="email"
              label="Email Address"
              placeholder="Enter your email"
              type="email"
            />

            <Input
              ref={passwordRef}
              id="password"
              label="Password"
              placeholder="Create a password"
              type="password"
            />

            <Button
              onClick={signup}
              loading={loading}
              fullWidth
              size="lg"
              variant="primary"
            >
              Create Tutor Account
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/tutorSignin")}
              className="text-[#d97757] font-medium cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}