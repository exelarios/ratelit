import express from "express";
const Router = express.Router();

import isAuthenticated from "@/server/middleware/isAuthenticated";
import { isTest } from "../middleware/test";

Router.get("/", isAuthenticated, (request, response) => {
  try {
    response.send("userssss");
  } catch(_error) {
    const error = _error as Error;
    response.status(403).send({
      "success": false,
      "message": error.message
    });
  }
});

export default Router;