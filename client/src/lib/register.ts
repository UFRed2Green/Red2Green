export async function register(firstName: string, lastName: string, email: string, password: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (!res.ok) {
        throw new Error(`Register failed: ${res.statusText}`);
    }

    return res.json();
}
