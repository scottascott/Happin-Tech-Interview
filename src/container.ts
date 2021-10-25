import { asClass, AwilixContainer, createContainer } from "awilix";
import { EventService } from "./routes/event/services/event-service";

declare global {
  namespace Express {
    interface Request {
      scope: AwilixContainer;
    }
  }
}
const container = createContainer();

container.register({
  eventsService: asClass(EventService),
});

export default container;
