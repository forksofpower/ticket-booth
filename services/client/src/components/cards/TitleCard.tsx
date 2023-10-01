import cx from "classnames";
import React from "react";

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
      className={cx("text-xl font-semibold", {
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
      className={cx(
        "card w-full p-6 bg-base-100 shadow-xl",
        topMargin || "mt-6"
      )}
    >
      <Subtitle inline={!!TopSideButtons}>
        {title}
        {TopSideButtons && (
          <div className="inline-block float-right">{TopSideButtons}</div>
        )}
      </Subtitle>
      <div className="divider mt-2"></div>
      <div className="h-full w-full pb-6 bg-base-100">{children}</div>
    </div>
  );
};

export default TitleCard;
