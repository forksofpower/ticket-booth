import React, { useEffect } from "react";

import useAuth from "@/hooks/use-auth";

export const Signout = () => {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, [signOut]);

  return <div></div>;
};

export default Signout;
