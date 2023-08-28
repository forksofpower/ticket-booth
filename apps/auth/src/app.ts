import 'express-async-errors';

import cookieSession from 'cookie-session';
// 3rd Party
import express from 'express';

// Errors
import { NotFoundError } from './errors/not-found-error';
// Middleware
import { errorHandler } from './middleware/error-handler';
import { routes } from './routes/';

// Configure Auth Application
const app = express();
// Allow traffic from nginx proxy
app.set("trust proxy", true);
// Request JSON body support
app.use(express.json());
// Configure Session with cookie support
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
// Configure Routes
app.use(routes);
// Configure Catch-All Route
app.all("*", async (req, res) => {
  throw new NotFoundError();
});
// Configure Error Handling
app.use(errorHandler);

export { app };
