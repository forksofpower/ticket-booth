import React from "react";

import cn from "@/utils/classnames";

type Props = {
  title: string;
  children: React.ReactNode;
  topMargin?: string;
  TopSideButtons?: React.ReactNode;
};

const Subtitle = ({
  children,
  inline = false,
}: {
  children: React.ReactNode;
  inline?: boolean;
}) => {
  return (
    <h2
      className={cn("text-xl font-semibold", {
        "inline-block": inline,
      })}
    >
      {children}
    </h2>
  );
};

const TitleCard = ({ title, children, topMargin, TopSideButtons }: Props) => {
  return (
    <div
      className={cn(
        "card bg-base-100 w-full p-6 shadow-xl",
        topMargin || "mt-6"
      )}
    >
      <Subtitle inline={!!TopSideButtons}>
        {title}
        {TopSideButtons && (
          <div className="float-right inline-block">{TopSideButtons}</div>
        )}
      </Subtitle>
      <div className="divider mt-2"></div>
      <div className="bg-base-100 h-full w-full pb-6">{children}</div>
    </div>
  );
};

export default TitleCard;
