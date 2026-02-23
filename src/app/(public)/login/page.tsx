"use client";

import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const { user, login } = useAuth();

  return (
    <div className="page">
      <h1>Login</h1>
      <p>Faça login para acessar o dashboard.</p>
      <button onClick={() => login("samuel.maia@email.com", "Samuel@10")}>
        Logar
      </button>
    </div>
  );
}
