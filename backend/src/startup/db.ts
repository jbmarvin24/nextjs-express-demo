import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function () {
  prisma
    .$connect()
    .then(() => console.log('Connected to the database...'))
    .catch((e) => console.log(e.message, e))
    .finally(async () => await prisma.$disconnect());
}
