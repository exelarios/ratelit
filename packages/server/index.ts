// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
import { createYoga } from "graphql-yoga";
import schema from "@/server/graphql/schema";

// import users from "@/server/routes/users";
// import auth from "@/server/routes/auth";
// import lists from "@/server/routes/lists";
// import schema from "@/server/generated/schema";

const PORT = process.env.PORT || 3000;

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());

// app.get("/", (request, response) => {
//   response.send("hello express");
// });

// app.use("/api/users", users);
// app.use("/api/auth", auth);
// app.use("/api/lists", lists);

const yoga = createYoga({
  schema
});

const server = Bun.serve({
  fetch: yoga
});

console.info(`Server is running on ${new URL(yoga.graphqlEndpoint,`http://${server.hostname}:${server.port}`)}`);

// A fallback route, if the route requested doesn't exist.
// app.all("*", (request, response) => {
//   response.status(404);
//   response.send({
//     "success": false,
//     "message": "Route request not found. Please try a different route."
//   });
// });

// function onListening() {
//   console.log(`Listening on port ${PORT}.`);
// }

// app.listen(PORT, onListening);