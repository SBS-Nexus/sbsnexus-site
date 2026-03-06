"use client";

import { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  AreaChart, Area, CartesianGrid,
} from "recharts";

const API = "https://app.sbsdeutschland.com/api/erechnung";

const LABELS: Record<string, string> = {
  uploaded:"Hochgeladen", classified:"Klassifiziert", validated:"Validiert",
  suggested:"KI-Vorschlag", approved:"Freigegeben", exported:"Exportiert",
  archived:"Archiviert", rejected:"Abgelehnt", error:"Fehler",
};

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState(90);
  const [tid, setTid] = useState("test-ai-live");

  useEffect(() => {
    try { const u = localStorage.getItem("sbs_user"); if (u) setTid("tenant-"+JSON.parse(u).id); } catch {}
  }, []);

  useEffect(() => { load(); }, [period, tid]);

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch(API+"/analytics/dashboard?days="+period, {headers:{"X-Tenant-ID":tid}});
      if (r.ok) setData(await r.json());
    } catch {} finally { setLoading(false); }
  };

  const fmtW = (w: string) => { const d = new Date(w); return d.getDate()+"."+(d.getMonth()+1); };

  if (loading) return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay:"0ms"}}/>
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay:"150ms"}}/>
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay:"300ms"}}/>
      </div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <button onClick={load} className="px-4 py-2 bg-cyan-600 rounded-lg text-sm">Erneut laden</button>
    </div>
  );

  const {kpis: k, status_distribution: sd, timeline: tl, kontierung_performance: kp, recent_activity: ra, processing_speed: ps} = data;
  const conf = [
    {name:"Hoch (>85%)", value:kp.confidence_distribution.high, color:"#10b981"},
    {name:"Mittel (70-85%)", value:kp.confidence_distribution.medium, color:"#f59e0b"},
    {name:"Niedrig (<70%)", value:kp.confidence_distribution.low, color:"#ef4444"},
  ].filter((d: any) => d.value > 0);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/dashboard" className="text-slate-400 hover:text-white transition">\u2190 Dashboard</a>
            <div className="h-6 w-px bg-slate-700"/>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-lg">\ud83d\udcca</div>
              <div><h1 className="text-lg font-semibold">Analytics</h1><p className="text-xs text-slate-400">Rechnungseingang</p></div>
            </div>
          </div>
          <div className="flex gap-2">
            {[30,90,180].map(d => (
              <button key={d} onClick={() => setPeriod(d)}
                className={"px-3 py-1.5 rounded-lg text-xs font-medium transition "+(period===d?"bg-cyan-600 text-white":"bg-slate-800 text-slate-400 border border-slate-700")}>
                {d}T
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            {l:"Gesamt",v:k.total_invoices,i:"\ud83d\udcc4"},
            {l:period+"T Zeitraum",v:k.period_invoices,i:"\ud83d\udcc5"},
            {l:"Offen",v:k.pending_review,i:"\u23f3",a:k.pending_review>0},
            {l:"Freigegeben",v:k.approved,i:"\u2705"},
            {l:"Exportiert",v:k.exported,i:"\ud83d\udce4"},
            {l:"Quote",v:k.completion_rate+"%",i:"\ud83d\udcc8"},
            {l:"Speed",v:ps.formatted,i:"\u26a1"},
          ].map((x,i) => (
            <div key={i} className={"rounded-xl p-4 border "+(x.a?"bg-amber-500/5 border-amber-500/20":"bg-slate-800/50 border-slate-700/50")}>
              <span className="text-lg">{x.i}</span>
              <div className="text-2xl font-bold mt-1">{x.v}</div>
              <div className="text-xs text-slate-400 mt-1">{x.l}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Rechnungseingang pro Woche</h3>
            {tl.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={tl}>
                  <defs><linearGradient id="cC" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/><stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
                  <XAxis dataKey="week" tickFormatter={fmtW} stroke="#64748b" tick={{fontSize:11}}/>
                  <YAxis stroke="#64748b" tick={{fontSize:11}} allowDecimals={false}/>
                  <Tooltip contentStyle={{background:"#1e293b",border:"1px solid #334155",borderRadius:8,fontSize:12}}/>
                  <Area type="monotone" dataKey="count" stroke="#06b6d4" fill="url(#cC)" strokeWidth={2} name="Rechnungen"/>
                </AreaChart>
              </ResponsiveContainer>
            ) : <div className="h-[260px] flex items-center justify-center text-slate-500 text-sm">Keine Daten</div>}
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Status-Verteilung</h3>
            {sd.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart><Pie data={sd} dataKey="count" nameKey="status" cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3}
                  label={({status,count}: any) => (LABELS[status]||status)+" ("+count+")"}>
                  {sd.map((e: any,i: number) => <Cell key={i} fill={e.color}/>)}
                </Pie><Tooltip contentStyle={{background:"#1e293b",border:"1px solid #334155",borderRadius:8,fontSize:12}}/></PieChart>
              </ResponsiveContainer>
            ) : <div className="h-[260px] flex items-center justify-center text-slate-500 text-sm">Keine Daten</div>}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-slate-300 mb-1">KI-Kontierung</h3>
            <p className="text-xs text-slate-500 mb-4">{kp.total} Kontierungen | Confidence: {(kp.avg_confidence*100).toFixed(0)}%</p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {Object.entries(kp.models).map(([m,c]: any) => (
                <div key={m} className="bg-slate-700/30 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold">{c}</div><div className="text-xs text-slate-400 truncate">{m}</div>
                </div>
              ))}
            </div>
            {conf.length > 0 && (
              <ResponsiveContainer width="100%" height={180}>
                <PieChart><Pie data={conf} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>
                  {conf.map((e: any,i: number) => <Cell key={i} fill={e.color}/>)}
                </Pie><Legend verticalAlign="bottom" iconSize={8}/><Tooltip contentStyle={{background:"#1e293b",border:"1px solid #334155",borderRadius:8,fontSize:12}}/></PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Top Sachkonten (SKR03)</h3>
            {kp.top_konten.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={kp.top_konten} layout="vertical" margin={{left:20}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false}/>
                  <XAxis type="number" stroke="#64748b" tick={{fontSize:11}} allowDecimals={false}/>
                  <YAxis type="category" dataKey="konto" stroke="#64748b" tick={{fontSize:12}} width={60}/>
                  <Tooltip contentStyle={{background:"#1e293b",border:"1px solid #334155",borderRadius:8,fontSize:12}}/>
                  <Bar dataKey="count" fill="#8b5cf6" radius={[0,4,4,0]} barSize={20}/>
                </BarChart>
              </ResponsiveContainer>
            ) : <div className="h-[240px] flex items-center justify-center text-slate-500 text-sm">Keine Daten</div>}
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Letzte Aktivit\u00e4ten</h3>
          <div className="space-y-2">
            {ra.map((a: any,i: number) => (
              <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-700/30 transition">
                <span className="text-sm font-mono">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-200 truncate">{a.file_name||a.document_id}</span>
                    {a.to && <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-400">\u2192 {LABELS[a.to]||a.to}</span>}
                  </div>
                  <div className="text-xs text-slate-500">{a.actor} | {a.timestamp?new Date(a.timestamp).toLocaleString("de-DE"):""}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
