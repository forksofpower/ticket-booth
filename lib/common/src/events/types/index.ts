export { OrderStatus } from "./order-status";
import { Subjects } from "./subjects";

export interface Versionable {
  version: number;
}

export type DomainEvent<T extends Subjects, Q = any> = {
  subject: T;
  data: Q;
};

export * from "./subjects";
