import { Router, Request, Response, NextFunction } from "express";
import state from "../state";

const router = Router();

const increment_controller = (req: Request, res: Response, next: NextFunction) => {
	// we need to cast the input as it is typed as other things
  const by_amount = parseInt(req.query.amount as string);
  state.value = state.value + by_amount;
  res.send(`Value incremented by ${by_amount}`);
};

// replace app with router here
// note the path is also shorter
router.get("/increment", increment_controller);

export default router;