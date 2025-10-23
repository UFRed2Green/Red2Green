export async function sendCode(email: string) {
    const type = "forgotPassword";

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ email, type }),
    });

    if (!res.ok) {
        throw new Error(`Code failed to send: ${res.statusText}`);
    }

    return res.json();
}

export async function changePass(email: string, code: string, newPassword: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forgot-pass/change`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ email, code, newPassword }),
    });

    if (!res.ok) {
        throw new Error(`Failed to change password: ${res.statusText}`);
    }

    return res.json();
}
