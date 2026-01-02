import { getApiUrl } from "./api";

export const authFetch = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = localStorage.getItem("token");

  // If no token, redirect to sign-in page
  if (!token) {
    console.error("No token found, redirecting to login.");
    // Check if window is defined (i.e., we are in a browser environment)
    if (typeof window !== "undefined") {
      window.location.href = "/signin";
    }
    // Return a mock response or throw an error to stop further execution
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${token}`);

  const isFormData = options.body instanceof FormData;
  if (!isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(getApiUrl(endpoint), {
    ...options,
    headers,
  });

  // Check for auth errors and handle logout
  if (response.status === 401 || response.status === 403) {
    console.error("Authentication error, logging out.");
    localStorage.removeItem("token");
    if (typeof window !== "undefined") {
      window.location.href = "/signin";
    }
    // Return a clone of the response so the body can still be read by the original caller
    return response.clone();
  }

  return response;
};
