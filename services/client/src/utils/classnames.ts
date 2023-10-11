import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Returns a string of concatenated class names based on the input values.
 * @param inputs - An array of class names or class name objects.
 * @returns A string of concatenated class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export default cn;
