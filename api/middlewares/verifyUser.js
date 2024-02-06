import jwt from "jsonwebtoken";
import { erroHandler } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(erroHandler(401, "Non autorisée"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(erroHandler(401, "Non autorisée"));
    }
    req.user = user;
    next();
  });
};
