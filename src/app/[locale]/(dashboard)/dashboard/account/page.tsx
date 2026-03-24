import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { AccountSettingsForm } from "@/features/profile/components/account-settings-form";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="p-6 md:p-8 w-full mx-auto">
      <AccountSettingsForm user={session.user} />
    </div>
  );
}

