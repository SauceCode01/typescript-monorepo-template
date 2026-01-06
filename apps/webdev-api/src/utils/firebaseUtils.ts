import { auth } from "../lib/firebase.js";

 

export async function isUserValid(uid: string): Promise<boolean> {
  try {
    const userRecord = await auth.getUser(uid);
    // If no error, user exists
    return true;
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      return false;
    }
    // Other errors can be thrown
    throw error;
  }
}
