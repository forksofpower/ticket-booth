import { ComponentProps, FC } from "react";

import cn from "@/utils/classnames";

export type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface SVGIconProps extends ComponentProps<"svg"> {
  icon: FC<ComponentProps<"svg">>;
  size?: Size;
}

function Icon({
  icon: Icon,
  className = "",
  size = "md",
  ...props
}: SVGIconProps) {
  const classes = cn(className, {
    "w-3 h-3": size === "xs",
    "w-4 h-4": size === "sm",
    "w-5 h-5": size === "md",
    "w-6 h-6": size === "lg",
    "w-7 h-7": size === "xl",
    "w-8 h-8": size === "2xl",
  });
  return <Icon className={classes} {...props} />;
}

export default Icon;
