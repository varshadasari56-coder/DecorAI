import {
  Eye,
  EyeOff,
  LogIn,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const isValidEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!isValidEmail(formData.email.trim())) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Please enter your password.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors((previous) => ({
          ...previous,
          email: data.message || "Login failed.",
        }));

        return;
      }

      // Save login token
      localStorage.setItem("token", data.token);

      // Save logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert("Login successful! 🎉");

      console.log("Logged-in user:", data.user);

      navigate("/");

    } catch (error) {
      console.error("Login error:", error);

      alert(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f7ff]">

      {/* ================= TOP LOGO ================= */}

      <div className="mx-auto flex max-w-7xl items-center px-5 py-5 lg:px-8">

        <a
          href="/"
          className="flex items-center gap-2"
        >

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-sm font-bold text-white">
            D
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            Decor<span className="text-violet-600">AI</span>
          </span>

        </a>

      </div>


      {/* ================= MAIN ================= */}

      <div className="mx-auto grid min-h-[calc(100vh-88px)] max-w-6xl items-center gap-10 px-5 py-8 lg:grid-cols-2 lg:px-8">

        {/* ================= LEFT IMAGE ================= */}

        <div className="hidden lg:block">

          <div className="relative mx-auto max-w-md">

            <div className="overflow-hidden rounded-[28px] bg-white p-3 shadow-xl shadow-violet-100">

              <img
                src="https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=85"
                alt="Beautiful decoration setup"
                className="h-[500px] w-full rounded-[22px] object-cover"
              />

            </div>


            {/* Floating card */}

            <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-white/70 bg-white/95 p-5 shadow-xl backdrop-blur">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <Sparkles size={22} />
                </div>

                <div>

                  <h3 className="text-sm font-bold text-gray-900">
                    Your Decorations,
                    <br />
                    Your Way
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    AI-powered ideas made for you
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================= LOGIN FORM ================= */}

        <div className="mx-auto w-full max-w-md">

          {/* Back */}

          <a
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-violet-600"
          >
            <ArrowLeft size={16} />
            Back to Home
          </a>


          {/* Heading */}

          <div className="mb-8">

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <LogIn size={22} />
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#171536] sm:text-4xl">
              Welcome Back!
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Sign in to continue creating beautiful
              decorations with DecorAI.
            </p>

          </div>


          {/* Form Card */}

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >

              {/* ================= EMAIL ================= */}

              <div>

                <label
                  htmlFor="loginEmail"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>

                <input
                  id="loginEmail"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-4 focus:ring-violet-100 ${errors.email
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-violet-500"
                    }`}
                />

                {errors.email && (
                  <ErrorMessage message={errors.email} />
                )}

              </div>


              {/* ================= PASSWORD ================= */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="loginPassword"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>

                  <a
                    href="/forgot-password"
                    className="text-xs font-semibold text-violet-600 hover:text-violet-700"
                  >
                    Forgot password?
                  </a>

                </div>

                <div className="relative">

                  <input
                    id="loginPassword"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="off"
                    className={`h-12 w-full rounded-xl border bg-white px-4 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-4 focus:ring-violet-100 ${errors.password
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-violet-500"
                      }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-violet-600"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

                {errors.password && (
                  <ErrorMessage message={errors.password} />
                )}

              </div>


              {/* ================= REMEMBER ME ================= */}

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />

                <span className="text-sm text-gray-500">
                  Remember me
                </span>

              </label>


              {/* ================= LOGIN BUTTON ================= */}

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 text-sm font-bold text-white shadow-lg shadow-violet-100 transition hover:bg-violet-700"
              >
                Login
                <ArrowRightIcon />
              </button>

            </form>


            {/* ================= REGISTER ================= */}

            <p className="mt-6 text-center text-sm text-gray-500">

              Don't have an account?{" "}

              <a
                href="/register"
                className="font-bold text-violet-600 hover:text-violet-700"
              >
                Register
              </a>

            </p>

          </div>


          {/* Security message */}

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">

            <CheckCircle2 size={14} />

            Your account information is securely protected.

          </div>

        </div>

      </div>

    </main>
  );
}


/* =========================================================
   ERROR MESSAGE
========================================================= */

function ErrorMessage({ message }) {
  return (
    <p className="mt-1.5 text-xs font-medium text-red-500">
      {message}
    </p>
  );
}


/* =========================================================
   ARROW ICON
========================================================= */

function ArrowRightIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default Login;