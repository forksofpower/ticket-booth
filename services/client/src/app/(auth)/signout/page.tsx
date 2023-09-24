"use client";
import { useEffect } from "react";

import useAuth from "@/hooks/use-auth";

export default function Signout() {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, [signOut]);

  return;
}
