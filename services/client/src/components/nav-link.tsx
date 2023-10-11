"use client";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import cn from "@/utils/classnames";

function NavLink(props: { href: Route; children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <Link
      className={cn({
        active: pathname == props.href,
      })}
      href={props.href}
    >
      {props.children}
    </Link>
  );
}

export default NavLink;
