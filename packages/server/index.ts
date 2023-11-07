import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import users from "@/server/routes/users";
import auth from "@/server/routes/auth";

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

function onListening() {
  console.log(`Listening on port ${PORT}.`);
}

app.listen(PORT, onListening);