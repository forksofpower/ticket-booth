import cx from "classnames";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export const TextField: React.FC<{
  field: string;
  label: string;
  register: UseFormRegisterReturn;
  placeholder?: string;
  type?: "text" | "password";
  error?: FieldError;
}> = ({ error, field, label, placeholder, type, register, ...props }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="text-base label-text">{label}</span>
      </label>
      <input
        type={type || "text"}
        placeholder={placeholder || label}
        className={cx("input input-bordered focus:input-primary", {
          "input-error": error,
        })}
        {...register}
        {...props}
      />
      {error?.message && (
        <label className="label">
          <span className="label-text-alt text-error">{error.message}</span>
        </label>
      )}
    </div>
  );
};
