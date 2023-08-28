export interface ErrorResponseData {
  errors: Array<{ message: string; field?: string }>;
}
