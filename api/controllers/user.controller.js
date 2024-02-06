import User from "../models/user.model.js";
import { erroHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      erroHandler(
        401,
        "Vous n’êtes pas autorisé à mettre à jour cet utilisateur"
      )
    );
  }

  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username < 3 && req.body.username > 20) {
      return next(
        erroHandler(
          400,
          "Le nom d’utilisatrice doit comporter entre 3 et 20 caractères."
        )
      );
    }
    if (req.body.username.includes(" ")) {
      return next(
        erroHandler(400, "Le nom d’utilisateur ne peut pas contenir d’espace.")
      );
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(
        erroHandler(400, "Le nom d’utilisateur doit être en minuscules.")
      );
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        erroHandler(
          400,
          "Le nom d’utilisateur ne peut contenir que des lettres et des chiffres."
        )
      );
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          avatar: req.body.avatar,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
