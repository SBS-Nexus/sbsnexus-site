"use client";

import { useState } from "react";
import Link from "next/link";

const API = "https://app.sbsdeutschland.com/api/erechnung";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(API + "/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Login fehlgeschlagen");
      }

      const data = await res.json();
      localStorage.setItem("sbs_token", data.tokens.access_token);
      localStorage.setItem("sbs_refresh", data.tokens.refresh_token);
      localStorage.setItem("sbs_user", JSON.stringify(data.user));
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Verbindungsfehler");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center font-bold text-slate-900 text-sm">SN</div>
            <span className="text-2xl font-bold text-white">SBS Nexus</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Willkommen zur\u00fcck</h1>
          <p className="text-slate-400 mt-2 text-sm">Melden Sie sich bei Ihrem Konto an</p>
        </div>

        <form onSubmit={handleLogin} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 sm:p-8 space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">E-Mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              placeholder="name@unternehmen.de"
              className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Passwort</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
              className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-semibold py-3 rounded-xl hover:from-amber-400 hover:to-amber-500 transition disabled:opacity-50 text-sm">
            {loading ? "Wird angemeldet..." : "Anmelden"}
          </button>

          <div className="text-center space-y-2">
            <a href="/forgot-password" className="text-sm text-slate-400 hover:text-amber-400 transition">Passwort vergessen?</a>
            <p className="text-sm text-slate-500">
              Noch kein Konto? <Link href="/register" className="text-amber-400 hover:text-amber-300 font-medium transition">Registrieren</Link>
            </p>
          </div>
        </form>

        <p className="text-center text-xs text-slate-600 mt-6">
          SBS Deutschland GmbH & Co. KG \u00b7 Enterprise KI-L\u00f6sungen
        </p>
      </div>
    </div>
  );
}
