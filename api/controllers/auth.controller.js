import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { erroHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
      return next(erroHandler(400, "Utilisateur déjà inscrit."));
    }
    next(error);
  }
};
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(erroHandler(400, "Tous les champs sont requis"));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(erroHandler(400, "Identifiant invalide"));
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return next(erroHandler(400, "Identifiant invalide"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    const { password: pass, ...rest } = user._doc;
    res.status(200).cookie("acces_token", token, { httpOnly: true }).json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { username, email, avatar } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });
      const { password, ...rest } = userExist._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          username.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        avatar,
        password: hashedPassword,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
