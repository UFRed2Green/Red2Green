import prisma from "../prisma-client.js";

export async function getWatchlist({ userId }) {
    const watchlist = await prisma.watchlist.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });

    return watchlist;
}

export async function addToWatchlist({ userId, ticker }) {
    // Check if ticker already exists in user's watchlist
    const existing = await prisma.watchlist.findUnique({
        where: {
            userId_ticker: {
                userId,
                ticker,
            },
        },
    });

    if (existing) {
        const err = new Error("Ticker already in watchlist");
        err.status = 409;
        throw err;
    }

    const watchlistItem = await prisma.watchlist.create({
        data: {
            ticker,
            user: { connect: { id: userId } },
        },
    });

    return watchlistItem;
}

export async function removeFromWatchlist({ id, userId }) {
    const item = await prisma.watchlist.findUnique({
        where: { id },
    });

    if (!item) {
        const err = new Error("Watchlist item not found");
        err.status = 404;
        throw err;
    }

    if (item.userId !== userId) {
        const err = new Error("Unauthorized to remove this item");
        err.status = 403;
        throw err;
    }

    await prisma.watchlist.delete({
        where: { id },
    });

    return { message: "Watchlist item deleted successfully" };
}
