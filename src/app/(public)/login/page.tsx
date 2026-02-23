"use client";

import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@components/LoadingSpinner/LoadingSpinner";

export default function Login() {
  const { loadingAuth, login } = useAuth();

  return (
    <div className="page">
      {!loadingAuth ? (
        <div>
          <h1>Login</h1>
          <p>Faça login para acessar o dashboard.</p>
          <button onClick={() => login("samuel.maia@email.com", "Samuel@10")}>
            Logar
          </button>
        </div>
      ) : (
        <LoadingSpinner color="primary" size={24} />
      )}
    </div>
  );
}
