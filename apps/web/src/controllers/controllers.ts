import type { RequestHandler } from "express";
import { multiplyTwoNumbers, addTwoNumbers } from "@packages/shared";

export const homeController: RequestHandler = (req, res) => {
  const query = req.query;
  let a = 0;
  let b = 0;
  if (query?.a) {
    a = parseInt(query.a as string, 0);
  }
  if (query?.b) {
    b = parseInt(query.b as string, 0);
  }

  res.status(200).json({ success: true, message: "Welcome to the Home Page!", data: {
    a,
    b,
    sum: addTwoNumbers(a, b),
  } });
};
