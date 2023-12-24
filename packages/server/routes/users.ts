import express from "express";
const Router = express.Router();

import isAuthenticated from "@/server/middleware/isAuthenticated";

Router.get("/", isAuthenticated, (request, response) => {
  try {
    response.send("userssss");
  } catch(_error) {
    const error = _error as Error;
    response.status(403).send({
      "status": "fail",
      "message": error.message
    });
  }
});

export default Router;