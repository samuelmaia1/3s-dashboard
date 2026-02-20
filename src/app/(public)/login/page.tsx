'use client'

import { routes } from "@/constants/api-routes";
import { storageKeys } from "@/constants/storage-keys";
import { api } from "@/lib/axios";
import { setItem } from "@/services/storage.service";

export default function Login() {

    async function checkAuth() {
      try {
        const response = await api.post(routes.auth.login, {
          email: "samuel.maia@email.com",
          password: "Samuel@10",
        });

        if (response.status === 200) {
          setItem(storageKeys.accessToken, response.data.token);
        }
      } catch (error) {
        console.error("Erro ao validar token:", error);
      }
    }


  return <div className="page">
    <h1>Login</h1>
    <p>Faça login para acessar o dashboard.</p>
    <button onClick={checkAuth}>Logar</button>
  </div>;
}