import { expressjwt } from "express-jwt";
import { UserModel } from "../models/users.js";
import { permissions } from "../utils/rbac.js";

export const isAuthentication = expressjwt({
  secret: process.env.JWT_PRIVATE_KEY,
  algorithms: ["HS256"],
});

export const hasPermission = (action) => {
  return async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.auth.id);
      const permission = permissions.find(value => value.role === user.role);
      if (!permission) {
        return res.status(403).json("No permission found");
      }
      if (permission.actions.includes(action)) {
        next();
      } else {
        return res.status(403).json("action not allowed");
      }
    } catch (error) {
      next(error);
    }
  };
};
