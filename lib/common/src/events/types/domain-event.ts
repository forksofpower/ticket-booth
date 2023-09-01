import { Subjects } from "../subjects";

export type DomainEvent<T extends Subjects, Q = any> = {
  subject: T;
  data: Q;
};
