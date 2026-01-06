import { RequestHandler } from "express";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase.js";
import { userModel, UserModel } from "./user.model.js";

export class UserProfileMiddleware {
  constructor(private userModel: UserModel) {}

  userParser: RequestHandler = async (req, res, next) => {
    try {
      const supabaseAccessToken = req.supabaseAccessToken;
      const googleAccessToken = req.googleAccessToken;

      if (supabaseAccessToken) {
        const user =
          await this.userModel.getUserBySupabaseAccessToken(
            supabaseAccessToken
          );
        req.user = user || undefined;
      }

      return next();
    } catch (error) {
      req.user = undefined;
      return next();
    }
  };
}

export const userProfileMiddleware = new UserProfileMiddleware(userModel);
