import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import { getUser } from "@/supabase/user";
import { UsersTable } from "@/supabase";
import { logIn, logOut } from "@/supabase/auth";

interface AuthState {
  user: UsersTable | null;
  isLoading: boolean;
  error: string | null;
  initializeAuth: () => Promise<void>;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<
    | { success: boolean; error?: undefined }
    | { success: boolean; error: string }
  >;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,

  initializeAuth: async () => {
    try {
      const { data } = await getUser();
      set({ user: data, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  login: async ({ email, password }: { email: string; password: string }) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await logIn({ email, password });
      if (error) throw new Error(error);

      const { data: userData, error: userError } = await getUser();
      if (userError) throw new Error(userError);

      set({ user: userData, isLoading: false });

      return { success: true };
    } catch (error) {
      const errorMessage = (error as Error).message;

      set({ error: errorMessage, isLoading: false });

      return { success: false, error: errorMessage };
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      await logOut();
      set({ user: null, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));
