"use client";

import apiFetch from "@/lib/api";
import { useEffect, useState } from "react";
import MeTest from "@/components/me-test";
type HealthResponse = {
  status: string;
  version: string;
  environment: string;
};

export default function Home() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<HealthResponse>("/api/health")
      .then((data) => {
        setHealth(data);
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {/* {isLoading && <div>Loading...</div>}

      {!isLoading && error && (
        <div className="text-red-600">
          <p>Not Connected</p>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      )}

      {!isLoading && !error && health && (
        <div className="text-green-600">
          <p>Connected</p>
          <p>Status: {health.status}</p>
          <p>Version: {health.version}</p>
          <p>Environment: {health.environment}</p>
        </div>
      )} */}
      <MeTest />
    </div>
  );
}
