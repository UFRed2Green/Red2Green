import prisma from "../prisma-client.js";
import { validateTradeOwnership } from "../utils/trade-validator.js";

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

export async function getTrades({ userId }) {
    const trades = await prisma.trade.findMany({
        where: { userId },
        orderBy: { tradeDate: "desc" },
    });

    return trades;
}

export async function deleteTrade({ tradeId, userId }) {
    const trade = await prisma.trade.findUnique({
        where: { tradeId },
    });

    validateTradeOwnership(trade, userId);

    await prisma.trade.delete({
        where: { tradeId },
    });

    return { message: "Trade deleted successfully" };
}

export async function editTrade({
    tradeId,
    userId,
    ticker,
    tradeType,
    quantity,
    price,
    tradeDate,
}) {
    const trade = await prisma.trade.findUnique({
        where: { tradeId },
    });

    validateTradeOwnership(trade, userId);

    const updatedTrade = await prisma.trade.update({
        where: { tradeId: tradeId },
        data: {
            ticker,
            tradeType,
            quantity,
            price,
            tradeDate,
        },
    });
    return updatedTrade;
}
