"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("https://app.sbsdeutschland.com/api/nexus/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success) setSent(true);
      else setError(data.detail || "Fehler");
    } catch {
      setError("Verbindungsfehler");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">🏢 SBS Nexus</h1>
          <p className="text-slate-400 mt-2">Passwort zurücksetzen</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {sent ? (
            <div className="text-center">
              <span className="text-5xl">📧</span>
              <h2 className="text-xl font-bold text-gray-900 mt-4">E-Mail gesendet!</h2>
              <p className="text-gray-600 mt-2">Falls ein Konto mit dieser E-Mail existiert, haben wir einen Link zum Zurücksetzen gesendet.</p>
              <Link href="/login" className="inline-block mt-6 text-blue-600 hover:underline">← Zurück zum Login</Link>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Passwort vergessen?</h2>
              <p className="text-gray-600 mb-6">Geben Sie Ihre E-Mail ein und wir senden Ihnen einen Link.</p>
              {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="ihre@email.de" required />
                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50">
                  {loading ? "Wird gesendet..." : "Link senden"}
                </button>
              </form>
              <p className="mt-6 text-center text-sm text-gray-600">
                <Link href="/login" className="text-blue-600 hover:underline">← Zurück zum Login</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
