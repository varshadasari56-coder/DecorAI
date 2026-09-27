import {
  Search,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-sm font-bold text-white">
            D
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            Decor<span className="text-violet-600">AI</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="/"
            className="text-sm font-medium text-gray-700 transition hover:text-violet-600"
          >
            Home
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-gray-700 transition hover:text-violet-600"
          >
            How It Works
          </a>

          <a
            href="#shop"
            className="text-sm font-medium text-gray-700 transition hover:text-violet-600"
          >
            Shop
          </a>

          <a
            href="#about"
            className="text-sm font-medium text-gray-700 transition hover:text-violet-600"
          >
            About
          </a>
        </nav>

        {/* Right Side */}
        <div className="hidden items-center gap-2 md:flex">

          <button
            className="rounded-lg p-2 text-gray-600 transition hover:bg-violet-50 hover:text-violet-600"
            aria-label="Search"
          >
            <Search size={19} />
          </button>

          <button
            className="relative rounded-lg p-2 text-gray-600 transition hover:bg-violet-50 hover:text-violet-600"
            aria-label="Cart"
          >
            <ShoppingCart size={19} />

            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[9px] font-bold text-white">
              0
            </span>
          </button>

          {user ? (
            <>
              <a
                href="/my-orders"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-violet-50 hover:text-violet-600"
              >
                My Orders
              </a>

              <span className="px-3 text-sm font-semibold text-gray-700">
                Hi, {user.fullName.split(" ")[0]} 👋
              </span>

              <button
                onClick={handleLogout}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Login
              </a>

              <a
                href="/register"
                className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                Sign Up
              </a>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-gray-700 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-5 md:hidden">
          <nav className="flex flex-col gap-4">

            <a href="/" className="text-sm font-medium text-gray-700">
              Home
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-gray-700"
            >
              How It Works
            </a>

            <a
              href="#shop"
              className="text-sm font-medium text-gray-700"
            >
              Shop
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-gray-700"
            >
              About
            </a>

            {user && (
              <a
                href="/my-orders"
                className="text-sm font-medium text-gray-700"
              >
                My Orders
              </a>
            )}

            <div className="flex gap-3 border-t border-gray-100 pt-4">
              <a
                href="/login"
                className="flex-1 rounded-lg border border-gray-200 py-2.5 text-center text-sm font-semibold text-gray-700"
              >
                Login
              </a>

              <a
                href="/register"
                className="flex-1 rounded-lg bg-violet-600 py-2.5 text-center text-sm font-semibold text-white"
              >
                Sign Up
              </a>
            </div>

          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;