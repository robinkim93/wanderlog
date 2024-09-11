import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
  const res = await prisma.users.create({ data: { name: "robin" } });
  return res.name;
};
