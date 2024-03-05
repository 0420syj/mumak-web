"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@repo/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        Moomin Money
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/moneybook"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/moneybook" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Moneybook
        </Link>
      </nav>
    </div>
  );
}
