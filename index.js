import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";
import { chekAuth, handleValidationErrors } from "./utils/index.js";
import { UserController, PostController } from "./controllers/index.js";

mongoose
  .connect("mongodb+srv://admin:wwwwww@cluster1.6p9u8jp.mongodb.net/blog")
  .catch((err) => {
    console.log(err);
  })
  .then(() => {
    console.log("DB is OK");
  });

const app = express();
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", chekAuth, UserController.getMe);

app.post("/upload", chekAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  chekAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete("/posts/:id", chekAuth, PostController.remove);
app.patch(
  "/posts/:id",
  chekAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

app.listen(5555, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server is OK!");
});
