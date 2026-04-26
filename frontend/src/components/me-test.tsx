"use client";

import { useEffect, useState } from "react";
import apiFetch from "@/lib/api";

type MeResponse = {
  user_id: string;
  email: string;
};

export default function MeTest() {
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMe() {
      try {
        const data = await apiFetch<MeResponse>("/api/me");
        setEmail(data.email);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    }

    loadMe();
  }, []);

  return (
    <div className="border rounded-md p-4">
      <h2 className="font-semibold">Auth Test</h2>

      {email && <p>Logged in as: {email}</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!email && !error && <p>Loading...</p>}
    </div>
  );
}
