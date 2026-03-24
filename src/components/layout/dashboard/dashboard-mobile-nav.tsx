"use client";

import { CalendarHeart, ClipboardList, Flower, LayoutDashboard, Package } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/tailwind-merge";
import { useTranslations } from "next-intl";

/**
 * Fixed bottom tab bar — mobile / tablet only (below `lg`).
 * Matches Rose dashboard mobile pattern: Overview, Categories, FAB, Occasions, Products.
 */
export function DashboardMobileNav() {
  const pathname = usePathname();
  const t = useTranslations("dashboard-layout");

  const items = [
    {
      href: "/dashboard",
      label: t("overview"),
      icon: LayoutDashboard,
      isActive: (p: string) =>
        p === "/dashboard" || p === "/dashboard/",
    },
    {
      href: "/dashboard/categories",
      label: t("categories"),
      icon: ClipboardList,
      isActive: (p: string) => p.startsWith("/dashboard/categories"),
    },
    {
      href: "/dashboard/occasions",
      label: t("occasions"),
      icon: CalendarHeart,
      isActive: (p: string) => p.startsWith("/dashboard/occasions"),
    },
    {
      href: "/dashboard/products",
      label: t("products"),
      icon: Package,
      isActive: (p: string) => p.startsWith("/dashboard/products"),
    },
  ] as const;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 bg-white pb-[env(safe-area-inset-bottom,0px)] pt-2 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] dark:border-zinc-700 dark:bg-zinc-900 lg:hidden"
      aria-label="Dashboard"
    >
      <div className="relative mx-auto flex max-w-lg items-end justify-between gap-1 px-2 pb-2 pt-1">
        {items.slice(0, 2).map(({ href, label, icon: Icon, isActive }) => (
          <MobileTab
            key={href}
            href={href}
            label={label}
            icon={Icon}
            active={isActive(pathname)}
          />
        ))}

        {/* Center FAB — preview / home dashboard */}
        <div className="relative -mt-10 flex flex-1 justify-center px-1">
          <Link
            href="/dashboard"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-maroon-700 text-white shadow-lg ring-4 ring-white transition hover:bg-maroon-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-600 focus-visible:ring-offset-2 dark:bg-maroon-600 dark:ring-zinc-900"
            aria-label={t("preview")}
          >
            <Flower className="h-7 w-7" strokeWidth={1.5} aria-hidden />
          </Link>
        </div>

        {items.slice(2).map(({ href, label, icon: Icon, isActive }) => (
          <MobileTab
            key={href}
            href={href}
            label={label}
            icon={Icon}
            active={isActive(pathname)}
          />
        ))}
      </div>
    </nav>
  );
}

function MobileTab({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-semibold transition-colors sm:text-xs",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-600 focus-visible:ring-offset-2",
        active
          ? "bg-softPink-50 text-maroon-700 dark:bg-maroon-900/50 dark:text-softPink-200"
          : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200",
      )}
    >
      <Icon className="h-5 w-5 shrink-0" strokeWidth={active ? 2.25 : 1.75} aria-hidden />
      <span className="max-w-full truncate">{label}</span>
    </Link>
  );
}
