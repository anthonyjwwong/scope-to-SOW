"use-client";
import { useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("Untitled Project");
  const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleAnalyze() {
    setIsLoading(true);

    try {
      const res = await fetch("/api/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          transcript,
        }),
      });

      const data = await res.json();
      console.log(data);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />
      <button onClick={handleAnalyze}>Analyze</button>
    </div>
  );
}
