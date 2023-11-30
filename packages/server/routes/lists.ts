import express from "express";

import isAuthenticated from "@/server/middleware/isAuthenticated";
import { create, get } from "@/server/controllers/lists";

const Router = express.Router();

Router.get("/", isAuthenticated, get);
Router.post("/", isAuthenticated, create);

export default Router;