export async function sendPostRequest(
  url: string,
  payload: Record<string, unknown>
): Promise<{
  status: number;
  token?: string;
  message?: string;
  error?: string;
}> {
  try {
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return {
      status: response.status,
      token: typeof data.token === "string" ? data.token : undefined, // Ensure token is a string
      message: typeof data.message === "string" ? data.message : undefined,
      error: typeof data.error === "string" ? data.error : undefined,
    };
  } catch (error) {
    return { status: 500, error: "Network error." };
  }
}
