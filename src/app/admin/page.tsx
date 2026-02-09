"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  created_at: string;
  last_login: string;
}

interface AdminStats {
  total_users: number;
  new_users_month: number;
  active_users: number;
  total_invoices: number;
  invoices_month: number;
  total_revenue: number;
  top_users: { name: string; email: string; invoices: number }[];
  recent_users: { name: string; email: string; created_at: string }[];
}

export default function AdminPage() {
  const [user, setUser] = useState<{id: number; name: string; is_admin: boolean} | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "users">("overview");
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editName, setEditName] = useState("");
  const [editAdmin, setEditAdmin] = useState(false);
  const [resetUser, setResetUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createAdmin, setCreateAdmin] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("sbs_user");
    if (!stored) { router.push("/login"); return; }
    const userData = JSON.parse(stored);
    if (!userData.is_admin) { router.push("/dashboard"); return; }
    setUser(userData);
    loadData();
  }, [router]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersRes, statsRes] = await Promise.all([
        fetch("https://app.sbsdeutschland.com/api/nexus/admin/users"),
        fetch("https://app.sbsdeutschland.com/api/nexus/admin/stats")
      ]);
      setUsers(await usersRes.json());
      setStats(await statsRes.json());
    } catch {}
    setLoading(false);
  };

  const showMsg = (msg: string) => { setMessage(msg); setTimeout(() => setMessage(""), 3000); };

  const handleEdit = async () => {
    if (!editUser) return;
    await fetch(`https://app.sbsdeutschland.com/api/nexus/admin/users/${editUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName, is_admin: editAdmin })
    });
    setEditUser(null);
    showMsg("User aktualisiert");
    loadData();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("User wirklich löschen?")) return;
    await fetch(`https://app.sbsdeutschland.com/api/nexus/admin/users/${id}`, { method: "DELETE" });
    showMsg("User gelöscht");
    loadData();
  };

  const handleResetPassword = async () => {
    if (!resetUser || !newPassword) return;
    await fetch("https://app.sbsdeutschland.com/api/nexus/admin/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: resetUser.id, new_password: newPassword })
    });
    setResetUser(null);
    setNewPassword("");
    showMsg("Passwort zurückgesetzt");
  };

  const handleCreate = async () => {
    await fetch("https://app.sbsdeutschland.com/api/nexus/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: createName, email: createEmail, password: createPassword, is_admin: createAdmin })
    });
    setShowCreate(false);
    setCreateName(""); setCreateEmail(""); setCreatePassword(""); setCreateAdmin(false);
    showMsg("User erstellt");
    loadData();
  };

  if (loading || !user) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center"><p className="text-white">Laden...</p></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏢</span>
            <span className="text-xl font-bold text-white">SBS Nexus</span>
            <span className="text-purple-400 text-sm ml-2">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="px-4 py-2 bg-slate-700 text-white rounded-lg text-sm hover:bg-slate-600">← Dashboard</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {message && <div className="mb-4 bg-emerald-500/20 text-emerald-400 px-4 py-3 rounded-lg">{message}</div>}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setActiveTab("overview")} className={`px-4 py-2 rounded-lg font-medium ${activeTab === "overview" ? "bg-purple-600 text-white" : "bg-slate-700 text-slate-300"}`}>📊 Übersicht</button>
          <button onClick={() => setActiveTab("users")} className={`px-4 py-2 rounded-lg font-medium ${activeTab === "users" ? "bg-purple-600 text-white" : "bg-slate-700 text-slate-300"}`}>👥 User verwalten</button>
        </div>

        {activeTab === "overview" && stats && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <p className="text-slate-400 text-sm">Gesamt User</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.total_users}</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <p className="text-slate-400 text-sm">Neu (Monat)</p>
                <p className="text-3xl font-bold text-emerald-400 mt-1">+{stats.new_users_month}</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <p className="text-slate-400 text-sm">Aktiv (7 Tage)</p>
                <p className="text-3xl font-bold text-cyan-400 mt-1">{stats.active_users}</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <p className="text-slate-400 text-sm">Rechnungen</p>
                <p className="text-3xl font-bold text-purple-400 mt-1">{stats.total_invoices}</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <p className="text-slate-400 text-sm">Diesen Monat</p>
                <p className="text-3xl font-bold text-orange-400 mt-1">{stats.invoices_month}</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <p className="text-slate-400 text-sm">Umsatz (Brutto)</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">{stats.total_revenue.toLocaleString("de-DE")}€</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Top Users */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">🏆 Top User nach Rechnungen</h3>
                <div className="space-y-3">
                  {stats.top_users.map((u, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <p className="text-white text-sm">{u.name}</p>
                        <p className="text-slate-500 text-xs">{u.email}</p>
                      </div>
                      <span className="text-cyan-400 font-semibold">{u.invoices}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Users */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">🆕 Neue Registrierungen</h3>
                <div className="space-y-3">
                  {stats.recent_users.map((u, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <p className="text-white text-sm">{u.name}</p>
                        <p className="text-slate-500 text-xs">{u.email}</p>
                      </div>
                      <span className="text-slate-400 text-xs">{u.created_at?.split(" ")[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "users" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">👥 User verwalten</h2>
              <button onClick={() => setShowCreate(true)} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">+ Neuer User</button>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="text-left px-4 py-3 text-slate-300 text-sm">ID</th>
                    <th className="text-left px-4 py-3 text-slate-300 text-sm">Name</th>
                    <th className="text-left px-4 py-3 text-slate-300 text-sm">E-Mail</th>
                    <th className="text-left px-4 py-3 text-slate-300 text-sm">Rolle</th>
                    <th className="text-left px-4 py-3 text-slate-300 text-sm">Letzter Login</th>
                    <th className="text-left px-4 py-3 text-slate-300 text-sm">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-t border-slate-700">
                      <td className="px-4 py-3 text-slate-400 text-sm">{u.id}</td>
                      <td className="px-4 py-3 text-white text-sm">{u.name}</td>
                      <td className="px-4 py-3 text-slate-300 text-sm">{u.email}</td>
                      <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded ${u.is_admin ? "bg-purple-500/20 text-purple-400" : "bg-slate-600 text-slate-300"}`}>{u.is_admin ? "Admin" : "User"}</span></td>
                      <td className="px-4 py-3 text-slate-400 text-sm">{u.last_login?.split("T")[0] || "-"}</td>
                      <td className="px-4 py-3 flex gap-2">
                        <button onClick={() => { setEditUser(u); setEditName(u.name); setEditAdmin(u.is_admin); }} className="text-xs bg-slate-600 hover:bg-slate-500 text-white px-2 py-1 rounded">Bearbeiten</button>
                        <button onClick={() => setResetUser(u)} className="text-xs bg-amber-600 hover:bg-amber-500 text-white px-2 py-1 rounded">Passwort</button>
                        {u.id !== user.id && <button onClick={() => handleDelete(u.id)} className="text-xs bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded">Löschen</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Edit Modal */}
        {editUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-white mb-4">User bearbeiten</h3>
              <div className="space-y-4">
                <div><label className="text-slate-400 text-sm">Name</label><input value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full mt-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" /></div>
                <div className="flex items-center gap-2"><input type="checkbox" checked={editAdmin} onChange={(e) => setEditAdmin(e.target.checked)} className="w-4 h-4" /><label className="text-slate-300">Admin-Rechte</label></div>
              </div>
              <div className="flex gap-2 mt-6">
                <button onClick={handleEdit} className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700">Speichern</button>
                <button onClick={() => setEditUser(null)} className="flex-1 bg-slate-600 text-white py-2 rounded-lg hover:bg-slate-500">Abbrechen</button>
              </div>
            </div>
          </div>
        )}

        {/* Reset Password Modal */}
        {resetUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-white mb-4">Passwort zurücksetzen</h3>
              <p className="text-slate-400 mb-4">Für: {resetUser.name} ({resetUser.email})</p>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Neues Passwort" className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" />
              <div className="flex gap-2 mt-6">
                <button onClick={handleResetPassword} className="flex-1 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700">Zurücksetzen</button>
                <button onClick={() => { setResetUser(null); setNewPassword(""); }} className="flex-1 bg-slate-600 text-white py-2 rounded-lg hover:bg-slate-500">Abbrechen</button>
              </div>
            </div>
          </div>
        )}

        {/* Create Modal */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-white mb-4">Neuer User</h3>
              <div className="space-y-4">
                <div><label className="text-slate-400 text-sm">Name</label><input value={createName} onChange={(e) => setCreateName(e.target.value)} className="w-full mt-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" /></div>
                <div><label className="text-slate-400 text-sm">E-Mail</label><input type="email" value={createEmail} onChange={(e) => setCreateEmail(e.target.value)} className="w-full mt-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" /></div>
                <div><label className="text-slate-400 text-sm">Passwort</label><input type="password" value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} className="w-full mt-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white" /></div>
                <div className="flex items-center gap-2"><input type="checkbox" checked={createAdmin} onChange={(e) => setCreateAdmin(e.target.checked)} className="w-4 h-4" /><label className="text-slate-300">Admin-Rechte</label></div>
              </div>
              <div className="flex gap-2 mt-6">
                <button onClick={handleCreate} className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700">Erstellen</button>
                <button onClick={() => setShowCreate(false)} className="flex-1 bg-slate-600 text-white py-2 rounded-lg hover:bg-slate-500">Abbrechen</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
