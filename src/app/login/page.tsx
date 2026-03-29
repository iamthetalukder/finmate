"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7FA]">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-sm shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-[#6C63FF]">FinMate</h1>
          <p className="text-sm text-gray-500 mt-1">
            Your AI financial advisor
          </p>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 transition mb-3"
        >
          Sign in with Google
        </button>

        <button
          onClick={() => signIn("email", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-3 bg-[#6C63FF] text-white rounded-xl py-3 text-sm font-medium hover:opacity-90 transition"
        >
          Sign in with Email
        </button>

        <p className="text-center text-xs text-gray-400 mt-6">
          Free forever · No credit card needed
        </p>
      </div>
    </div>
  );
}
