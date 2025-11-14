interface StockPrice {
    date: string;
    close: number;
}

async function apiRequest<T>(
    url: string,
    token: string,
    options: { method: string; body?: string } = { method: 'GET' }
): Promise<T> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: options.method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
        ...(options.body && { body: options.body }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || errorData.message || `Request failed: ${res.statusText}`);
    }

    const response = await res.json();
    if (response.success && response.data) {
        return response.data;
    }

    throw new Error(response.message || "Invalid response format");
}

export async function getStockPrices(token: string, ticker: string, range: "D" | "W" | "M"): Promise<StockPrice[]> {
    return apiRequest<StockPrice[]>(`/api/stocks/${ticker}`, token, {
        method: "POST",
        body: JSON.stringify({ range }),
    });
}
