"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to register");
      }

      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      router.push("/tasks");
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-10 md:p-12 shadow-xl rounded-2xl w-full max-w-md sm:max-w-lg border-2 border-orange-400"
      >
        <h1 className="text-4xl font-semibold mb-6 text-center text-orange-600">
          Welcome!
        </h1>
        <h2 className="text-xl font-semibold mb-6 text-center">
          Create your account
        </h2>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg"
          required
        />

        <div className="flex flex-col items-center space-y-4">
          <button
            type="submit"
            className="px-6 py-3 rounded-full w-full bg-orange-600 text-white font-semibold hover:bg-orange-700 transition duration-300"
          >
            Register
          </button>

          <Link
            href="/"
            className="px-6 py-3 rounded-full w-full text-center border border-gray-300 hover:bg-gray-100 transition duration-300"
          >
            Go Back
          </Link>
        </div>
      </form>
    </div>
  );
}
