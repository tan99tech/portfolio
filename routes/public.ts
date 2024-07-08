import { Router, Request, Response, NextFunction } from "express";
import state from "../state";

const router = Router();

const retrieve_controller = (req: Request, res: Response, next: NextFunction) => {
  res.send(`Current value is: ${state.value}`);
};

// replace app with router here
// note the path is also shorter
router.get("/retrieve", retrieve_controller);

export default router;