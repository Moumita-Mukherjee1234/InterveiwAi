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
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.fullName || !form.email || !form.password) {
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
      await register({
        name: form.fullName,
        email: form.email,
        password: form.password,
      });
      navigate("/home");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 via-white to-indigo-50 px-6">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Hero Section */}
        <div className="hidden md:flex flex-col space-y-6">
          <h1 className="text-4xl font-extrabold leading-tight text-[#282072]">
            Start Your Journey <br />
            With AI Interview Coach
          </h1>

          <p className="text-gray-600 text-lg">
            Create your account and get personalized interview preparation,
            skill gap analysis, and resume generation.
          </p>

          <div className="w-48 h-48 bg-indigo-100 rounded-full flex items-center justify-center text-5xl shadow-inner">
            🚀
          </div>
        </div>

        {/* Register Card */}
        <Card className="p-8 shadow-2xl rounded-2xl w-full">
          <h2 className="text-2xl font-bold text-[#282072] mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                value={form.fullName}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Create password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#282072] hover:bg-[#1f1a5c] text-white"
            >
              {loading ? "Creating Account..." : "Register"}
            </Button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#03B3C5] font-medium">
              Login
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}