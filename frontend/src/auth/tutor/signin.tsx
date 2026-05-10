import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, GraduationCap, ShieldCheck } from "lucide-react";

import { Input } from "../../component/input";
import { Button } from "../../component/button";

export function TutorSignin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function signin() {
    try {
      setLoading(true);

      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      const res = await axios.post(
        "http://localhost:3000/v1/api/adminSignin",
        {
          email,
          password,
        },
        {
          withCredentials:true
        }
      );

      alert(res.data.message);

      navigate("/tutorDashboard");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f1e9] flex">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-[#234b33] text-white p-16 flex-col justify-between">
        {/* Back */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>

        {/* Main Content */}
        <div>
          <p className="uppercase tracking-[0.3em] text-sm text-[#f2d5c4] mb-6">
            Welcome Back Mentor
          </p>

          <h1 className="text-5xl font-serif leading-tight">
            Continue shaping
            <span className="italic text-[#f2d5c4]">
              {" "}young minds.
            </span>
          </h1>

          <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-lg">
            Sign in to manage your courses, guide learners, and continue
            building educational impact through Bhutan Brothers Academy.
          </p>

          <div className="mt-10 flex items-center gap-3 text-white/90">
            <ShieldCheck className="w-6 h-6 text-[#f2d5c4]" />
            <p>Secure mentor dashboard access</p>
          </div>
        </div>

        {/* Footer Branding */}
        <div className="flex items-center gap-3">
          <GraduationCap className="w-10 h-10 text-[#f2d5c4]" />
          <p className="text-sm tracking-[0.3em] uppercase">
            Brothers Bhutan Academy
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl p-8 md:p-10">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-serif text-[#234b33]">
              Tutor Sign In
            </h2>

            <p className="text-gray-500 mt-3">
              Access your teaching dashboard.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
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
              placeholder="Enter your password"
              type="password"
            />

            <Button
              onClick={signin}
              loading={loading}
              fullWidth
              size="lg"
              variant="primary"
            >
              Sign In
            </Button>
          </div>

          {/* Bottom Links */}
          <div className="mt-8 text-center space-y-3">
            <p className="text-sm text-gray-500">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/tutorSignup")}
                className="text-[#d97757] font-medium cursor-pointer hover:underline"
              >
                Create Tutor Account
              </span>
            </p>

            <p className="text-sm text-gray-400 cursor-pointer hover:text-[#d97757]">
              Forgot Password?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}