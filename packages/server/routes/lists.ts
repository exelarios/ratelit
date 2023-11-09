import express from "express";

import isAuthenticated from "@/server/middleware/isAuthenticated";

const Router = express.Router();

Router.get("/", (request, response) => {
  response.send("list");
});

Router.post("/create", isAuthenticated, (request, response) => {

});

export default Router;