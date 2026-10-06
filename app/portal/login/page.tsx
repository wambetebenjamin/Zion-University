"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { GraduationCap, Lock, User, AlertTriangle, ArrowRight, Check } from "lucide-react";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/portal";

  const [identifier, setIdentifier] = useState("student@zion.ac.ke");
  const [password, setPassword] = useState("student2026");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        identifier,
        password,
        callbackUrl,
      });

      if (res?.error) {
        setErrorMsg("Invalid Student ID or password. Please try again.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg("Authentication service error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (id: string) => {
    setIdentifier(id);
    setPassword("password123");
  };

  return (
    <div className="w-full max-w-md bg-[#18233a] border border-white/10 p-8 shadow-2xl relative">
      {/* Crest */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-14 h-14 rounded-full bg-[#162239] border border-[#f5a425] flex items-center justify-center shadow-lg mb-3">
          <GraduationCap className="w-8 h-8 text-[#f5a425]" />
        </div>
        <h1 className="text-2xl font-black uppercase text-white">
          <span className="text-[#f5a425] italic">Zion</span> Student Portal
        </h1>
        <p className="text-xs text-white/60 mt-1 uppercase tracking-wider font-semibold">
          Single Sign-On Authentication
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-3 bg-red-950/80 border border-red-500 text-xs text-red-200 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1">
            Student ID / University Email
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="ZU/2026/0491 or student@zion.ac.ke"
              className="w-full pl-10 pr-3.5 py-2.5 text-xs text-white"
            />
            <User className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-3.5 py-2.5 text-xs text-white"
            />
            <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-zion w-full justify-center text-xs font-bold uppercase tracking-wider py-3.5 shadow-gold mt-2"
        >
          {loading ? "Authenticating..." : "Sign In to Portal"}
        </button>
      </form>

      {/* Demo Fast Login Helper */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#f5a425] mb-2 text-center">
          Demo Student Test Accounts:
        </div>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => handleFillDemo("student@zion.ac.ke")}
            className="w-full text-left p-2.5 bg-white/5 border border-white/10 hover:border-[#f5a425] text-xs text-white/80 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="font-bold text-white">Amina Sharon Mwangi</div>
              <div className="text-[10px] text-white/60">B.Sc. Computer Science & AI (Year 2)</div>
            </div>
            <span className="text-[10px] uppercase font-bold text-[#f5a425]">Use Account</span>
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-white/60">
        <span>New student without portal credentials? </span>
        <Link href="/apply" className="text-[#f5a425] font-bold underline">
          Apply Online First
        </Link>
      </div>
    </div>
  );
}

export default function StudentLoginPage() {
  return (
    <div className="pt-28 pb-20 bg-[#0c1228] min-h-screen flex items-center justify-center px-4">
      <Suspense fallback={
        <div className="text-center text-xs uppercase tracking-widest text-white/60">
          Loading Portal Login...
        </div>
      }>
        <LoginFormContent />
      </Suspense>
    </div>
  );
}
