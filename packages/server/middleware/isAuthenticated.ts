import { RequestHandler } from "express";

const isAuthenticated: RequestHandler = (request, response, next) => {
  console.log("check");
  next();
}

export default isAuthenticated;