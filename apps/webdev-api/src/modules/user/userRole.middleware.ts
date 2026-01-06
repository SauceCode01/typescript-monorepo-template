import { RequestHandler } from "express";
import { userRoleModel, UserRoleModel } from "./userRole.model.js";

export class UserRoleMiddleware {
  constructor(private userRoleModel: UserRoleModel) {}

  userParser: RequestHandler = async (req, res, next) => {
    try {
      const user = req.user;

      if (user) {
        const userRole = await this.userRoleModel.getUserRoleById(user.id);
        req.role = userRole || undefined;
      }

      return next();
    } catch (error) {
      req.user = undefined;
      return next();
    }
  };
}

export const userRoleMiddleware = new UserRoleMiddleware(userRoleModel);
