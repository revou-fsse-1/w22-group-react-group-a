import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://akfwiusfyfqzmghqgeca.supabase.co/";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrZndpdXNmeWZxem1naHFnZWNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkwMDA5MDksImV4cCI6MjAwNDU3NjkwOX0.hvEjvNeboWZLev3xHSyPLPSbqd6a5X-mv3ByoD0nZ2g";
export const supabase = createClient(supabaseUrl, supabaseKey);
