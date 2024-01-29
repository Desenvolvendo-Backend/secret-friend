import { Router } from "express";
import * as auth from "../controllers/auth";
import * as events from "../controllers/events";

const router = Router();

router.post("/login", auth.login);

router.get("/ping", auth.validade, (req, res) =>
  res.json({ pong: true, admin: true })
);

router.get("/events", auth.validade, events.getAll);
router.get("/events/:id", auth.validade, events.getEvent);
router.post("/events", auth.validade, events.addEvent);
router.put("/events/:id", auth.validade, events.updateEvent);
router.delete("/events/:id", auth.validade, events.deleteEvent)

export default router;
