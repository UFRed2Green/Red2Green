import prisma from "../prisma-client.js";

export async function addTrade({
    userId,
    ticker,
    tradeType,
    quantity,
    price,
    tradeDate,
}) {
    const trade = await prisma.trade.create({
        data: {
            ticker,
            tradeType,
            quantity,
            price,
            tradeDate,
            user: { connect: { id: userId } },
        },
    });

    return trade;
}
export async function deleteTrade({ tradeId, userId }) {
    const trade = await prisma.trade.findUnique({
        where: { tradeId },
    });

    if (!trade) {
        throw new Error("Trade not found");
    }

    if (trade.userId !== userId) {
        throw new Error("Unauthorized to delete this trade");
    }

    await prisma.trade.delete({
        where: { tradeId },
    });

    return { message: "Trade deleted successfully" };
}
