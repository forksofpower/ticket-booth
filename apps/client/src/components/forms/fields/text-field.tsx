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
      <label className="label pt-0">
        <span className="text-base label-text">{label}</span>
      </label>
      <input
        type={type || "text"}
        placeholder={placeholder}
        className={cx("input input-bordered focus:input-primary", {
          "input-error": error,
        })}
        {...register}
        {...props}
      />
      <label className="label py-1">
        <span className="label-text-alt"></span>
        <p className="label-text-alt text-error min-h-[1rem]">
          {error?.message && error.message}
        </p>
      </label>
    </div>
  );
};
