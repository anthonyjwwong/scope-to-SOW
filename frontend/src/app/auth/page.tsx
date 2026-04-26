"use client";

import { createClient } from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Page() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error.message);
      return;
    }

    console.log("Sign up success");
  }

  async function handleSignIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error.message);
      return;
    }

    console.log("Sign in success");
    router.push("/");
  }

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <input
          className="border"
          type="email"
          value={email}
          placeholder="email..."
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border"
          type="password"
          value={password}
          placeholder="password..."
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
    </div>
  );
}
