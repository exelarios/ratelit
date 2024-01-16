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
      cursor: "userId_listId",
      type: "EditorsOfList",
      resolve(query, parent, args, context, info) {
        return prisma.editorsOfList.findMany({
          ...query,
          where: {
            AND: [
              {
                OR: [
                  { role: "EDITOR" },
                  { role: "OWNER"}
                ]
              },
              {
                userId: parent.id
              }
            ]
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
    owner: t.string({
      args: {
        "listId": t.arg.string(),
      },
      select: (args) => ({
        members: {
          where: { listId: args.listId }
        }
      }),
      resolve: (parent, args) => {
        const user = parent.members.filter(member => member.role === "OWNER")[0];
        return user.userId;
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
      resolve(query, parent, args, context, info) {
        return prisma.editorsOfList.findMany({
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
        })
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