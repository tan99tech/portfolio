import { Request, Response, NextFunction } from "express";
import { Achievement } from "../../models";

const addAchievement = async (req: Request, res: Response, next: NextFunction) => {
  const { file, body: {title, description, achievedDate} } = req;

  const achievement = await Achievement.create({ title, description, achievedDate, imagePath: file?.path });

  res.send(achievement);
};

export {
  addAchievement,
};
