import { supabase } from "..";

export const getUser = async () => {
  const userData = await supabase.auth.getUser();

  return userData;
};
