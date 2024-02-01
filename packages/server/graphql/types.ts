import builder from "@/server/graphql/builder";
import prisma from "@/server/prisma";
import storage from "@/server/lib/storage";
import { decodeGlobalID, encodeGlobalID } from "@pothos/plugin-relay";

export enum Visibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  RESTRICTED = "RESTRICTED"
}

export enum ROLE_ACCESS {
  FOLLOWING = "FOLLOWING",
  EDITOR = "EDITOR"
}

builder.enumType(Visibility, {
  name: "Visibility"
});

export const User = builder.prismaNode("User", {
  id: {
    field: "id",
  },
  fields: (t) => ({
    userId: t.exposeID("id"),
    firstName: t.exposeString("firstName"),
    lastName: t.exposeString("lastName"),
    email: t.exposeString("email"),
    avatar: t.exposeString("avatar"),
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
    followingList: t.prismaConnection({
      cursor: "id",
      type: "List",
      resolve(query, parent, args, context, info) {
        return prisma.list.findMany({
          ...query,
          where: {
            members: {
              every: {
                userId: parent.id,
                role: "VIEWER"
              }
            }
          }
        })
      },
    }),
    editableList: t.prismaConnection({
      cursor: "id",
      type: "List",
      resolve(query, parent, args, context, info) {
        return prisma.list.findMany({
          ...query,
          where: {
            members: {
              every: {
                userId: parent.id,
                OR: [
                  { role: "OWNER" },
                  { role: "EDITOR"}
                ]
              }
            }
          }
        })
      },
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
        const query = await prisma.membership.findFirst({
          where: {
            userId: context.user?.id,
            listId: parent.id,
            role: "VIEWER"
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
        const query = await prisma.membership.findFirst({
          select: {
            role: true
          },
          where: {
            userId: context.user?.id,
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
      resolve: (query, parent, args, context) => {
        return prisma.user.findFirstOrThrow({
          ...query,
          where: {
            membership: {
              some: {
                listId: parent.id
              }
            }
          }
        });
      }
    }),
    items: t.relation("items"),
    following: t.prismaConnection({
      cursor: "userId_listId",
      type: "Membership",
      resolve(query, parent, args, context, info) {
        return prisma.membership.findMany({
          ...query,
          where: {
            listId: parent.id,
            role: "VIEWER"
          }
        })
      },
    }),
    editors: t.prismaConnection({
      cursor: "userId_listId",
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
                  {
                    role: "EDITOR"
                  },
                  {
                    role: "OWNER"
                  }
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
    field: "userId_listId"
  },
  fields: (t) => ({
    list: t.relation("list"),
    user: t.relation("user"),
    role: t.exposeString("role")
  })
});