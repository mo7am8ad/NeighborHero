import User from "../SchemaModules/user.model.js";
import createError from "../utils/createError.js";
import jwt from 'jsonwebtoken';

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can only delete your account!!"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("User has been deleted.");
};

export const getUser = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (token) {
      jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
        if (err) return next(createError(401, "Token isn't valid!"));
        req.userId = payload.id;
        req.isSeller = payload.isSeller;
      });
    }

    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found!"));
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
