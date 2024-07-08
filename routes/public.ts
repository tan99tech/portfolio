import { Router, Request, Response, NextFunction } from "express";
import pug from "pug";

const router = Router();

const home_controller = (req: Request, res: Response, next: NextFunction) => {
  const html = pug.renderFile("./templates/home.pug");
  res.send(html);
};

// replace app with router here
// note the path is also shorter
router.get("/", home_controller);

export default router;