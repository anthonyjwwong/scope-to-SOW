import { createClient } from "./supabase";

export default async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log("Session:", session);
  console.log("Token:", session?.access_token?.substring(0, 20));
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(session?.access_token && {
        Authorization: `Bearer ${session.access_token}`,
      }),
      ...options?.headers,
    },
  });

  const contentType = res.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  const body = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    throw new Error(typeof body === "string" ? body : JSON.stringify(body));
  }

  return body as T;
}
