import React, { ReactNode } from "react";

import cn from "@/utils/classnames";

export const FieldLabel: React.FC<{
  children: ReactNode;
  float?: "left" | "right";
}> = ({ children, float = "left" }) => {
  return (
    <span
      className={cn("text-base", {
        "label-text": float === "left",
        "label-text-alt": float === "right",
      })}
    >
      {children}
    </span>
  );
};

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ value, placeholder, type, className, ...props }, ref): JSX.Element => {
    const classes = cn("input input-bordered", className);
    return (
      <input
        {...props}
        ref={ref}
        type={type}
        value={value}
        placeholder={placeholder}
        className={classes}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
