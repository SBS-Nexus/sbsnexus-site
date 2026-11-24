"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const API = "https://app.sbsdeutschland.com/api/erechnung";

interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  tenant_id: string;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.removeItem("sbs_token");
    localStorage.removeItem("sbs_refresh");
    localStorage.removeItem("sbs_user");
    router.replace("/login");
  }, [router]);

  useEffect(() => {
    let active = true;
    async function checkAuth() {
      const stored = localStorage.getItem("sbs_token");
      if (!stored) { router.replace("/login"); return; }
      let profile: User | null = null;
      let accessToken = stored;
      let rejectedSession = false;
      try { profile = JSON.parse(localStorage.getItem("sbs_user") || "null"); } catch { /* Ignore invalid cache. */ }
      try {
        let res = await fetch(API + "/users/profile", { headers: { Authorization: "Bearer " + stored } });
        if (res.status === 401) {
          rejectedSession = true;
          const refreshToken = localStorage.getItem("sbs_refresh");
          if (!refreshToken) { if (active) logout(); return; }
          const refresh = await fetch(API + "/auth/refresh", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: refreshToken }),
          });
          if (!refresh.ok) { if (active) logout(); return; }
          const data = await refresh.json();
          if (!active) return;
          localStorage.setItem("sbs_token", data.access_token);
          localStorage.setItem("sbs_refresh", data.refresh_token);
          accessToken = data.access_token;
          rejectedSession = false;
          res = await fetch(API + "/users/profile", { headers: { Authorization: "Bearer " + accessToken } });
          if (res.status === 401) { if (active) logout(); return; }
        }
        if (res.ok) {
          profile = await res.json();
          if (active) localStorage.setItem("sbs_user", JSON.stringify(profile));
        }
      } catch {
        // A rejected access token must never become a cached authenticated session
        // just because the refresh endpoint is unavailable.
        if (rejectedSession) { if (active) logout(); return; }
        // Preserve the existing cached-user fallback for initial network failures.
      }
      if (active) {
        setToken(accessToken);
        setUser(profile);
        setLoading(false);
      }
    }
    void checkAuth();
    return () => { active = false; };
  }, [router, logout]);

  return { user, loading, token, logout };
}
