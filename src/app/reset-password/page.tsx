"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError("Passwörter stimmen nicht überein"); return; }
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("https://app.sbsdeutschland.com/api/nexus/auth/reset-password-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: password })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 3000);
      } else {
        setError(data.detail || "Fehler");
      }
    } catch {
      setError("Verbindungsfehler");
    }
    setLoading(false);
  };

  if (!token) {
    return (
      <div className="text-center">
        <span className="text-5xl">❌</span>
        <h2 className="text-xl font-bold text-gray-900 mt-4">Ungültiger Link</h2>
        <p className="text-gray-600 mt-2">Dieser Link ist ungültig oder abgelaufen.</p>
        <Link href="/forgot-password" className="inline-block mt-6 text-blue-600 hover:underline">Neuen Link anfordern</Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center">
        <span className="text-5xl">✅</span>
        <h2 className="text-xl font-bold text-gray-900 mt-4">Passwort geändert!</h2>
        <p className="text-gray-600 mt-2">Sie werden zum Login weitergeleitet...</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Neues Passwort setzen</h2>
      {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Neues Passwort</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Min. 6 Zeichen" required minLength={6} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Passwort bestätigen</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Passwort wiederholen" required minLength={6} />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50">
          {loading ? "Wird gespeichert..." : "Passwort ändern"}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">🏢 SBS Nexus</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Suspense fallback={<div className="text-center">Laden...</div>}>
            <ResetForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
