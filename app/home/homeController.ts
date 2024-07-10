import { Request, Response, NextFunction } from "express";
import pug from "pug";
import { Achievement } from "../../models";

const homeController = async(req: Request, res: Response, next: NextFunction) => {
  const achievements = await Achievement.findAll({
    order: [['achievedDate', 'DESC']],
  });
  const html = pug.renderFile("./templates/home.pug", { achievements });
  res.send(html);
};

export {
  homeController
}