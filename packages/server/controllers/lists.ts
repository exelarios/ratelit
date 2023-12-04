import { Request, Response } from "express";
import { z } from "zod";

import prisma from "@/server/utils/prisma";
import { getUser, parseToken } from "@/server/utils/auth";
import { Prisma } from "@prisma/client";

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
    const query = request.query;

    const listId = query?.id as string;
    if (listId) {
      const list = await prisma.list.findUnique({
        where: {
          id: listId
        }
      });

      response.send({
        "success": true,
        "payload": list,
      });
    } else {

      let input: Prisma.ListFindManyArgs = {
        take: 10,
        orderBy: {
          id: "asc"
        },
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
      };

      // If the cursor isn't passed as a query, we will treat
      // as the first pagination request where it will return a cursor.
      const cursor = query?.cursor as string;
      if (cursor) {
        input["skip"] = 1;

        input["cursor"] = {
          id: cursor
        }

        // If `max` isn't passed into the query, we will take the default value.
        const max = query?.max as string;
        if (max) {
          input["take"] = parseInt(max);
        }
      }

      const list = await prisma.list.findMany(input);
      const lastList = list[list.length - 1];

      const nextList = await prisma.list.findMany({
        take: 1,
        skip: 1,
        cursor: {
          id: lastList.id
        },
        orderBy: {
          id: "asc"
        }
      });

      response.send({
        "payload": list,
        "next_cursor": nextList.length > 0 ? lastList.id : null,
        "last_page": nextList.length <= 0,
        "success": true,
      });
    }

  } catch(error) {
    if (error instanceof Error) {
      response.status(403).send({
        "success": false,
        "message": error.message
      });
    }
  }
}

// export async function update() {

// }