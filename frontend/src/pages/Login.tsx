import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.loading);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      alert("Please enter email and password");
      return;
    }

    const success = await login(email.trim(), password);

    if (success) {
      navigate("/home");
    } else {
      alert(
        "Login failed. Please check your email, password, or browser console."
      );
    }
  };

  const inputClass =
    "h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 shadow-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left Hero */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-cyan-600 lg:flex">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl" />

          <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-black text-indigo-600 shadow-lg">
                AI
              </div>

              <span className="text-xl font-bold text-white">
                Interview<span className="text-cyan-200">AI</span>
              </span>
            </div>

            {/* Main */}
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                AI-powered career preparation
              </div>

              <h1 className="text-5xl font-extrabold leading-tight text-white xl:text-6xl">
                Prepare better.
                <br />
                <span className="text-cyan-200">
                  Interview smarter.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-indigo-100">
                Get personalized interview questions, identify your skill gaps,
                and build a preparation roadmap tailored to your dream role.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xl font-bold text-white">AI</p>
                  <p className="mt-1 text-xs text-indigo-100">
                    Analysis
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xl font-bold text-white">Q&A</p>
                  <p className="mt-1 text-xs text-indigo-100">
                    Practice
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xl font-bold text-white">Plan</p>
                  <p className="mt-1 text-xs text-indigo-100">
                    Roadmap
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-indigo-200">
              Your personal AI interview coach.
            </p>
          </div>
        </div>

        {/* Right Login */}
        <div className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-sm font-black text-white">
                AI
              </div>

              <span className="text-xl font-bold text-slate-900">
                Interview<span className="text-indigo-600">AI</span>
              </span>
            </div>

            <div className="mb-8">
              <p className="text-sm font-semibold text-indigo-600">
                WELCOME BACK
              </p>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Continue your personalized interview preparation journey.
              </p>
            </div>

            <Card className="rounded-3xl border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-8">
              <div className="space-y-5">

                {/* Email */}
                <div>
                  <Label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>

                {/* Password */}
                <div>
                  <Label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </Label>

                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <Button
                  type="button"
                  disabled={loading}
                  onClick={handleLogin}
                  className="h-12 w-full rounded-xl bg-indigo-600 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-100" />
                <span className="text-xs text-slate-400">OR</span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <p className="text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="cursor-pointer font-semibold text-indigo-600 transition-colors hover:text-cyan-600"
                >
                  Create one
                </span>
              </p>
            </Card>

            <p className="mt-6 text-center text-xs text-slate-400">
              AI-powered interview preparation platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}