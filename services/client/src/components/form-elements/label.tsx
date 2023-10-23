import React from "react";

import cn from "@/utils/classnames";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  title?: string;
};

type LabelAltProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  float?: "left" | "right";
};
// eslint-disable-next-line react/display-name
export const LabelText = React.forwardRef<HTMLLabelElement, LabelAltProps>(
  ({ children, className, float = "left" }, ref) => {
    const classes = cn(
      "text-base-content block text-sm font-medium leading-6",
      className,
      float === "left" ? "label-text" : "label-text-alt"
    );
    return (
      <span ref={ref} className={classes}>
        {children}
      </span>
    );
  }
);

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className, title, ...props }, ref) => {
    return (
      <label {...props} className={cn("label", className)}>
        {title ? <LabelText ref={ref}>{title}</LabelText> : null}
        {children}
      </label>
    );
  }
);

Label.displayName = "Label";

export default Label;
