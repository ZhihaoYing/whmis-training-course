"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Temporary mock login.
    // We will replace this with Supabase authentication later.
    router.push("/dashboard");
  }

  return (
    <main className="login-page">

      <div className="login-card">

        <div className="login-brand">
          <div className="login-logo">
            S
          </div>

          <div>
            <div className="eyebrow">
              Employee Training Portal
            </div>

            <h1>
              Sign in
            </h1>
          </div>
        </div>

        <p className="login-description">
          Access your General WHMIS Training and
          company-specific SDS assignments.
        </p>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <label>
            Email

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="employee@company.com"
              required
            />
          </label>

          <label>
            Password

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              required
            />
          </label>

          <button
            type="submit"
            className="login-button"
          >
            Sign In
          </button>

        </form>

        <div className="login-note">
          Your training access is provided by your employer.
        </div>

      </div>

    </main>
  );
}