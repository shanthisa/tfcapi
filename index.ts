import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
async function main() {
  const allDecks = await prisma.deck.findMany({
    include: {cards: true}
  })
  
  
    // const allDecks = await prisma.deck.findMany()
    console.dir(allDecks, {depth: null});
    // await prisma.card.create({
    //   data: {
    //     imageUrl: '/amma.jpg',
    //     enTitle: 'Amma'
    //   }
    // })
    // const allCards = await prisma.card.findMany()
    // console.log(allCards);
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })