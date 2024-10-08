import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Database, Tables } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnon);

export type UsersTable = Tables<"users">;
