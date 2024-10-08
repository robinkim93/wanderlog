import { supabase } from "..";
import * as bcrypt from "bcrypt";
import { getUser } from "../user";

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

export const signUp = async ({
  email,
  password,
  name,
  nickname,
}: {
  email: string;
  password: string;
  name: string;
  nickname: string;
}) => {
  try {
    const { data: existingEmail, error: emailError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (emailError) throw emailError;
    if (existingEmail) return { data: null, error: "exist email" };

    const { data: existingNickname, error: nicknameError } = await supabase
      .from("users")
      .select("*")
      .eq("nickname", nickname)
      .maybeSingle();

    if (nicknameError) throw nicknameError;
    if (existingNickname) return { data: null, error: "duplicated nickname" };

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nickname, name, email } },
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error("Sign up error:", error);
    return { data: null, error: (error as Error).message };
  }
};

export const logIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const { data: userData, error: dbError } = await supabase
      .from("users")
      .select()
      .eq("email", email)
      .is("deleted_at", null)
      .single();

    if (dbError) throw new Error("User data not found");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    return { data, error };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};

export const logOut = async () => {
  const { error } = await supabase.auth.signOut();

  return { error };
};

export const deleteUser = async () => {
  try {
    const { data: userData } = await getUser();

    if (!userData) throw new Error("not login");

    const { data, error } = await supabase
      .from("users")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", userData.id);

    return { data, error };
  } catch (error) {
    console.error(error);
    return { data: null, error };
  }
};
