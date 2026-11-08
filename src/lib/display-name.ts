import { z } from "zod";

export const displayNameSchema = z.string().trim()
  .min(2, "표시 이름은 2자 이상 입력해 주세요.")
  .max(20, "표시 이름은 20자 이내로 입력해 주세요.")
  .regex(/^[가-힣a-zA-Z0-9_-]+$/, "한글·영문·숫자·밑줄·하이픈만 사용할 수 있어요.");

export const profileSchema = z.object({ displayName: displayNameSchema, bio: z.string().trim().max(300, "소개글은 300자 이내로 입력해 주세요.") });
export type ProfileFormValues = z.infer<typeof profileSchema>;
export function displayNameKey(name: string) {
  return displayNameSchema.parse(name).toLowerCase();
}
