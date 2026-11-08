"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { profileSchema, type ProfileFormValues } from "@/lib/display-name";
import { DisplayNameTakenError, type UserProfile } from "@/lib/user-profile";
import { useProfileEditor } from "@/hooks/useProfileEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function ProfileEditForm({ uid, profile, onSaved, onCancel, onBusy }: { uid: string; profile: UserProfile; onSaved: (name: string) => void; onCancel: () => void; onBusy: (busy: boolean) => void }) {
  const { register, getValues, handleSubmit, setError, clearErrors, trigger, formState: { errors, isSubmitting } } = useForm<ProfileFormValues>({ resolver: zodResolver(profileSchema), defaultValues: { displayName: profile.displayName, bio: profile.bio }, mode: "onSubmit", reValidateMode: "onChange" });
  const { check: checkName, save: saveName } = useProfileEditor(uid);
  const checking = checkName.isPending;
  const [checkedName, setCheckedName] = useState("");
  const [message, setMessage] = useState("");
  const request = useRef(0);
  const busy = checking || isSubmitting;
  const field = register("displayName");

  async function check() {
    if (!(await trigger("displayName"))) return;
    const name = getValues("displayName").trim();
    const sequence = ++request.current;
    onBusy(true); setMessage(""); setCheckedName(""); clearErrors("root");
    try {
      const available = await checkName.mutateAsync(name);
      if (request.current !== sequence) return;
      if (available) { setCheckedName(name); setMessage("사용할 수 있는 표시 이름이에요."); clearErrors("displayName"); }
      else setError("displayName", { message: "이미 사용 중인 표시 이름이에요." });
    } catch { if (request.current === sequence) setError("root", { message: "중복 확인에 실패했어요. 다시 시도해 주세요." }); }
    finally { onBusy(false); }
  }

  async function save(values: ProfileFormValues) {
    if (values.displayName !== profile.displayName && values.displayName !== checkedName) { setError("displayName", { message: "표시 이름 중복 확인을 먼저 해 주세요." }, { shouldFocus: true }); return; }
    clearErrors("root"); onBusy(true);
    try { const saved = await saveName.mutateAsync(values); onSaved(saved.displayName); }
    catch (error) {
      if (error instanceof DisplayNameTakenError) { setCheckedName(""); setMessage(""); setError("displayName", { message: "다른 사용자가 먼저 사용했어요. 다른 이름을 입력해 주세요." }, { shouldFocus: true }); }
      else setError("root", { message: "프로필 저장에 실패했어요. 다시 시도해 주세요." });
    } finally { onBusy(false); }
  }

  return (
    <form noValidate onSubmit={handleSubmit(save)} aria-busy={busy} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="profile-display-name">표시 이름</Label>
        <div className="flex gap-2">
          <Input id="profile-display-name" {...field} onChange={(event) => { request.current++; setCheckedName(""); setMessage(""); clearErrors("root"); void field.onChange(event); }} disabled={busy} aria-invalid={Boolean(errors.displayName)} aria-describedby="profile-name-help profile-name-result" className="h-12 rounded-[12px] border-[#E5E8EB] bg-[#F9FAFB]" />
          <Button type="button" variant="outline" onClick={check} disabled={busy} className="h-12 rounded-[12px] border-[#E5E8EB]">{checking ? <LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" /> : null}중복 확인</Button>
        </div>
        <p id="profile-name-help" className="text-xs leading-relaxed text-[#6B7684]">한글·영문·숫자·밑줄·하이픈 2~20자. 영문 대소문자는 구분하지 않아요.</p>
        <div id="profile-name-result" aria-live="polite">{errors.displayName ? <p role="alert" className="text-sm text-[#F04452]">{errors.displayName.message}</p> : message ? <p className="text-sm text-[#3182F6]">{message}</p> : null}</div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="profile-bio">소개글</Label>
        <Textarea id="profile-bio" {...register("bio")} disabled={busy} aria-invalid={Boolean(errors.bio)} aria-describedby="profile-bio-help profile-bio-error" placeholder="나를 소개하는 글을 적어 주세요" className="min-h-28 rounded-[12px] border-[#E5E8EB] bg-[#F9FAFB]" />
        <p id="profile-bio-help" className="text-xs text-[#6B7684]">최대 300자까지 입력할 수 있어요.</p>
        <div id="profile-bio-error" aria-live="polite">{errors.bio && <p role="alert" className="text-sm text-[#F04452]">{errors.bio.message}</p>}</div>
      </div>
      <div className="space-y-1"><p className="text-sm font-medium">이메일</p><p className="break-all text-sm text-[#6B7684]">{profile.email}</p><p className="text-xs text-[#8B95A1]">Google 계정 이메일은 여기서 변경할 수 없어요.</p></div>
      {errors.root && <p role="alert" className="text-sm text-[#F04452]">{errors.root.message}</p>}
      <div className="flex gap-3">
        <Button type="button" variant="secondary" disabled={busy} onClick={onCancel} className="h-12 flex-1 rounded-[14px]">취소</Button>
        <Button type="submit" disabled={busy} className="h-12 flex-1 rounded-[14px] bg-[#3182F6] text-white hover:bg-[#1B64CE]">{isSubmitting ? <LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" /> : null}{isSubmitting ? "저장 중…" : "저장하기"}</Button>
      </div>
    </form>
  );
}

export default function EditProfileDialog({ uid, profile, open, onOpenChange }: { uid: string; profile: UserProfile; open: boolean; onOpenChange: (open: boolean) => void }) {
  const [busy, setBusy] = useState(false);
  return (
    <Dialog open={open} onOpenChange={(value) => { if (!busy) onOpenChange(value); }}>
      <DialogContent showCloseButton={!busy} className="max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[24px] bg-white p-6 text-[#191F28] sm:max-w-[440px]">
        <DialogHeader><DialogTitle className="text-xl font-bold">프로필 수정</DialogTitle><DialogDescription>표시 이름과 소개글로 나를 표현해 보세요.</DialogDescription></DialogHeader>
        {open && <ProfileEditForm uid={uid} profile={profile} onSaved={() => onOpenChange(false)} onCancel={() => onOpenChange(false)} onBusy={setBusy} />}
      </DialogContent>
    </Dialog>
  );
}
