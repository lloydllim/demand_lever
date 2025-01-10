import { PrismaClient } from "@prisma/client";

export interface IPrismaService {
  getClient(): PrismaClient;
}
