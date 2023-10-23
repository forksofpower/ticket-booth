import React from "react";

type Props = {
  children: React.ReactNode;
};

const SettingsLayout = ({ children }: Props) => {
  return <div className="page-container">{children}</div>;
};

export default SettingsLayout;
