"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const stored = localStorage.getItem("sbs_token");
    const storedUser = localStorage.getItem("sbs_user");

    if (!stored) {
      router.replace("/login");
      return;
    }

    setToken(stored);

    // Try to use stored user first for fast render
    if (storedUser) {
      try { setUser(JSON.parse(storedUser)); } catch {}
    }

    // Validate token with API
    try {
      const res = await fetch(API + "/users/profile", {
        headers: { "Authorization": "Bearer " + stored },
      });

      if (res.ok) {
        const profile = await res.json();
        setUser(profile);
        localStorage.setItem("sbs_user", JSON.stringify(profile));
      } else if (res.status === 401) {
        // Try refresh
        const refreshed = await tryRefresh();
        if (!refreshed) {
          logout();
          return;
        }
      }
    } catch {
      // Network error — use cached user
    }

    setLoading(false);
  };

  const tryRefresh = async (): Promise<boolean> => {
    const refreshToken = localStorage.getItem("sbs_refresh");
    if (!refreshToken) return false;

    try {
      const res = await fetch(API + "/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("sbs_token", data.access_token);
        localStorage.setItem("sbs_refresh", data.refresh_token);
        setToken(data.access_token);
        return true;
      }
    } catch {}

    return false;
  };

  const logout = () => {
    localStorage.removeItem("sbs_token");
    localStorage.removeItem("sbs_refresh");
    localStorage.removeItem("sbs_user");
    router.replace("/login");
  };

  return { user, loading, token, logout };
}
