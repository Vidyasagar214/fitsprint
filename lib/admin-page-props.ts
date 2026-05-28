import { getAuthContext } from "@/lib/auth/profile";

export async function getAdminHeaderProps() {
  const { user, displayName } = await getAuthContext();
  return {
    displayName,
    email: user?.email ?? null,
  };
}
