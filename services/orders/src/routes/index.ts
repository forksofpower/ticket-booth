import { listOrderRouter } from "./list";
import { createOrderRouter } from "./new";
import { showOrderRouter } from "./show";
import { updateOrderRouter } from "./update";

export const routes = [
  createOrderRouter,
  showOrderRouter,
  listOrderRouter,
  updateOrderRouter,
];
