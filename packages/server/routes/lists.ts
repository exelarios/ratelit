import express from "express";

import isAuthenticated from "@/server/middleware/isAuthenticated";
import { create } from "@/server/controllers/lists";

const Router = express.Router();

Router.get("/", (request, response) => {
  response.send("list");
});

Router.post("/", isAuthenticated, create);

export default Router;