import builder from "@/server/graphql/builder";
import prisma from "@/server/prisma";
import storage from "@/server/lib/storage";

import { Visibility } from "@/server/graphql/types";

const base64ToFile = (b64Data: string, contentType: string, fileName: string, sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
    
  const blob = new Blob(byteArrays, {type: contentType});
  return new File([blob], fileName);
}

/*
Upload {
  type: string; // png, jpeg, jpg
  encoding: string; // base64
}
*/

const ListCreateInput = builder.inputType("ListCreateInput", {
  fields: (t) => ({
    title: t.string({
      required: true
    }),
    thumbnail: t.field({
      type: "Upload",
      required: true,
      description: "encode in base64"
    }),
    categories: t.stringList(),
    visibility: t.field({
      type: Visibility,
      required: true
    }),
    description: t.string(),
  })
});

builder.mutationField("createList", (t) => t.prismaField({
  type: "List",
  args: {
    data: t.arg({
      type: ListCreateInput,
      required: true
    })
  },
  authScopes: {
    isLoggedIn: true
  },
  resolve: async (query, parent, args, context, info) => {
    const listId = crypto.randomUUID();
    const thumbnail = args.data.thumbnail;
    const [type, extension] = thumbnail.type.split("/");

    const file = base64ToFile(thumbnail.encoding, thumbnail.type, `thumbnail.${extension}`);
    const key = await storage.upload(file, `list/${listId}/${file.name}`);

    const image = await storage.fetch(key!);

    const data = prisma.list.create({
      ...query,
      data: {
        id: listId,
        title: args.data.title,
        thumbnail: key,
        visibility: args.data.visibility,
        categories: {
          set: args.data.categories || []
        },
        description: args.data.description,
        members: {
          create: {
            role: "OWNER",
            userId: context.user!.id
          }
        },
      }
    });

    return {
      ...data,
      thumbnail: image
    }
  }
}));