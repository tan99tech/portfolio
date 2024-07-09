import { Router, Request, Response, NextFunction } from "express";
import pug from "pug";
import Achievement from "../models/achievement";
import RedisSeqLock from "../utils/redisSeqLock";
import redisClient from "../utils/redis";

const router = Router();

const home_controller = async(req: Request, res: Response, next: NextFunction) => {
  const achievements = await Achievement.findAll({});
  const html = pug.renderFile("./templates/home.pug", { achievements });
  res.send(html);
};

const list_achievements = async (req: Request, res: Response, next: NextFunction) => {
  const achievements = await Achievement.findAll({});
  res.send(achievements);
};

const list_achievements_lock = async (req: Request, res: Response, next: NextFunction) => {
  const redisSeqLock = new RedisSeqLock(redisClient);
  const achievements = await redisSeqLock.read(
    async () => {
      return await Achievement.findAll({});
    }
  );
  res.send(achievements);
};

// replace app with router here
// note the path is also shorter
router.get("/", home_controller);
router.get("/achievements", list_achievements);
router.get("/achievements_lock", list_achievements_lock);

export default router;