import { deleteOrderRouter } from "./delete";
import { listOrderRouter } from "./list";
import { createOrderRouter } from "./new";
import { showOrderRouter } from "./show";

export const routes = [
  createOrderRouter,
  showOrderRouter,
  listOrderRouter,
  deleteOrderRouter,
];
