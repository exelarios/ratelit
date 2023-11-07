import express from "express";

const Router = express.Router();

Router.get("/", (request, response) => {
  response.send("list");
});

export default Router;