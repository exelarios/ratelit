import express from "express";

const Router = express.Router();

import { login, signup, verify, refresh } from "@/server/controllers/auth";

Router.post("/login", login);
Router.post("/signup", signup);
Router.post("/verify", verify);
Router.post("/refresh", refresh);

Router.post("/forgot", (request, response) => {

});

Router.post("/google", (request, response) => {

});

export default Router;