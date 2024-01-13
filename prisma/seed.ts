import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.upsert({
    create: {
      email: "adjiekosaputro@gmail.com",
      id: "123123123",
      image: "https://avatars.githubusercontent.com/u/72213895?v=4",
      name: "Adji Eko Saputro",
    },
    where: {
      id: "123123123",
    },
    update: {},
  });

  console.log(user);

  await prisma.userReport.createMany({
    data: [
      {
        costPrizeFrom: 100000,
        costPrizeTo: 200000,
        foodPrizeFrom: 100000,
        foodPrizeTo: 200000,
        id: "1",
        latitude: -6.905709,
        longitude: 107.570699,
        transportationPrizeFrom: 100000,
        transportationPrizeTo: 200000,
        userId: "123123123",
        location: "",
      },
      {
        costPrizeFrom: 100000,
        costPrizeTo: 200000,
        foodPrizeFrom: 100000,
        foodPrizeTo: 200000,
        id: "2",
        latitude: -6.945709,
        longitude: 107.570699,
        transportationPrizeFrom: 100000,
        transportationPrizeTo: 200000,
        userId: "123123123",
        location: "",
      },
      {
        costPrizeFrom: 100000,
        costPrizeTo: 200000,
        foodPrizeFrom: 100000,
        foodPrizeTo: 200000,
        id: "3",
        latitude: -8.05709,
        longitude: 107.570699,
        transportationPrizeFrom: 100000,
        transportationPrizeTo: 200000,
        userId: "123123123",
        location: "",
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
