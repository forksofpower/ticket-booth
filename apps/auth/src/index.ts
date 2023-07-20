import express from "express";
import "express-async-errors";
import { routes } from "./routes/";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());

app.use(routes);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
