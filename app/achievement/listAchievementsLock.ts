import { Request, Response, NextFunction } from "express";
import { Achievement } from "../../models";
import { RedisSeqLock, redisClient } from "../utils";


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

export {
  listAchievementsLock,
}