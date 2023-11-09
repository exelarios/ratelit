import { Request, Response } from "express";
import { z } from "zod";

import prisma from "@/server/utils/prisma";

export async function create(request: Request, response: Response) {

  const owner = await prisma.user.findUnique({
    where: {
      id: "0"
    }
  });

  if (!owner) {
    throw new Error("Failed to find creator of list.");
  }

  const newList = await prisma.list.create({
    data: {
      published: false,
      editors: {
        create: {
          role: "OWNER",
          userId: owner.id
        }
      }
    }
  });

  
}