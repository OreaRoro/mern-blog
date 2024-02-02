import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { erroHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(erroHandler(400, "Tous les champs sont requis"));
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(200).json("Signup successfull");
  } catch (error) {
    if (error.code === 11000) {
      return res.status(401).json("Utilisateur existe déjà");
    }
    console.log(error.code);
    next(error);
  }
};
export const signin = async (req, res, next) => {};
