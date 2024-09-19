import { supabase } from "@/supabase";
import { prisma } from "..";

export const POST = async () => {
  let status: boolean;
  const userSession = await supabase.auth.getSession();

  if (!userSession.data.session) return { data: null, status: false };

  const { provider } = userSession.data.session.user.app_metadata;
  const { id: oAuthId } = userSession.data.session.user;
  const { avatar_url, full_name, email } =
    userSession.data.session.user.user_metadata;

  const data = await prisma.users.create({
    data: {
      user_name: full_name,
      email,
      oauth_id: oAuthId,
      oauth_provider: provider,
      avatar_url,
      nickname: full_name,
    },
  });

  return { data, status: true };
};
