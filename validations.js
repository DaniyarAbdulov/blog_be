import { body } from "express-validator";

export const loginValidation = [
  body("email", "email is wrong").isEmail(),
  body("password", "min 5 symbols of password").isLength({ min: 5 }),
  
];

export const registerValidation = [
  body("email", "email is wrong").isEmail(),
  body("password", "min 5 symbols of password").isLength({ min: 5 }),
  body("fullName", "min 3 sumbols of fullName").isLength({ min: 3 }),
  body("avatarUrl", "URL is not right").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "write title").isLength({min:3}).isString(),
  body("text", "write text").isLength({ min: 10 }).isString(),
  body("tags", "write tags").optional().isString(),
  body("imageUrl", "url is wrong").optional().isString(),
];