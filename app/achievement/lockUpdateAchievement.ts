import { Request, Response, NextFunction } from "express";
import { RedisSeqLock, redisClient } from "../utils";
import { Achievement } from "../../models";

const lockUpdateAchievement = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.achievement_id);
  const redisSeqLock = new RedisSeqLock(redisClient);

  const updated_achievement = await redisSeqLock.write(
    async () => {
      let achievement = await Achievement.findByPk(id);
      if (achievement !== null) {
        return await achievement.update({
          title: req.body.title as string,
          description: req.body.description as string,
        });
      } else {
        return {};
      }
    }
  );

  res.send(updated_achievement);
}

export {
  lockUpdateAchievement,
};
