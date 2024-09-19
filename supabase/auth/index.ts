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

  // await oAuthSignUp();

  return { data, error };
};

export const logOut = async () => {
  const { error } = await supabase.auth.signOut();

  return { error };
};
