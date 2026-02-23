"use client";

import { routes } from "@/constants/api-routes";
import { api } from "@/lib/axios";
import { LoggedUser } from "@/types/User";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextValues {
  user: LoggedUser | null;
  setUser: (user: LoggedUser | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loadingAuth: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextValues>(
  {} as AuthContextValues,
);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<LoggedUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const router = useRouter();

  async function loadUser() {
    try {
      const response = await api.get(routes.users.get);
      setUser(response.data);
    } catch (error) {
      setUser(null);
      router.push("/login");
    } finally {
      setLoadingAuth(false);
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await api.post(routes.auth.login, { email, password });
      const userData: LoggedUser = response.data.user;
      setUser(userData);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  async function logout() {
    setUser(null);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
