"use client";

import { useState, useEffect, useRef } from "react";

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  link: string | null;
  is_read: boolean;
  created_at: string;
}

export default function NotificationBell({ userId, token }: { userId: number; token: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await fetch(`https://app.sbsdeutschland.com/api/nexus/notifications/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setNotifications(data.notifications || []);
      setUnreadCount(data.unread_count || 0);
    } catch {}
  };

  const markAsRead = async (id: number) => {
    await fetch(`https://app.sbsdeutschland.com/api/nexus/notifications/${id}/read`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });
    loadNotifications();
  };

  const markAllRead = async () => {
    await fetch(`https://app.sbsdeutschland.com/api/nexus/notifications/${userId}/read-all`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });
    loadNotifications();
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case "success": return "✅";
      case "warning": return "⚠️";
      case "error": return "❌";
      default: return "ℹ️";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 text-slate-300 hover:text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50">
          <div className="flex justify-between items-center px-4 py-3 border-b border-slate-700">
            <span className="text-white font-semibold">Benachrichtigungen</span>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs text-cyan-400 hover:text-cyan-300">
                Alle gelesen
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-6 text-center text-slate-400">
                Keine Benachrichtigungen
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => { markAsRead(n.id); if (n.link) window.location.href = n.link; }}
                  className={`px-4 py-3 border-b border-slate-700 cursor-pointer hover:bg-slate-700/50 ${!n.is_read ? "bg-slate-700/30" : ""}`}
                >
                  <div className="flex gap-3">
                    <span className="text-lg">{typeIcon(n.type)}</span>
                    <div className="flex-1">
                      <p className={`text-sm ${!n.is_read ? "text-white font-medium" : "text-slate-300"}`}>{n.title}</p>
                      {n.message && <p className="text-xs text-slate-400 mt-1">{n.message}</p>}
                      <p className="text-xs text-slate-500 mt-1">{n.created_at?.split(" ")[0]}</p>
                    </div>
                    {!n.is_read && <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></span>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
