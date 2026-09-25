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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 via-white to-indigo-50 px-6">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">

        {/* Left Section */}
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold leading-tight text-[#282072]">
            AI-Powered <br />
            Interview Preparation <br />
            Your Personal Career Coach
          </h1>

          <p className="text-gray-600 text-lg">
            Get AI-generated interview questions, skill gaps, and personalized
            roadmap to crack your dream job.
          </p>

          <div className="w-40 h-40 bg-indigo-100 rounded-full flex items-center justify-center">
            🤖
          </div>
        </div>

        {/* Right Section */}
        <Card className="p-8 shadow-2xl rounded-2xl">
          <h2 className="text-2xl font-bold text-[#282072] mb-6">
            Welcome Back
          </h2>

          <div className="space-y-4">

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Login Button */}
            <Button
              type="button"
              disabled={loading}
              className="w-full bg-[#282072] hover:bg-[#1f1a5c]"
              onClick={handleLogin}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            {/* Register */}
            <p className="text-sm text-center text-gray-500">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-[#03B3C5] cursor-pointer font-medium"
              >
                Register
              </span>
            </p>

          </div>
        </Card>
      </div>
    </div>
  );
}