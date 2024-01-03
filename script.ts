import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient({ log: ["query"] });
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  const user = await prisma.user.create({
    data: {
      name: "test1",
      email: "test1@itobuz.com",
      age: 25,
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
    //can not use both select and include at the same time
    include: {
      userPreference: true,
    },
    // select: {
    //   name: true,
    //   userPreference: { select: { id: true } },
    // },
  });

  console.log(user);

  //   const users = await prisma.user.createMany({
  //     data: [
  //       {
  //         name: "Test1",
  //         email: "test1@itobuz.com",
  //         age: 24,
  //       },
  //       {
  //         name: "Test2",
  //         email: "test2@itobuz.com",
  //         age: 25,
  //       },
  //     ],
  //   });

  //   console.log(users);

  //   const findUser = await prisma.user.findFirst({
  //     where: {
  //       email: "test1@itobuz.com"
  //     },
  //   });
  //   const findUser = await prisma.user.findUnique({
  //     where: {
  //       age_name: {
  //         age: 24,
  //         name: "Test1",
  //       },
  //     },
  //    pagination
  // take: 2,
  // skip: 1
  //   });
  //   console.log(findUser);
}

main()
  .catch((e) => console.error(e.message))
  .finally(async () => await prisma.$disconnect());
