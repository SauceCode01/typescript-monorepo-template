import { create } from "zustand";
import {
  User,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { getAuthErrorMessage } from "@/lib/firebase/firebaseErrors";

type AuthStore = {
  user: User | null;
  token: string | null;
  state: "checking" | "unauthenticated" | "authenticated";
  error: string | null;
  role: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const provider = new GoogleAuthProvider();

export const useAuthStore = create<AuthStore>((set) => {
  onIdTokenChanged(auth, async (user) => {
    console.log("id token changed", user);
    if (user) {
      const tokenResult = await auth.currentUser?.getIdTokenResult();
      const token = tokenResult!.token;
      const role = (tokenResult!.claims.role as string) || "guest";
      set({
        user,
        token,
        state: "authenticated",
        error: null,
        role,
      });
    } else {
      set({
        user: null,
        token: null,
        state: "unauthenticated",
        error: null,
        role: null,
      });
    }
  });

  return {
    user: null,
    token: null,
    role: null,
    state: "checking",
    error: null,

    login: async (email, password) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err: unknown) {
        const message = getAuthErrorMessage(err);
        set({ state: "unauthenticated", error: message });
      }
    },

    register: async (email, password) => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (err: unknown) {
        const message = getAuthErrorMessage(err);
        set({ state: "unauthenticated", error: message });
      }
    },

    loginWithGoogle: async () => {
      try {
        await signInWithPopup(auth, provider);
      } catch (err: unknown) {
        const message = getAuthErrorMessage(err);
        set({ state: "unauthenticated", error: message });
      }
    },

    logout: async () => {
      await signOut(auth);
    },
  };
});
