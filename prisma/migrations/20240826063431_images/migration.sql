-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ImageToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ImageToProduct_AB_unique" ON "_ImageToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_ImageToProduct_B_index" ON "_ImageToProduct"("B");

-- AddForeignKey
ALTER TABLE "_ImageToProduct" ADD CONSTRAINT "_ImageToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToProduct" ADD CONSTRAINT "_ImageToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
