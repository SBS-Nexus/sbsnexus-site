"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  name: string;
  is_admin: boolean;
  is_active: boolean;
  created_at: string;
  last_login: string | null;
}

export default function AdminPage() {
  const [user, setUser] = useState<{id: number, name: string, role: string} | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", is_admin: false });
  const [creating, setCreating] = useState(false);
  const [resetUserId, setResetUserId] = useState<number | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [editUser, setEditUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("sbs_user");
    const token = localStorage.getItem("sbs_token");
    if (!savedUser || !token) { router.push("/login"); return; }
    const userData = JSON.parse(savedUser);
    if (userData.role !== "admin") { router.push("/dashboard"); return; }
    setUser(userData);
    fetchUsers(token);
  }, [router]);

  async function fetchUsers(token: string) {
    try {
      const res = await fetch("https://app.sbsdeutschland.com/api/nexus/admin/users", { headers: { "Authorization": token } });
      const data = await res.json();
      if (data.users) setUsers(data.users);
      else setError(data.detail || "Fehler");
    } catch { setError("Verbindungsfehler"); }
    setLoading(false);
  }

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    const token = localStorage.getItem("sbs_token");
    try {
      const res = await fetch("https://app.sbsdeutschland.com/api/nexus/admin/users", {
        method: "POST", headers: { "Content-Type": "application/json", "Authorization": token || "" }, body: JSON.stringify(newUser)
      });
      const data = await res.json();
      if (data.success) { setShowForm(false); setNewUser({ name: "", email: "", password: "", is_admin: false }); fetchUsers(token || ""); setSuccess("User erstellt!"); setTimeout(() => setSuccess(""), 3000); }
      else setError(data.detail || "Fehler");
    } catch { setError("Verbindungsfehler"); }
    setCreating(false);
  }

  async function deleteUser(userId: number) {
    if (!confirm("User wirklich löschen?")) return;
    const token = localStorage.getItem("sbs_token");
    await fetch(`https://app.sbsdeutschland.com/api/nexus/admin/users/${userId}`, { method: "DELETE", headers: { "Authorization": token || "" } });
    setUsers(users.filter(u => u.id !== userId));
    setSuccess("User gelöscht!"); setTimeout(() => setSuccess(""), 3000);
  }

  async function resetPassword(e: React.FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem("sbs_token");
    try {
      const res = await fetch("https://app.sbsdeutschland.com/api/nexus/admin/reset-password", {
        method: "POST", headers: { "Content-Type": "application/json", "Authorization": token || "" }, body: JSON.stringify({ user_id: resetUserId, new_password: newPassword })
      });
      const data = await res.json();
      if (data.success) { setResetUserId(null); setNewPassword(""); setSuccess("Passwort geändert!"); setTimeout(() => setSuccess(""), 3000); }
      else setError(data.detail || "Fehler");
    } catch { setError("Verbindungsfehler"); }
  }

  async function updateUser(e: React.FormEvent) {
    e.preventDefault();
    if (!editUser) return;
    const token = localStorage.getItem("sbs_token");
    try {
      const res = await fetch(`https://app.sbsdeutschland.com/api/nexus/admin/users/${editUser.id}`, {
        method: "PUT", headers: { "Content-Type": "application/json", "Authorization": token || "" }, body: JSON.stringify({ name: editUser.name, is_admin: editUser.is_admin })
      });
      const data = await res.json();
      if (data.success) { setEditUser(null); fetchUsers(token || ""); setSuccess("User aktualisiert!"); setTimeout(() => setSuccess(""), 3000); }
      else setError(data.detail || "Fehler");
    } catch { setError("Verbindungsfehler"); }
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div><h1 className="text-2xl font-bold">👤 Admin Panel</h1><p className="text-slate-300">User-Verwaltung</p></div>
            <a href="/dashboard" className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg">← Dashboard</a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">{error}</div>}
        {success && <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6">{success}</div>}
        
        {showForm && (
          <div className="bg-white rounded-xl border p-6 mb-6">
            <h3 className="font-semibold mb-4">Neuen User erstellen</h3>
            <form onSubmit={createUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Name" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} className="px-4 py-2 border rounded-lg" required />
              <input type="email" placeholder="E-Mail" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} className="px-4 py-2 border rounded-lg" required />
              <input type="password" placeholder="Passwort" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} className="px-4 py-2 border rounded-lg" required />
              <label className="flex items-center gap-2"><input type="checkbox" checked={newUser.is_admin} onChange={e => setNewUser({...newUser, is_admin: e.target.checked})} /> Admin-Rechte</label>
              <div className="md:col-span-2 flex gap-2">
                <button type="submit" disabled={creating} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">{creating ? "Erstellen..." : "User erstellen"}</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Abbrechen</button>
              </div>
            </form>
          </div>
        )}

        {resetUserId && (
          <div className="bg-white rounded-xl border p-6 mb-6">
            <h3 className="font-semibold mb-4">Passwort zurücksetzen für: {users.find(u => u.id === resetUserId)?.name}</h3>
            <form onSubmit={resetPassword} className="flex gap-4">
              <input type="password" placeholder="Neues Passwort" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="px-4 py-2 border rounded-lg flex-1" required minLength={6} />
              <button type="submit" className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700">Speichern</button>
              <button type="button" onClick={() => setResetUserId(null)} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Abbrechen</button>
            </form>
          </div>
        )}

        {editUser && (
          <div className="bg-white rounded-xl border p-6 mb-6">
            <h3 className="font-semibold mb-4">User bearbeiten: {editUser.email}</h3>
            <form onSubmit={updateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Name" value={editUser.name} onChange={e => setEditUser({...editUser, name: e.target.value})} className="px-4 py-2 border rounded-lg" required />
              <label className="flex items-center gap-2"><input type="checkbox" checked={editUser.is_admin} onChange={e => setEditUser({...editUser, is_admin: e.target.checked})} /> Admin-Rechte</label>
              <div className="md:col-span-2 flex gap-2">
                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">Speichern</button>
                <button type="button" onClick={() => setEditUser(null)} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Abbrechen</button>
              </div>
            </form>
          </div>
        )}
        
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <h2 className="font-semibold">User ({users.length})</h2>
            {!showForm && <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">+ Neuer User</button>}
          </div>
          
          {loading ? <div className="p-8 text-center text-gray-500">Laden...</div> : (
            <table className="w-full">
              <thead className="bg-gray-50 text-left text-sm text-gray-600">
                <tr><th className="px-4 py-3">ID</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">E-Mail</th><th className="px-4 py-3">Rolle</th><th className="px-4 py-3">Erstellt</th><th className="px-4 py-3">Letzter Login</th><th className="px-4 py-3">Aktionen</th></tr>
              </thead>
              <tbody className="divide-y">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{u.id}</td>
                    <td className="px-4 py-3 font-medium">{u.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs ${u.is_admin ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"}`}>{u.is_admin ? "Admin" : "User"}</span></td>
                    <td className="px-4 py-3 text-sm text-gray-500">{u.created_at?.split(" ")[0]}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{u.last_login?.split("T")[0] || "-"}</td>
                    <td className="px-4 py-3 text-sm space-x-2">
                      <button onClick={() => setEditUser(u)} className="text-blue-600 hover:text-blue-800">Bearbeiten</button>
                      <button onClick={() => setResetUserId(u.id)} className="text-orange-600 hover:text-orange-800">Passwort</button>
                      {u.id !== user.id && <button onClick={() => deleteUser(u.id)} className="text-red-600 hover:text-red-800">Löschen</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
