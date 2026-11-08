import type { QueryClient } from "@tanstack/react-query";
import { userKeys } from "@/lib/query-keys";

export function clearUserCache(client: QueryClient, uid: string) {
  const key = userKeys.all(uid);
  void client.cancelQueries({ queryKey: key });
  client.removeQueries({ queryKey: key });
  client.getMutationCache().findAll({ mutationKey: key }).forEach((mutation) => client.getMutationCache().remove(mutation));
}
