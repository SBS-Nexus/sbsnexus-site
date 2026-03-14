"use client";

import { useState } from "react";
import Link from "next/link";

const API = "https://app.sbsdeutschland.com/api/erechnung";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", company: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) => setForm({ ...form, [field]: value });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 8) { setError("Passwort muss mindestens 8 Zeichen lang sein"); return; }
    setLoading(true);

    try {
      const res = await fetch(API + "/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Registrierung fehlgeschlagen");
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
          <h1 className="text-2xl font-bold text-white">Konto erstellen</h1>
          <p className="text-slate-400 mt-2 text-sm">Starten Sie mit der KI-Rechnungsverarbeitung</p>
        </div>

        <form onSubmit={handleRegister} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 sm:p-8 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Vollst\u00e4ndiger Name</label>
            <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} required
              placeholder="Max Mustermann"
              className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Firma</label>
            <input type="text" value={form.company} onChange={(e) => update("company", e.target.value)}
              placeholder="Muster GmbH (optional)"
              className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">E-Mail</label>
            <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required
              placeholder="name@unternehmen.de"
              className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Passwort</label>
            <input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} required
              placeholder="Mindestens 8 Zeichen"
              className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-semibold py-3 rounded-xl hover:from-amber-400 hover:to-amber-500 transition disabled:opacity-50 text-sm">
            {loading ? "Wird erstellt..." : "Kostenlos registrieren"}
          </button>

          <div className="text-center">
            <p className="text-sm text-slate-500">
              Bereits registriert? <Link href="/login" className="text-amber-400 hover:text-amber-300 font-medium transition">Anmelden</Link>
            </p>
          </div>

          <p className="text-xs text-slate-600 text-center">
            Mit der Registrierung akzeptieren Sie unsere <a href="/datenschutz" className="text-slate-500 hover:text-slate-400">Datenschutzerkl\u00e4rung</a> und <a href="/agb" className="text-slate-500 hover:text-slate-400">AGB</a>.
          </p>
        </form>
      </div>
    </div>
  );
}
