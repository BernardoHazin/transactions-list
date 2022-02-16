-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "account" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "reference" VARCHAR(255) NOT NULL,
    "currency" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "amount" MONEY NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);
