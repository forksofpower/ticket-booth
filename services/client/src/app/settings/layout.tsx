import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import NavLink from "@/components/nav-link";

type Props = {
  children: React.ReactNode;
};

const settingsMenuItems = [
  {
    label: "General",
    href: "/settings",
  },
  {
    label: "Notifications",
    href: "#",
    // href: "/settings/notifications",
  },
  {
    label: "Security",
    href: "#",
    // href: "/settings/security",
  },
  {
    label: "Billing",
    href: "#",
    // href: "/settings/billing",
  },
  {
    label: "Integrations",
    href: "#",
    // href: "/settings/integrations",
  },
  // {
  //   label: "API",
  //   href: "/settings/api",
  // },
  // {
  //   label: "Export",
  //   href: "/settings/export",
  // },
  // {
  //   label: "Delete Account",
  //   href: "/settings/delete-account",
  // },
];

const SettingsLayout = ({ children }: Props) => {
  return (
    <div className="page-container mx-auto flex">
      <ul className="menu mr-6 min-h-[30vh] w-56">
        <li>
          <h2 className="menu-title">Settings</h2>
          <ul>
            {settingsMenuItems.map((item) => (
              <li key={item.href + "_" + item.label}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <div className="flex-auto">{children}</div>
    </div>
  );
};

export default SettingsLayout;
