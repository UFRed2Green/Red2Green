export async function login(email: string, password: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || errorData.message || `Login failed: ${res.statusText}`);
    }

    const response = await res.json();
    if (response.success && response.data) {
        return response.data;
    }

    throw new Error(response.message || "Login failed: Invalid response format");
}
