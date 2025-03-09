import { api } from "~/utils/api";

export function useCurrentUserInfo() {
  const user = api.user.getInternalUserId.useQuery();
  return user;
}
