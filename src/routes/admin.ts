import { Router } from "express";
import * as auth from "../controllers/auth";
import * as events from "../controllers/events";
import * as groups from "../controllers/groups";

const router = Router();

router.post("/login", auth.login);

router.get("/ping", auth.validade, (req, res) =>
  res.json({ pong: true, admin: true })
);

//event routes
router.get("/events", auth.validade, events.getAll);
router.get("/events/:id", auth.validade, events.getEvent);
router.post("/events", auth.validade, events.addEvent);
router.put("/events/:id", auth.validade, events.updateEvent);
router.delete("/events/:id", auth.validade, events.deleteEvent)

//groups routes
router.get("/events/:id_event/groups", auth.validade, groups.getAll)
router.get("/events/:id_event/groups/:id", auth.validade, groups.getGroup)

export default router;
