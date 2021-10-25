import express, { NextFunction, Request, Response } from "express";
import { json, urlencoded } from "body-parser";
import container from "./container";
import { router as eventsRouter } from "./routes/event/routes";

const app = express();
app.enable("trust proxy");

// to parse: application/json
app.use(json({ limit: "50mb" }));
// to parse: application/x-www-urlencoded
app.use(urlencoded({ limit: "50mb", extended: true }));

app.use((req: Request, _: Response, next: NextFunction) => {
  req.scope = container.createScope();
});

app.use(`/events`, eventsRouter);

app.use((_req, res) =>
  res.status(404).json({ code: 404, message: "Endpoint not exist" })
);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(400).json({ message: err.message });
});

app.listen(4200);
