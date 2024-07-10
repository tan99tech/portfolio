import { Request, Response, NextFunction } from "express";
import { Achievement } from "../../models";

const listAchievements = async (req: Request, res: Response, next: NextFunction) => {
  const achievements = await Achievement.findAll({
    order: [['achievedDate', 'DESC']],
  });
  res.send(achievements);
};

export {
  listAchievements,
}