import { ServerError } from "@/classes/ServerError.js";
import { createSingleErrorResponse } from "@/utils/api.utils.js";
import { RequestHandler } from "express";

export class AuthMiddleware {
  constructor() {}

  requireAuth: RequestHandler = (req, res, next) => {
    const user = req.user;

    if (!user) {
      throw new ServerError(
        401,
        "Unauthenticated",
        "You must be logged in to access this resource."
      );
    }

    next();
  };

  requireAdminRole: RequestHandler = (req, res, next) => {
    const role = req.role;

    if (!role || role !== "admin") {
      return res
        .status(403)
        .json(
          createSingleErrorResponse(
            403,
            "Forbidden",
            "You do not have permission to perform this action."
          )
        );
    }

    next();
  };

  requireAnyOfTheseRoles = (allowedRoles: string[]): RequestHandler => {
    return (req, res, next) => {
      const userRole = req.role;

      if (!userRole || !allowedRoles.includes(userRole)) {
        return res
          .status(403)
          .json(
            createSingleErrorResponse(
              403,
              "Forbidden",
              "You do not have permission to perform this action."
            )
          );
      }

      next();
    };
  };
}

export const authMiddleware = new AuthMiddleware();
