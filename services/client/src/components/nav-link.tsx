"use client";

import cx from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink(props: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <Link
      className={cx({
        active: pathname == props.href,
      })}
      href={props.href}
    >
      {props.children}
    </Link>
  );
}

export default NavLink;
