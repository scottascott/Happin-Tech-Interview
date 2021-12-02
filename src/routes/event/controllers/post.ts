import { NextFunction, Request, Response } from "express";
import { EventService } from "../services/event-service";

export const crawl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventService = req.scope.cradle.eventService as EventService;
    const result = await eventService.crawl(req.body.url); //here should be an await
    return res.json({ statusCode: 200, data: { ...result } });
  } catch (err) {
    return next(err);
  }
};
