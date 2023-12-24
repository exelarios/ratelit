import prisma from "./index";

const user = await prisma.user.create({
  select: {
    id: true
  },
  data: {
    firstName: "Jane",
    lastName: "Smith",
    avatar: "",
    email: "janesmith@ratelit.com",
    password: "1234",
  }
});

const list = await prisma.list.create({
  data: {
    title: "Best 'Your Mom' Jokes",
    description: "yes, ur mom jokes",
    visibility: "PUBLIC",
    editors: {
      create: {
        role: "OWNER",
        userId: user.id
      }
    }
  },
});

const items = await prisma.item.createMany({
  data: [
    {
      name: "Urmomma soo cool",
      listId: list.id,
      ownerId: user.id,
      rating: 3.4,
      thumbnail: "",
    },
    {
      name: "Urmommaa went to the store and dropped money",
      listId: list.id,
      ownerId: user.id,
      rating: 4.5,
      thumbnail: "",
    },
  ]
});