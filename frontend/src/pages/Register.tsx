import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useAuthStore } from "../store/authStore";

type FormState = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);

  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.password
    ) {
      return "All fields are required";
    }

    if (form.password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (form.password !== form.confirmPassword) {
      return "Passwords do not match";
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const success = await register({
        username: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      if (success) {
        navigate("/login");
      } else {
        setError("Registration failed");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "h-12 rounded-xl border-slate-200 bg-slate-50/50 px-4 shadow-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left Hero */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-cyan-600 lg:flex">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

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
                Start your preparation
              </div>

              <h1 className="text-5xl font-extrabold leading-tight text-white xl:text-6xl">
                Your next
                <br />
                <span className="text-cyan-200">
                  opportunity starts here.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-indigo-100">
                Build confidence with AI-generated questions, personalized
                skill-gap analysis and a preparation roadmap designed around
                your target role.
              </p>

              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 font-bold text-white">
                    01
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      Analyze your profile
                    </p>

                    <p className="text-sm text-indigo-100">
                      Resume and role-based analysis
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 font-bold text-white">
                    02
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      Practice smarter
                    </p>

                    <p className="text-sm text-indigo-100">
                      Personalized technical and behavioral questions
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 font-bold text-white">
                    03
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      Follow your roadmap
                    </p>

                    <p className="text-sm text-indigo-100">
                      Know exactly what to improve
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-indigo-200">
              Your personal AI interview coach.
            </p>
          </div>
        </div>

        {/* Right Register */}
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
                GET STARTED
              </p>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Start building a personalized interview preparation plan.
              </p>
            </div>

            <Card className="rounded-3xl border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-8">
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Full Name */}
                <div>
                  <Label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full name
                  </Label>

                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={form.fullName}
                    onChange={handleChange}
                    disabled={loading}
                    className={inputClass}
                  />
                </div>

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
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    disabled={loading}
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
                    name="password"
                    type="password"
                    placeholder="Create password"
                    value={form.password}
                    onChange={handleChange}
                    disabled={loading}
                    className={inputClass}
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    Must be at least 6 characters.
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <Label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Confirm password
                  </Label>

                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    className={inputClass}
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                    {error}
                  </div>
                )}

                {/* Register */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full rounded-xl bg-indigo-600 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Creating account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-100" />
                <span className="text-xs text-slate-400">OR</span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <p className="text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-indigo-600 transition-colors hover:text-cyan-600"
                >
                  Sign in
                </Link>
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