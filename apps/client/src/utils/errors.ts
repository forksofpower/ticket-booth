import { FieldErrors } from "react-hook-form";

import { ErrorResponseData } from "@/types/response-error-data";

export function normalizeErrorResponsesByField(
  responseErrors: ErrorResponseData["errors"],
) {
  return responseErrors.reduce<FieldErrors>((acc, e) => {
    if (e.field) {
      acc[e.field as string] = {
        message: e.message,
        type: "validate",
      };
    }
    return acc;
  }, {});
}
