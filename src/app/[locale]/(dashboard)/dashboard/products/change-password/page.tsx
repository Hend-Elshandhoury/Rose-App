


import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { ChangePasswordForm } from "@/features/profile/components/change-password-form";

export default async function ChangePasswordPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="p-6 md:p-8 ">
      <ChangePasswordForm />
    </div>
  );
}