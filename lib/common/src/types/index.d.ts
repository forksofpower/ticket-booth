export {};

declare global {
  namespace Express {
    interface Request {
      documents?: Record<string, unknown>;
    }
  }
}
