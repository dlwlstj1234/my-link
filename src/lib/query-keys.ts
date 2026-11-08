export const userKeys = {
  all: (uid: string) => ["user", uid] as const,
  links: (uid: string) => ["user", uid, "links"] as const,
  linkCounts: (uid: string) => ["user", uid, "link-clicks"] as const,
  profile: (uid: string) => ["user", uid, "profile"] as const,
  displayName: (uid: string, name: string) => ["user", uid, "display-name", name] as const,
};
