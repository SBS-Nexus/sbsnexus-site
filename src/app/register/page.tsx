"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<"verify" | "direct" | null>(null);
  const router = useRouter();

  const isCompanyEmail = (email: string) => {
    return email.endsWith("@sbsdeutschland.de") || email.endsWith("@sbsdeutschland.com");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("https://app.sbsdeutschland.com/api/nexus/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      
      if (data.success) {
        if (isCompanyEmail(email)) {
          setSuccess("direct");
          setTimeout(() => router.push("/login?registered=true"), 2000);
        } else {
          setSuccess("verify");
        }
      } else {
        setError(data.detail || "Registrierung fehlgeschlagen");
      }
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
          <p className="text-slate-400 mt-2">Enterprise AI Platform</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {success === "direct" ? (
            <div className="text-center">
              <span className="text-5xl">✅</span>
              <h2 className="text-xl font-bold text-gray-900 mt-4">Willkommen im Team!</h2>
              <p className="text-gray-600 mt-2">Ihr Admin-Konto wurde erstellt. Sie werden zum Login weitergeleitet...</p>
            </div>
          ) : success === "verify" ? (
            <div className="text-center">
              <span className="text-5xl">📧</span>
              <h2 className="text-xl font-bold text-gray-900 mt-4">Fast geschafft!</h2>
              <p className="text-gray-600 mt-2">Wir haben Ihnen eine E-Mail gesendet. Bitte klicken Sie auf den Link um Ihre Registrierung abzuschließen.</p>
              <p className="text-sm text-gray-400 mt-4">Keine E-Mail erhalten? Prüfen Sie Ihren Spam-Ordner.</p>
              <Link href="/login" className="inline-block mt-6 text-blue-600 hover:underline">Zurück zum Login</Link>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Registrieren</h2>
              
              {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>}
              
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Ihr Name" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="ihre@email.de" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Passwort</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Min. 6 Zeichen" required minLength={6} />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50">
                  {loading ? "Wird registriert..." : "Registrieren"}
                </button>
              </form>
              
              <p className="mt-6 text-center text-sm text-gray-600">
                Bereits ein Konto? <Link href="/login" className="text-blue-600 hover:underline">Anmelden</Link>
              </p>
            </>
          )}
        </div>
        
        <p className="mt-8 text-center text-sm text-slate-500">© 2026 SBS Deutschland GmbH</p>
      </div>
    </div>
  );
}
