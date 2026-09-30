import {
  Eye,
  EyeOff,
  UserPlus,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import API_BASE_URL from "../services/api";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  /*
   * Email validation
   *
   * Examples:
   * varsha@gmail.com          ✅
   * varsha.dasari@gmail.com  ✅
   * varsha@                  ❌
   * varsha@gmail             ❌
   * varsha.com               ❌
   */
  const isValidEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
  };

  /*
   * Indian mobile validation
   *
   * Exactly 10 digits
   * First digit must be 6, 7, 8 or 9
   */
  const isValidIndianMobile = (phone) => {
    const phoneRegex = /^[6-9][0-9]{9}$/;

    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};

    // Full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!isValidEmail(formData.email.trim())) {
      newErrors.email =
        "Please enter a valid email address, for example: name@gmail.com";
    }

    // Mobile
    if (!formData.phone) {
      newErrors.phone = "Please enter your mobile number.";
    } else if (!isValidIndianMobile(formData.phone)) {
      newErrors.phone =
        "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Please create a password.";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters.";
    }

    // Confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Mobile number:
    // Allow ONLY numbers
    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, "");

      // Maximum 10 digits
      if (onlyNumbers.length <= 10) {
        setFormData((previous) => ({
          ...previous,
          phone: onlyNumbers,
        }));

        // Remove phone error while typing
        setErrors((previous) => ({
          ...previous,
          phone: "",
        }));
      }

      return;
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Clear field error when user starts correcting it
    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    // Live password matching
    if (name === "password") {
      if (
        formData.confirmPassword &&
        value !== formData.confirmPassword
      ) {
        setErrors((previous) => ({
          ...previous,
          confirmPassword: "Passwords do not match.",
        }));
      } else {
        setErrors((previous) => ({
          ...previous,
          confirmPassword: "",
        }));
      }
    }

    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setErrors((previous) => ({
          ...previous,
          confirmPassword: "Passwords do not match.",
        }));
      } else {
        setErrors((previous) => ({
          ...previous,
          confirmPassword: "",
        }));
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.fullName.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors((previous) => ({
          ...previous,
          email: data.message || "Registration failed.",
        }));

        return;
      }

      alert("Registration successful! 🎉");

      console.log("Registered user:", data.user);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      setErrors({});
    } catch (error) {
      console.error("Registration error:", error);

      alert(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f7ff]">

      {/* ================= TOP LOGO ================= */}
      <div className="mx-auto flex max-w-7xl items-center px-5 py-5 lg:px-8">

        <a href="/" className="flex items-center gap-2">

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
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85"
                alt="Beautiful decoration"
                className="h-[500px] w-full rounded-[22px] object-cover"
              />

            </div>

            <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-white/70 bg-white/95 p-5 shadow-xl backdrop-blur">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <Sparkles size={22} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    Beautiful Decorations
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Birthday • Weddings • Anniversaries
                    <br />
                    Festivals • And More
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================= REGISTER FORM ================= */}
        <div className="mx-auto w-full max-w-md">

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
              <UserPlus size={22} />
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#171536] sm:text-4xl">
              Create Your Account
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Join DecorAI and start creating beautiful decorations
              with AI.
            </p>

          </div>


          {/* Form */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >

              {/* ================= FULL NAME ================= */}
              <div>

                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-4 focus:ring-violet-100 ${errors.fullName
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-violet-500"
                    }`}
                />

                {errors.fullName && (
                  <ErrorMessage message={errors.fullName} />
                )}

              </div>


              {/* ================= EMAIL ================= */}
              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
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


              {/* ================= MOBILE ================= */}
              <div>

                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Mobile Number
                </label>

                <div className="flex">

                  <div className="flex h-12 items-center rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-600">
                    +91
                  </div>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    autoComplete="tel"
                    className={`h-12 w-full rounded-r-xl border bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-4 focus:ring-violet-100 ${errors.phone
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-violet-500"
                      }`}
                  />

                </div>

                <p className="mt-1.5 text-xs text-gray-400">
                  Enter 10 digits starting with 6, 7, 8 or 9.
                </p>

                {errors.phone && (
                  <ErrorMessage message={errors.phone} />
                )}

              </div>


              {/* ================= PASSWORD ================= */}
              <div>

                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <div className="relative">

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword ? "text" : "password"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    autoComplete="new-password"
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

                <p className="mt-1.5 text-xs text-gray-400">
                  Minimum 8 characters.
                </p>

                {errors.password && (
                  <ErrorMessage message={errors.password} />
                )}

              </div>


              {/* ================= CONFIRM PASSWORD ================= */}
              <div>

                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Confirm Password
                </label>

                <div className="relative">

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className={`h-12 w-full rounded-xl border bg-white px-4 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-4 focus:ring-violet-100 ${errors.confirmPassword
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-violet-500"
                      }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-violet-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

                {errors.confirmPassword && (
                  <ErrorMessage
                    message={errors.confirmPassword}
                  />
                )}

                {/* Password match indicator */}
                {formData.confirmPassword &&
                  formData.password ===
                  formData.confirmPassword && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-green-600">
                      <CheckCircle2 size={14} />
                      Passwords match
                    </div>
                  )}

              </div>


              {/* ================= TERMS ================= */}
              <label className="flex cursor-pointer items-start gap-3">

                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />

                <span className="text-xs leading-5 text-gray-500">
                  I agree to the{" "}
                  <a
                    href="#terms"
                    className="font-semibold text-violet-600 hover:underline"
                  >
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="#privacy"
                    className="font-semibold text-violet-600 hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </span>

              </label>


              {/* ================= SUBMIT ================= */}
              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 text-sm font-bold text-white shadow-lg shadow-violet-100 transition hover:bg-violet-700"
              >
                Create Account
                <ArrowRightIcon />
              </button>

            </form>


            {/* Login */}
            <p className="mt-6 text-center text-sm text-gray-500">

              Already have an account?{" "}

              <a
                href="/login"
                className="font-bold text-violet-600 hover:text-violet-700"
              >
                Login
              </a>

            </p>

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

export default Register;