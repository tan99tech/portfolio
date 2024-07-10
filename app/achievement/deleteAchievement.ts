import fs from "fs";
import { Request, Response, NextFunction } from "express";
import { Achievement } from "../../models";

const deleteAchievement = async (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.achievement_id);
  const achievement = await Achievement.findByPk(id);
  const path = achievement?.imagePath;
  if (path) {
    const filePath = `./${path}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting the file: ${err.message}`);
      }
    });
  }
  await achievement?.destroy();
  res.send(`delete successful ID: ${id}`);
};

export {
  deleteAchievement,
};
