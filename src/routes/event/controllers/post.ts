import { NextFunction, Request, Response } from "express";
import { EventService } from "../services/event-service";

export const crawl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventService = req.scope.cradle.eventService as EventService;
    const result = eventService.crawl(req.body.url);
    return res.json({ statusCode: 200, data: { ...result } });
  } catch (err) {
    return next(err);
  }
};
