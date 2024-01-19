import builder from "@/server/graphql/builder";
import prisma from "@/server/prisma";

export enum Visibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  RESTRICTED = "RESTRICTED"
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
    membership: t.prismaConnection({
      cursor: "id",
      type: "List",
      resolve(query, parent, args, context, info) {
        return prisma.list.findMany({
          ...query,
          where: {
            members: {
              every: {
                userId: parent.id
              }
            }
          }
        })
      },
    })
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
    updatedAt: t.string({
      select: {
        updatedAt: true
      },
      resolve: (parent) => parent.updatedAt.toUTCString()
    }),
    category: t.exposeString("category", {
      nullable: true
    }),
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
        const query = await prisma.editorsOfList.findFirst({
          where: {
            userId: context.user?.id
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
        const query = await prisma.editorsOfList.findFirst({
          where: {
            userId: context.user?.id
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
      type: "EditorsOfList",
      resolve(query, parent, args, context, info) {
        return prisma.editorsOfList.findMany({
          ...query,
          where: {
            AND: [
              {
                listId: parent.id
              },
              {
                role: "VIEWER"
              }
            ]
          }
        })
      },
    }),
    editors: t.prismaConnection({
      cursor: "userId_listId",
      type: "EditorsOfList",
      resolve: async (query, parent, args, context, info) => {
        const data = await prisma.editorsOfList.findMany({
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

        console.log(JSON.stringify(data, null, 2))
        return data;
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

export const Membership = builder.prismaNode("EditorsOfList", {
  id: {
    field: "userId_listId"
  },
  fields: (t) => ({
    list: t.relation("list"),
    user: t.relation("user"),
    role: t.exposeString("role")
  })
});