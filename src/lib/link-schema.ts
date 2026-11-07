import { z } from "zod";

export const linkSchema = z.object({
  title: z.string().trim().min(1, "링크 제목을 입력해 주세요.").max(100, "제목은 100자 이내로 입력해 주세요."),
  url: z.string().trim().min(1, "URL을 입력해 주세요.").refine((value) => {
    try {
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol)
        || (url.protocol === "mailto:" && z.email().safeParse(decodeURIComponent(url.pathname)).success);
    } catch {
      return false;
    }
  }, "http://, https:// 주소 또는 올바른 mailto: 이메일 주소를 입력해 주세요."),
  description: z.string().trim().max(300, "설명은 300자 이내로 입력해 주세요."),
  icon: z.enum(["Globe", "FolderGit2", "BookOpen", "Coffee", "Send", "Sparkles"], { error: "목록에서 아이콘을 선택해 주세요." }),
  category: z.string().trim().max(20, "카테고리는 20자 이내로 입력해 주세요."),
  badge: z.string().trim().max(20, "배지는 20자 이내로 입력해 주세요."),
});

export type LinkFormValues = z.infer<typeof linkSchema>;
