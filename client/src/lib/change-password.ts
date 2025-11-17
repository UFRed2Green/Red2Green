export async function changePassword(email: string, currentPassword: string, newPassword: string, confirmPassword: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ email, currentPassword, newPassword, confirmPassword }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || errorData.message || `Failed to change password: ${res.statusText}`);
    }

    return res.json();
}
