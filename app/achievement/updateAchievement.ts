import { Request, Response, NextFunction } from "express";
import { Achievement } from "../../models";

const updateAchievement = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.achievement_id);
  const achievement = await Achievement.findByPk(id);

  await achievement?.update({
    title: req.body.title as string,
    description: req.body.description as string,
  });

  res.send(achievement);
};

export {
  updateAchievement,
};
