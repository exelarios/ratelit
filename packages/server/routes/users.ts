import express from "express";

const Router = express.Router();

import isAuthenticated from "@/server/middleware/isAuthenticated";

Router.get("/", isAuthenticated, (request, response) => {
  response.send("userssss");
});

export default Router;