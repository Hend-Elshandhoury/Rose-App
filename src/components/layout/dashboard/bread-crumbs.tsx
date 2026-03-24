// components/breadcrumbs.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useResolveBreadcrumbLabels } from "@/hooks/use-resolve-breadcrumb-label";

const formatLabel = (text: string) =>
  text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0];
  const pathSegments = segments.slice(1).filter((seg) => seg !== "edit");

  // 👇 resolves any id segments to their entity names
  const resolvedLabels = useResolveBreadcrumbLabels(pathSegments);

  return (
    <Breadcrumb className="bg-transparent py-0">
      <BreadcrumbList className="flex-wrap gap-x-1 gap-y-1 sm:gap-x-1.5">
        {pathSegments.map((segment, index) => {
          const href =
            "/" + [locale, ...pathSegments.slice(0, index + 1)].join("/");
          const isLast = index === pathSegments.length - 1;

          const label = resolvedLabels[segment]
            ? `Update ${formatLabel(pathSegments[index - 1] ?? "")} : ${resolvedLabels[segment]}`
            : formatLabel(segment);

          return (
            <React.Fragment key={href}>
              {index !== 0 && <BreadcrumbSeparator key={`sep-${href}`} />}
              <BreadcrumbItem key={href}>
                {isLast ? (
                  <BreadcrumbPage className="max-w-[min(100vw-8rem,28rem)] truncate text-sm font-semibold text-maroon-700 capitalize dark:text-softPink-200 sm:text-base">
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={href}
                      className="capitalize text-xs text-zinc-500 hover:text-zinc-800 sm:text-sm dark:text-zinc-400 dark:hover:text-zinc-200"
                    >
                      {label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
