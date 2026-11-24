"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyForm() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [name, setName] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) return;
    
    fetch(`https://app.sbsdeutschland.com/api/nexus/auth/verify-email?token=${token}`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) { setStatus("success"); setName(data.name); }
        else setStatus("error");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  if (token && status === "loading") {
    return <div className="text-center"><p className="text-gray-600">Wird verifiziert...</p></div>;
  }

  if (!token || status === "error") {
    return (
      <div className="text-center">
        <span className="text-5xl">❌</span>
        <h2 className="text-xl font-bold text-gray-900 mt-4">Ungültiger Link</h2>
        <p className="text-gray-600 mt-2">Dieser Verifizierungslink ist ungültig oder abgelaufen.</p>
        <Link href="/login" className="inline-block mt-6 text-blue-600 hover:underline">Zum Login</Link>
      </div>
    );
  }

  return (
    <div className="text-center">
      <span className="text-5xl">✅</span>
      <h2 className="text-xl font-bold text-gray-900 mt-4">E-Mail bestätigt!</h2>
      <p className="text-gray-600 mt-2">Willkommen {name}! Sie können sich jetzt anmelden.</p>
      <Link href="/login" className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">Jetzt anmelden</Link>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">🏢 SBS Nexus</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Suspense fallback={<div className="text-center">Laden...</div>}>
            <VerifyForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
