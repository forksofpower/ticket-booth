"use client";

import { Route } from "next";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useCurrentUser } from "@/contexts/current-user";
import { routes } from "@/routes";

const excludedRoutes = [routes.signin(), routes.register(), routes.signout()];

interface RequireAuthProps {
  children: React.ReactNode;
}
export default function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const path = usePathname();

  const { currentUser: user } = useCurrentUser();

  useEffect(() => {
    if (!user && !excludedRoutes.includes(path as Route)) {
      router.push(routes.signin(path));
    }
  });
  return <>{children}</>;
}
