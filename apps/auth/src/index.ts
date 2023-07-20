import express from "express";
import { routes } from "./routes/";
import { errorHandler } from "./middleware/error-handler";
import expressListRoutes from "express-list-routes";

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());

app.use(routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
  console.log("serving routes:");
  expressListRoutes(app);
});
