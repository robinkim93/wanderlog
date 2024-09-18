import { supabase } from "..";

export const googleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: "/",
    },
  });

  return { data, error };
};

export const logOut = async () => {
  const { error } = await supabase.auth.signOut();

  return { error };
};

export const getUser = async () => {
  const userData = await supabase.auth.getUser();

  return userData;
};
