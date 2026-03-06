"use client";

import { useState, useRef, useEffect } from "react";

const API_BASE = "https://app.sbsdeutschland.com/api/erechnung";

interface Message {
  role: "user" | "assistant";
  content: string;
  model?: string;
  sources?: { invoices_analyzed: number; events_analyzed: number; kontierungen_analyzed: number };
  suggestions?: string[];
}

export default function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Willkommen beim **SBS Finance Copilot**. Ich habe Zugriff auf Ihren Rechnungseingang, KI-Kontierungen und DATEV-Exporte. Wie kann ich helfen?",
      suggestions: [
        "Ueberblick ueber meinen Rechnungseingang",
        "Wie verteilen sich die KI-Kontierungen?",
        "Gibt es offene Freigaben?",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tenantId, setTenantId] = useState("test-ai-live");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sbs_user");
      if (stored) {
        const user = JSON.parse(stored);
        setTenantId("tenant-" + user.id);
      }
    } catch {}
  }, []);

  const sendMessage = async (text?: string) => {
    const question = text || input.trim();
    if (!question || loading) return;

    const userMsg: Message = { role: "user", content: question };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch(API_BASE + "/copilot/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Tenant-ID": tenantId,
        },
        body: JSON.stringify({ question, conversation_history: history }),
      });

      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();

      const assistantMsg: Message = {
        role: "assistant",
        content: data.answer,
        model: data.model,
        sources: data.sources,
        suggestions: data.suggested_questions,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Entschuldigung, es gab einen Fehler bei der Verbindung zum Finance Copilot.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-slate-700 rounded text-cyan-400 text-sm">$1</code>')
      .replace(/\n\*/g, "\n\u2022")
      .replace(/\n/g, "<br/>");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-lg sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/dashboard" className="text-slate-400 hover:text-white transition">
              \u2190 Dashboard
            </a>
            <div className="h-6 w-px bg-slate-700" />
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-lg">
                \ud83e\udd16
              </div>
              <div>
                <h1 className="text-lg font-semibold">Finance Copilot</h1>
                <p className="text-xs text-slate-400">KI-Finanzassistent</p>
              </div>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
            \u25cf Live
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-36">
        <div className="py-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={"flex " + (msg.role === "user" ? "justify-end" : "justify-start")}>
              <div className={"max-w-[85%] rounded-2xl px-5 py-4 " + (msg.role === "user"
                    ? "bg-cyan-600/20 border border-cyan-500/30 text-slate-200"
                    : "bg-slate-800/80 border border-slate-700/50 text-slate-300")}>
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-700/50">
                    <span className="text-xs text-slate-500 font-medium">Finance Copilot</span>
                    {msg.model && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-400">{msg.model}</span>
                    )}
                  </div>
                )}
                <div className="leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                {msg.sources && (
                  <div className="mt-3 pt-2 border-t border-slate-700/50 flex gap-3 flex-wrap">
                    <span className="text-xs text-slate-500">{msg.sources.invoices_analyzed} Rechnungen</span>
                    <span className="text-xs text-slate-500">{msg.sources.events_analyzed} Events</span>
                    <span className="text-xs text-slate-500">{msg.sources.kontierungen_analyzed} Kontierungen</span>
                  </div>
                )}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-slate-700/50 flex flex-col gap-2">
                    {msg.suggestions.map((s, j) => (
                      <button key={j} onClick={() => sendMessage(s)}
                        className="text-left text-xs text-cyan-400 hover:text-cyan-300 hover:bg-slate-700/50 px-3 py-2 rounded-lg transition">
                        \u2192 {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-xs text-slate-500 ml-2">analysiert Daten...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex gap-3 items-end">
            <textarea ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown} placeholder="Frage zu Rechnungen, Kontierungen, DATEV..."
              rows={1} className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 resize-none focus:outline-none focus:border-cyan-500 transition" />
            <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
              className="px-5 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-sm font-medium disabled:opacity-40 hover:from-cyan-500 hover:to-blue-500 transition">
              {loading ? "..." : "Senden"}
            </button>
          </div>
          <p className="text-center text-xs text-slate-600 mt-2">
            Antworten basieren auf Echtzeitdaten · Gemini 2.0 Flash + Claude Sonnet
          </p>
        </div>
      </div>
    </div>
  );
}
