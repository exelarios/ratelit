import builder from "@/server/graphql/builder";
import prisma from "@/server/prisma";
import storage from "@/server/lib/storage";
import { Role } from "@prisma/client";

import { TabOptions } from "@/shared/types";
import { createGraphQLError } from "graphql-yoga";
import { decodeGlobalID } from "@pothos/plugin-relay";

export enum Visibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  RESTRICTED = "RESTRICTED"
}

builder.enumType(Visibility, {
  name: "Visibility"
});

builder.enumType(TabOptions, {
  name: "ListTabOptions"
});

export const User = builder.prismaNode("User", {
  id: {
    field: "id",
  },
  fields: (t) => ({
    firstName: t.exposeString("firstName"),
    lastName: t.exposeString("lastName"),
    email: t.exposeString("email"),
    avatar: t.string({
      select: {
        avatar: true
      },
      resolve: async (parent, args) => {
        const image = await storage.fetch(parent.avatar);

        if (!image) {
          throw createGraphQLError(`The user's avatar failed to load.`, {
            extensions: {
              code: "USER_AVATAER_FAILED"
            }
          });
        }

        return image;
      }
    }),
    name: t.string({
      select: {
        firstName: true,
        lastName: true
      },
      resolve: (parent) => `${parent.firstName} ${parent.lastName}`
    }),
    createdAt: t.expose("createdAt", {
      type: "Date"
    }),
    feed: t.prismaConnection({
      type: "List",
      cursor: "id",
      resolve(query, parent, args, context, info) {
        // note: for now, we'll just display everything.
        // but eventually it will be tailored to the user.
        return prisma.list.findMany({
          ...query,
          orderBy: {
            updatedAt: "desc"
          }
        });
      },
    }),
    list: t.prismaConnection({
      type: "List",
      cursor: "id",
      args: {
        tabOption: t.arg({
          type: TabOptions
        })
      },
      resolve: async (query, parent, args, context, info) => {
        if (args.tabOption === TabOptions.Author) {
          return prisma.list.findMany({
            ...query,
            where: {
              members: {
                every: {
                  userId: parent.id,
                  OR: [
                    { role: Role.EDITOR },
                    { role: Role.OWNER }
                  ]
                }
              }
            },
            orderBy: {
              updatedAt: "desc"
            }
          });
        }

        if (args.tabOption === TabOptions.Following) {
          return prisma.list.findMany({
            ...query,
            where: {
              members: {
                some: {
                  role: Role.VIEWER,
                  userId: parent.id
                }
              }
            },
            orderBy: {
              updatedAt: "desc"
            }
          });
        }

        return prisma.list.findMany({
          ...query,
          where: {
            members: {
              some: {
                userId: parent.id
              }
            }
          },
          orderBy: {
            updatedAt: "desc"
          }
        });
      }
    }),
  })
});

export const Tokens = builder.objectRef<{
  access: string,
  refresh: string 
}>("Tokens").implement({
  fields: (t) => ({
    access: t.exposeString("access"),
    refresh: t.exposeString("refresh")
  })
});

export const List = builder.prismaNode("List", {
  id: {
    field: "id"
  },
  fields: (t) => ({
    title: t.exposeString("title"),
    createdAt: t.expose("createdAt", {
      type: "Date"
    }),
    updatedAt: t.expose("updatedAt", {
      type: "Date"
    }),
    thumbnail: t.string({
      select: {
        thumbnail: true
      },
      resolve: async (parent) => {
        const key = parent.thumbnail;
        if (!key) {
          return "";
        }
        const image = await storage.fetch(key);
        return image!;
      }
    }),
    categories: t.exposeStringList("categories"),
    visibility: t.field({
      type: Visibility,
      resolve: (parent) => Visibility[parent.visibility]
    }),
    description: t.exposeString("description", {
      nullable: true
    }),
    isFollowing: t.field({
      type: "Boolean",
      resolve: async (parent, args, context) => {
        const { id } = decodeGlobalID(context.user?.id!);

        const query = await prisma.membership.findFirst({
          where: {
            userId: id,
            listId: parent.id,
            role: Role.VIEWER
          }
        });

        if (!query) {
          return false;
        }

        return true;
      }
    }),
    role: t.string({
      resolve: async (parent, args, context) => {
        const { id } = decodeGlobalID(context.user?.id!);

        const query = await prisma.membership.findFirst({
          select: {
            role: true
          },
          where: {
            userId: id,
            listId: parent.id
          }
        });

        if (!query) {
          return "GUEST"
        }

        return query.role;
      }
    }),
    owner: t.prismaField({
      type: "User",
      resolve: async (query, parent, args, context) => {
        const owner = await prisma.membership.findFirst({
          where: {
            listId: parent.id,
            role: Role.OWNER
          }
        });

        return prisma.user.findFirstOrThrow({
          ...query,
          where: {
            membership: {
              some: {
                userId: owner?.userId,
                listId: parent.id
              }
            }
          }
        })
      }
    }),
    items: t.relation("items"),
    following: t.prismaConnection({
      cursor: "id",
      type: "Membership",
      resolve(query, parent, args, context, info) {
        return prisma.membership.findMany({
          ...query,
          where: {
            listId: parent.id,
            role: Role.VIEWER
          }
        })
      },
    }),
    editors: t.prismaConnection({
      cursor: "id",
      type: "Membership",
      resolve: async (query, parent, args, context, info) => {
        return prisma.membership.findMany({
          ...query,
          where: {
            AND: [
              {
                listId: parent.id
              },
              {
                OR: [
                  { role: Role.EDITOR },
                  { role: Role.OWNER }
                ]
              }
            ]
          }
        });
      },
    })
  })
});

export const Item = builder.prismaNode("Item", {
  id: {
    field: "id"
  },
  fields: (t) => ({
    rating: t.exposeFloat("rating"),
    name: t.exposeString("name"),
    thumbnail: t.exposeString("thumbnail", {
      nullable: true
    }),
    description: t.exposeString("description", {
      nullable: true
    }),
    ownerId: t.exposeID("ownerId"),
    createdAt: t.expose("createdAt", {
      type: "Date"
    }),
    updatedAt: t.expose("createdAt", {
      type: "Date"
    }),
    comments: t.prismaConnection({
      cursor: "id",
      type: "Comment",
      resolve: async (query, parent, args, context, info) => {
        return prisma.comment.findMany({
          ...query,
          where: {
            itemId: parent.id
          }
        });
      },
    })
  })
});

export const Comment = builder.prismaNode("Comment", {
  id: {
    field: "id"
  },
  fields: (t) => ({
    content: t.exposeString("content"),
    ownerId: t.exposeID("ownerId"),
    createdAt: t.expose("createdAt", {
      type: "Date"
    }),
    updatedAt: t.expose("createdAt", {
      type: "Date"
    }),
    createdBy: t.relation("createdBy"),
    itemId: t.exposeID("itemId")
  })
});

export const Membership = builder.prismaNode("Membership", {
  id: {
    field: "id"
  },
  fields: (t) => ({
    list: t.relation("list"),
    user: t.relation("user"),
    role: t.exposeString("role")
  })
});