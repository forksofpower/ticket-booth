import express from "express";

const router = express.Router();

interface HealthCheckResponse {
  uptime: number;
  responseTime: [number, number];
  message: string | unknown;
  timestamp: number;
}

router.get("/health", (req, res) => {
  const response: HealthCheckResponse = {
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: "OK",
    timestamp: Date.now(),
  };
  try {
    res.send(response);
  } catch (e) {
    response.message = e;
    res.status(503).send();
  }
});

export { router as healthCheck };
