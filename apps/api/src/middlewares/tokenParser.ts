import { RequestHandler } from "express";
import { supabase } from "../lib/supabase.js";

/**
 * Middleware to parse authorization token from request headers.
 * If valid, attaches the user and decoded token to the request object.
 * If invalid or absent, continues without attaching user info.
 */
export const tokenParser: RequestHandler = async (req, res, next) => {
  try {
    const supabaseAccessToken = req.cookies.supabaseAccessToken as
      | string
      | undefined;
    const googleAccessToken = req.cookies.googleAccessToken as
      | string
      | undefined;

    // get user from access token
    const { data: user, error: userError } = await supabase.auth.getUser(
      supabaseAccessToken
    );

    req.user = user.user || undefined;
    req.supabaseAccessToken = supabaseAccessToken || undefined;
    req.googleAccessToken = googleAccessToken || undefined;

    return next();
  } catch (error) {
    // If an error occurs, mark user as undefined and continue
    req.user = undefined;
    req.supabaseAccessToken = undefined;
    req.googleAccessToken = undefined;
    return next();
  }
};
