export async function register(first_name: string, last_name: string, email: string, password: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ first_name, last_name, email, password }),
    });

    if (!res.ok) {
        throw new Error(`Register failed: ${res.statusText}`);
    }

    return res.json();
}