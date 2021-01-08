import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient()

export const decks = [
    {
        id: 1,
        title: 'எழுத்துக்கள்',
        trtitle: 'ezhuththukkal',
        subtitle: 'Alphabets',
        avatarSrc: '/images/bookworm.svg',
        imageSrc: '/images/giraffe.png',
        description: 'Learn alphabets in Tamil'
    },
    {
        id: 2,
        title: 'பழங்கள்',
        trtitle: 'pazhangal',
        subtitle: 'Fruits',
        avatarSrc: '/images/bookworm.svg',
        imageSrc: '/images/ilandhai_jujube.png',
        description: 'Learn fruits in Tamil'
    },
    {
        id: 3,
        title: 'வண்ணங்கள்',
        trtitle: 'vannangal',
        subtitle: 'colours',
        avatarSrc: '/images/bookworm.svg',
        imageSrc: '/images/violet.png',
        description: 'Learn colours in Tamil'
    },
    {
        id: 4,
        title: 'விலங்குகள்',
        trtitle: 'vilangugal',
        subtitle: 'animals',
        avatarSrc: '/images/bookworm.svg',
        imageSrc: '/images/giraffe.png',
        description: 'Learn animals in Tamil'
    },
]

export const flashcards = [
    {
        id: 1,
        cardSetID: 1,
        title: 'அம்மா',
        subtitle: 'amma',
        trTitle: 'Mother',
        imageUrl: '/images/Amma.png',
        audioUrl: '/audio/amma.mp3'
    },
    {
        id: 2,
        cardSetID: 1,
        title: 'அணில்',
        subtitle: 'aNil',
        trTitle: 'Squirrel',
        imageUrl: '/images/squirrel.png',
        audioUrl: '/audio/anil.mp3'
    },
    {
        id: 3,
        cardSetID: 1,
        title: 'ஆடு',
        subtitle: 'Aadu',
        trTitle: 'Goat',
        imageUrl: '/images/goat.png',
        audioUrl: '/audio/aadu.mp3'
    },
    {
        id: 4,
        cardSetID: 1,
        title: 'இலை',
        subtitle: 'ilai',
        trTitle: 'leaf',
        imageUrl: '/images/leaf.png',
        audioUrl: '/audio/ilai.mp3'
    },
    {
        id: 5,
        cardSetID: 1,
        title: 'இட்லி',
        subtitle: 'idli',
        trTitle: 'idli',
        imageUrl: '/images/idli.png',
        audioUrl: '/audio/idli.mp3'
    },
    {
        id: 6,
        cardSetID: 1,
        title: 'ஈட்டி',
        subtitle: 'Eetti',
        trTitle: 'Spear',
        imageUrl: '/images/Spear.png',
        audioUrl: '/audio/Eetti.mp3'
    },

    {
        id: 1,
        cardSetID: 2,
        title: 'வாழைப்பழம்',
        subtitle: 'vaazhaipazham',
        trTitle: 'banana',
        imageUrl: null,
    },
    {
        id: 2,
        cardSetID: 2,
        title: 'திராட்சை',
        subtitle: 'draatchai',
        trTitle: 'grape',
        imageUrl: null,
    },
    {
        id: 1,
        cardSetID: 4,
        title: 'எருமை',
        subtitle: 'erumai',
        trTitle: 'buffalo',
        imageUrl: null,
    },
    {
        id: 2,
        cardSetID: 4,
        title: 'யானை',
        subtitle: 'yaanai',
        trTitle: 'elephant',
        imageUrl: null,
    },
    {
        id: 1,
        cardSetID: 3,
        title: 'சிவப்பு',
        subtitle: 'sivappu',
        trTitle: 'red',
        imageUrl: null,
    },
    {
        id: 2,
        cardSetID: 3,
        title: 'ஊதா',
        subtitle: 'oodhaa',
        trTitle: 'violet',
        imageUrl: null,
    },


]

function createCards() {
    const cards = flashcards.map(async card => {
        const deck = await getDeckforCardSetID(card.cardSetID);
        let cardData : Prisma.CardCreateInput = {
            enTitle: card.subtitle,
            imageUrl: card.imageUrl,
            localizations: {
                create: {
                    title: card.title,
                    trTitle: card.trTitle,
                    languageCode: 'ta'
                },
            }
        };
        if(deck != null) {
            cardData.decks = {
                connect: {id: deck.id}
            }
        }
        return prisma.card.create({
            data: cardData
            // data: {
            //     enTitle: card.subtitle,
            //     imageUrl: card.imageUrl,
            //     decks: {
            //         connect: deck
            //     },
            //     localizations: {
            //         create: {
            //             title: card.title,
            //             trTitle: card.trTitle,
            //             languageCode: 'ta'
            //         },
            //     }
            // }
        });

    });
    return Promise.all(cards);
}

async function getDeckforCardSetID(cardSetID: number) {
        return await prisma.deck.findFirst({
            where: {
                enTitle: decks.find((d) => d.id == cardSetID)?.subtitle
            }
        })
}

function createDecks() {
    const alldecks = decks.map(deck => {
        return prisma.deck.create({
            data: {
                enTitle: deck.subtitle,
                imageUrl: deck.imageSrc,
                description: deck.description,
                localizations: {
                    create: {
                        title: deck.title,
                        trTitle: deck.subtitle,
                        languageCode: 'ta'
                    }
                }
            }
        })
    })
    return Promise.all(alldecks);
}

async function main() {
    await createDecks();
    await createCards();
    // await prisma.deck.create({
    //     data: {
    //         enTitle: 'Alphabets',
    //         imageUrl: '/images/giraffe.png',
    //         description: 'Learn alphabets in Tamil',
    //         localizations: {
    //             create: {
    //                 title: 'எழுத்துக்கள்',
    //                 trTitle: 'ezhuththukkal',
    //                 languageCode: 'ta'
    //             },
    //         },
    //         cards: {
    //             create: [{
    //                 enTitle: 'Mother',
    //                 imageUrl: '/images/Amma.png',
    //                 localizations: {
    //                     create: {
    //                         title: 'அம்மா',
    //                         trTitle: 'amma',
    //                         audioUrl: '/audio/amma.mp3',
    //                         languageCode: 'ta',
    //                     }
    //                 }
    //             }]
    //         }
    //     }
    // });

}

main().finally(() => prisma.$disconnect());