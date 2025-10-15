-- CreateTable
CREATE TABLE "Trade" (
    "trade_id" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "trade_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("trade_id")
);

-- CreateIndex
CREATE INDEX "Trade_user_id_idx" ON "Trade"("user_id");

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
