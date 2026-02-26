"use client";

import { routes } from "@/constants/api-routes";
import { publicPaths } from "@/constants/app-paths";
import { api } from "@/lib/axios";
import { ApiError } from "@/types/Error";
import { LoggedUser } from "@/types/User";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextValues {
  user: LoggedUser | null;
  setUser: (user: LoggedUser | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loadingAuth: boolean;
  isLoggingIn: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextValues>(
  {} as AuthContextValues,
);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<LoggedUser | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const router = useRouter();

  async function loadUser() {
    try {
      const response = await api.get(routes.users.get);
      setUser(response.data);
    } catch (error) {
      setUser(null);
      if (!publicPaths.includes(window.location.pathname)) 
        router.push("/login");
    } finally {
      setLoadingAuth(false);
    }
  }

  async function login(email: string, password: string) {
    try {
      setLoadingAuth(true);
      setIsLoggingIn(true);
      
      const response = await api.post(routes.auth.login, { email, password });
      const userData: LoggedUser = response.data.user;
      setUser(userData);
      router.push("/dashboard?login=true");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        throw new ApiError(error.response.data);
      }

      throw error;
    } finally {
      setLoadingAuth(false);
    }
  }

  async function logout() {
    setUser(null);
    try {
      setLoadingAuth(true);
      const response = await api.post(routes.auth.logout);

      if (response.status === 204) {
        setUser(null);
        router.push("/login?logout=true");
      } else {
        throw new ApiError(response.data);
      }

    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        throw new ApiError(error.response.data);
      }

      throw error;
    } finally {
      setLoadingAuth(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loadingAuth, isLoggingIn }}>
      {children}
    </AuthContext.Provider>
  );
};
