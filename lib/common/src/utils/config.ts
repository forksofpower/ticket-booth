// get environment variable or die trying
export function getEnv(key: string) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} must be defined`);
  }
  return value;
}
