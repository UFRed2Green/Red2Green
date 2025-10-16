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
