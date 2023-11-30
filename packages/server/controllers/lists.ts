import { Request, Response } from "express";
import { z } from "zod";

import prisma from "@/server/utils/prisma";
import { getUser, parseToken } from "@/server/utils/auth";

export async function create(request: Request, response: Response) {
  try {
    const headers = request.headers;
    const authorization = headers.authorization;

    if (!authorization) {
      throw new Error("No authorization header provided.");
    }

    const token = parseToken(authorization);
    const owner = await getUser(token);

    const list = await prisma.list.create({
      data: {
        published: false,
        editors: {
          create: {
            role: "OWNER",
            userId: owner.id
          }
        }
      },
      include: {
        editors: true,
        items: true
      }
    });

    response.send({
      "payload": list,
      "success": true,
      "message": "A new list has been created."
    });
  } catch(error) {
    if (error instanceof Error) {
      response.status(403).send({
        "success": false,
        "message": error.message
      });
    }
  }

}

export async function get(request: Request, response: Response) {
  try {
    const params = request.params;
    const list = await prisma.list.findMany({
      include: {
        items: {
          select: {
            id: true,
            comments: true,
            rating: true,
            thumbnail: true,
            updatedAt: true,
            ownerId: true,
            createdAt: true,
            createdBy: true,
          }
        },
        editors: {
          select: {
            user: {
              select: {
                firstName: true,
                lastName: true
              }
            },
            role: true
          }
        }
      }
    });
    
    response.send({
      "payload": list,
      "success": true,
    });

  } catch(error) {
    if (error instanceof Error) {
      response.status(403).send({
        "success": false,
        "message": error.message
      });
    }
  }
}

export async function update() {

}