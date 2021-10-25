import { Router } from "express";
import { body } from "express-validator";
import { crawl } from "./controllers/post";

const router = Router();

router.post("/crawl", body("url").exists().isURL(), crawl);

export { router };
