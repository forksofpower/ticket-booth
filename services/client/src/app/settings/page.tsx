"use client";
import React from "react";

import TitleCard from "@/components/cards/TitleCard";
import ThemeToggle from "@/components/theme/theme-toggle";

type SettingsPageProps = {};

const SettingsPage = (props: SettingsPageProps) => {
  return (
    <TitleCard topMargin={"mt-0"} title="Settings">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base">UI Theme</span>
          </label>
          <ThemeToggle />
        </div>
      </div>
    </TitleCard>
  );
};

export default SettingsPage;
