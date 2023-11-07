import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import users from "@/server/routes/users";
import auth from "@/server/routes/auth";
import lists from "@/server/routes/lists";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (request, response) => {
  response.send("hello express");
});

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/lists", lists);

// A fallback route, if the route requested doesn't exist.
app.all("*", (request, response) => {
  response.status(404);
  response.send({
    "success": false,
    "message": "Route request not found. Please try a different route."
  });
});

function onListening() {
  console.log(`Listening on port ${PORT}.`);
}

app.listen(PORT, onListening);