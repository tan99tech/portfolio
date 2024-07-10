import { Router, Request, Response, NextFunction } from "express";
import pug from "pug";
import { Achievement } from "../../models";
import RedisSeqLock from "../../utils/redisSeqLock";
import redisClient from "../../utils/redis";

const router = Router();

const homeController = async(req: Request, res: Response, next: NextFunction) => {
  const achievements = await Achievement.findAll({
    order: [['achievedDate', 'DESC']],
  });
  const html = pug.renderFile("./templates/home.pug", { achievements });
  res.send(html);
};

const listAchievements = async (req: Request, res: Response, next: NextFunction) => {
  const achievements = await Achievement.findAll({
    order: [['achievedDate', 'DESC']],
  });
  res.send(achievements);
};

const listAchievementsLock = async (req: Request, res: Response, next: NextFunction) => {
  const redisSeqLock = new RedisSeqLock(redisClient);
  const achievements = await redisSeqLock.read(
    async () => {
      return await Achievement.findAll({
        order: [['achievedDate', 'DESC']],
      });
    }
  );
  res.send(achievements);
};

// replace app with router here
// note the path is also shorter
router.get("/", homeController);
router.get("/achievements", listAchievements);
router.get("/achievements_lock", listAchievementsLock);

export default router;