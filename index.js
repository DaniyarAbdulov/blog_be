import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation, postCreateValidation } from "./validations.js";
import chekAuth from "./utils/chekAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

mongoose
  .connect("mongodb+srv://admin:wwwwww@cluster1.6p9u8jp.mongodb.net/blog")
  .catch((err) => {
    console.log(err);
  })
  .then(() => {
    console.log("DB is OK");
  });

const app = express();
app.use(express.json());

app.post("/auth/login", loginValidation, UserController.login);

app.post("/auth/register", registerValidation, UserController.register);

app.get("/auth/me", chekAuth, UserController.getMe);

app.post ('/posts', chekAuth, postCreateValidation, PostController.create)




app.listen(5555, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server is OK!");
});
