-- CreateTable
CREATE TABLE "Card" (
"id" SERIAL,
    "enTitle" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deckTitle" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Localisation" (
"id" SERIAL,
    "cardId" INTEGER NOT NULL,
    "lTitle" TEXT NOT NULL,
    "lEnTitle" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CardToDeck" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Card.enTitle_unique" ON "Card"("enTitle");

-- CreateIndex
CREATE UNIQUE INDEX "_CardToDeck_AB_unique" ON "_CardToDeck"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToDeck_B_index" ON "_CardToDeck"("B");

-- AddForeignKey
ALTER TABLE "Localisation" ADD FOREIGN KEY("cardId")REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToDeck" ADD FOREIGN KEY("A")REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToDeck" ADD FOREIGN KEY("B")REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
