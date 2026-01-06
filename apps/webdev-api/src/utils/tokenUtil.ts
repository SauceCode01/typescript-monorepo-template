import { customAlphabet } from "nanoid";

export const tokenCodeAlphabet = "23456789abcdefghjkmnpqrstxyz";
export const generateTokenCode = customAlphabet(tokenCodeAlphabet, 6);
