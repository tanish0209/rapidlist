"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white bg-opacity-95 shadow-md border-b border-orange-500">
      <div className="flex justify-between items-center px-6 md:px-12 py-4">
        <div className="flex cursor-pointer">
          <h1 className="text-3xl font-bold text-black">RapidList</h1>
          <h1 className="text-3xl font-bold text-orange-700">.</h1>
        </div>

        {/* Desktop View Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {!session ? (
            <>
              <Link
                href="/login"
                className="text-gray-700 hover:text-orange-700 duration-300"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-6 py-2 rounded-xl bg-linear-to-r from-orange-500 to-orange-700 text-white hover:from-orange-600 hover:to-orange-800 transition duration-300"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <span className="font-light text-orange-600">
                Hello, {session.user?.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="px-5 py-2 rounded-xl bg-orange-600 text-white hover:bg-orange-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
        {/* Mobile Toggle Buttons */}
        <button
          className="md:hidden text-gray-700 focus:outline-none transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {/* Mobile View Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white bg-opacity-95 shadow-md flex flex-col items-center space-y-4 py-6 transition-all duration-600">
          {!session ? (
            <>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-orange-700 text-lg"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 rounded-full bg-linear-to-r from-orange-500 to-orange-700 text-white hover:from-orange-600 hover:to-orange-800 transition duration-300"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <span className="text-lg font-light text-orange-600">
                Hello, {session.user?.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="px-6 py-2 rounded-full bg-orange-600 text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
