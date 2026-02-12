"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewMaintenancePage() {
  const [image, setImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [location, setLocation] = useState("");
  const [machineId, setMachineId] = useState("");
  const [urgency, setUrgency] = useState("normal");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError("Datei zu groß (max. 10 MB)");
      return;
    }

    setPreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(",")[1];
      setImage(base64);
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!image) { setError("Bitte ein Foto aufnehmen"); return; }
    if (!location) { setError("Bitte Standort angeben"); return; }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("https://app.sbsdeutschland.com/api/nexus/maintenance/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "sbs_nexus_secret_2026",
        },
        body: JSON.stringify({
          image_base64: image,
          technician_notes: notes,
          location: location,
          machine_id: machineId || undefined,
          urgency: urgency,
        }),
      });

      if (!res.ok) throw new Error(`Fehler: ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Verbindungsfehler");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setImage(null);
    setPreview(null);
    setNotes("");
    setLocation("");
    setMachineId("");
    setUrgency("normal");
    setResult(null);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (result) {
    const rec = result.recommendation;
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <header className="bg-slate-900 border-b border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <Link href="/maintenance" className="text-slate-400 hover:text-white">← Zurück</Link>
            <h1 className="font-bold text-amber-400">Ergebnis</h1>
            <div className="w-16" />
          </div>
        </header>

        <main className="p-4 space-y-4 max-w-lg mx-auto">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center">
            <span className="text-3xl">✅</span>
            <p className="font-bold text-emerald-400 mt-2">Analyse abgeschlossen</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Teil</span>
              <span className="font-semibold">{rec?.part_recognition?.part_name || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Hersteller</span>
              <span>{rec?.part_recognition?.manufacturer || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Confidence</span>
              <span className="text-amber-400">{rec?.part_recognition?.confidence ? `${rec.part_recognition.confidence}%` : "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Aktion</span>
              <span className={rec?.action === "reorder" ? "text-emerald-400" : "text-orange-400"}>
                {rec?.action === "reorder" ? "📦 Nachbestellen" : "🔍 Neuer Lieferant"}
              </span>
            </div>
          </div>

          {rec?.steps && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <p className="font-semibold text-amber-400 mb-2">Empfohlene Schritte</p>
              {rec.steps.map((step: string, i: number) => (
                <p key={i} className="text-slate-300 text-sm py-1 border-b border-slate-800 last:border-0">{step}</p>
              ))}
            </div>
          )}

          {rec?.summary && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
              <p className="text-amber-300 text-sm">{rec.summary}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button onClick={resetForm} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-semibold">
              Neuer Alert
            </button>
            <Link href="/maintenance" className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold text-center">
              Dashboard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="bg-slate-900 border-b border-slate-800 p-4">
        <div className="flex items-center justify-between">
          <Link href="/maintenance" className="text-slate-400 hover:text-white text-sm">← Dashboard</Link>
          <h1 className="font-bold text-amber-400">Smart Maintenance</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="p-4 space-y-4 max-w-lg mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
          {preview ? (
            <div className="relative">
              <img src={preview} alt="Preview" className="w-full max-h-64 object-contain rounded-lg" />
              <button onClick={() => { setPreview(null); setImage(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">✕</button>
            </div>
          ) : (
            <label className="cursor-pointer block py-12">
              <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={handleImageChange} className="hidden" />
              <span className="text-5xl block mb-3">📸</span>
              <p className="text-slate-400">Foto aufnehmen oder hochladen</p>
              <p className="text-slate-600 text-xs mt-1">Max. 10 MB · JPG, PNG</p>
            </label>
          )}
        </div>

        <div className="space-y-3">
          <input
            type="text" placeholder="📍 Standort / Halle *" value={location} onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
          />
          <input
            type="text" placeholder="🔧 Maschinen-ID (optional)" value={machineId} onChange={(e) => setMachineId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
          />
          <textarea
            placeholder="📝 Notizen (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none resize-none"
          />

          <div className="flex gap-2">
            {["low", "normal", "high", "critical"].map((u) => (
              <button key={u} onClick={() => setUrgency(u)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  urgency === u
                    ? u === "critical" ? "bg-red-500/20 border-red-500 text-red-400"
                    : u === "high" ? "bg-orange-500/20 border-orange-500 text-orange-400"
                    : u === "normal" ? "bg-blue-500/20 border-blue-500 text-blue-400"
                    : "bg-slate-500/20 border-slate-500 text-slate-400"
                    : "bg-slate-900 border-slate-700 text-slate-500"
                }`}>
                {u === "critical" ? "🔴 Kritisch" : u === "high" ? "🟠 Hoch" : u === "normal" ? "🔵 Normal" : "⚪ Niedrig"}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm text-center">{error}</div>
        )}

        <button onClick={handleSubmit} disabled={loading || !image}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            loading || !image
              ? "bg-slate-700 text-slate-400"
              : "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span> Analysiere...
            </span>
          ) : (
            "🚀 Alert senden"
          )}
        </button>

        <p className="text-center text-slate-500 text-xs">
          KI analysiert das Bild und erstellt automatisch Handlungsempfehlungen
        </p>
      </main>
    </div>
  );
}
