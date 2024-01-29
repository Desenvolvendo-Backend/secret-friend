import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getAll = async () => {
  try {
    return await prisma.event.findMany();
  } catch {
    return false;
  }
};

export const getOne = async (id: number) => {
  try {
    return await prisma.event.findFirst({ where: { id } });
  } catch {
    return false;
  }
};

type EventCreateData = Prisma.Args<typeof prisma.event, "create">["data"];

export const add = async (data: EventCreateData) => {
  try {
    return await prisma.event.create({ data });
  } catch {
    return false;
  }
};

type EventsUpdateData = Prisma.Args<typeof prisma.event, "update">["data"];

export const update = async (id: number, data: EventsUpdateData) => {
  try {
    return await prisma.event.update({ where: { id }, data });
  } catch {
    return false;
  }
};
