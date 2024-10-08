import { supabase } from "..";

export const getUser = async () => {
  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError) throw new Error("Authentication failed");
    if (!authData.user) throw new Error("User not found");

    const { data: userData, error: dbError } = await supabase
      .from("users")
      .select()
      .eq("id", authData.user.id)
      .is("deleted_at", null)
      .single();

    if (dbError) throw new Error("User data not found");

    return { data: userData, error: null };
  } catch (error) {
    return {
      data: null,
      error: (error as Error).message,
    };
  }
};
