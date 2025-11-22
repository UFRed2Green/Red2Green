export async function getEmail(token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || errorData.message || `Email Verification Failed: ${res.statusText}`);
    }

    const response = await res.json();
    if (response.success && response.data) {
        return response.data;
    }

    throw new Error(response.message || "Failed to verify email");
}
