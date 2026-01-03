import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Camera, LogOut } from "lucide-react";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="bg-rose-500 text-white p-1.5 rounded-lg transform group-hover:rotate-12 transition-transform">
            <Camera size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Creative<span className="text-rose-500">Showcase</span>
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-rose-600 transition-colors"
              >
                <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center overflow-hidden border border-neutral-200">
                  <div className="font-bold text-rose-500">
                    {user.username ? user.username[0].toUpperCase() : "U"}
                  </div>
                </div>
                <span>Dashboard</span>
              </Link>

              <button
                onClick={onLogout}
                className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
                title="Log Out"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 px-3 py-2"
              >
                Log In
              </Link>

              <Link
                to="/signup"
                className="text-sm font-medium bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600 shadow-lg shadow-rose-200 transition-all active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
