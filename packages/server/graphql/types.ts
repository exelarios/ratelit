import builder from "@/server/graphql/builder";

export enum Visibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  RESTRICTED = "RESTRICTED"
}

builder.enumType(Visibility, {
  name: "Visibility"
});

builder.prismaNode("User", {
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
    createdAt: t.string({
      select: {
        createdAt: true
      },
      resolve: (parent) => parent.createdAt.toUTCString()
    })
  })
});

builder.prismaNode("List", {
  id: {
    field: "id"
  },
  fields: (t) => ({
    title: t.exposeString("title"),
    createdAt: t.string({
      select: {
        createdAt: true
      },
      resolve: (parent) => parent.createdAt.toUTCString()
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
        editors: {
          where: { listId: args.listId }
        }
      }),
      resolve: (parent, args) => {
        const user = parent.editors.filter(editor => editor.role === "OWNER")[0];
        return user.userId;
      }
    }),
    items: t.relation("items")
  })
});

builder.prismaNode("Item", {
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
    createdAt: t.string({
      select: {
        createdAt: true
      },
      resolve: (parent) => parent.createdAt.toUTCString()
    }),
    updatedAt: t.string({
      select: {
        updatedAt: true
      },
      resolve: (parent) => parent.updatedAt.toUTCString()
    }) 
  })
});

builder.prismaNode("Comment", {
  id: {
    field: "id"
  },
  fields: (t) => ({
    content: t.exposeString("content"),
    ownerId: t.exposeID("ownerId"),
  })
})