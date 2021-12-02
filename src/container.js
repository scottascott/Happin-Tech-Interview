"use strict";
exports.__esModule = true;
var awilix_1 = require("awilix");
var event_service_1 = require("./routes/event/services/event-service");
var container = (0, awilix_1.createContainer)();
container.register({
    eventService: (0, awilix_1.asClass)(event_service_1.EventService)
});
exports["default"] = container;
