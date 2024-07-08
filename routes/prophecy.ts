import { Router, Request, Response, NextFunction } from "express";
import pug from "pug";

// type declaration for our Prophecies
type Prophecy = {
  id: number;
  title: string;
  description: string;
};

// state
const prophecies: Prophecy[] = [{
  "id": 1,
  "title": "Grow Buildings",
  "description": "Building will be grown from genetically modified seeds."
}, {
  "id": 2,
  "title": "Mind Interface",
  "description": "Humans will one day directly interface computers with thought."
}];

const router = Router();

let prophecy_indexer = prophecies.length;

// create API
router.post("/create", (req: Request, res: Response, next: NextFunction) => {
  const { title, description } = req.query;

  // increase ID as we add more
  const id = ++prophecy_indexer;
  prophecies.push({
    id,
    title: title as string,
    description: description as string,
  });

  res.send(`create successful ID: ${id}`);
});

// // list (read) API
// router.get("/list", (req: Request, res: Response, next: NextFunction) => {
//   res.send(prophecies);
// });

router.get("/list", (req: Request, res: Response, next: NextFunction) => {
	// note the file path to the pug file is not relative to 
	// the file that is declaring the statement. It is relative
	// to the entry file, or the file executed with ts-node.
  const html = pug.renderFile("./templates/list.pug", { prophecies });
  res.send(html)
});

// detail (read) API
router.get("/:id/detail", (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const prophecy = prophecies.find(p => p.id === id);
  res.send(prophecy);
});

// update API
router.get("/:id/update", (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const prophecy = prophecies.find(p => p.id === id);
  
  const title: string = req.body.title as string;
  const description: string = req.body.description as string;

  if (prophecy) {
    prophecy.title = title;
    prophecy.description = description;
  }
  res.send(prophecy);
});

// delete API
router.delete("/:prophecy_id/delete", (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.prophecy_id);
  const index: number = prophecies.findIndex(p => p.id === id);
  if (index !== -1) {
    prophecies.splice(index, 1);
  }
  res.send();
});

export default router;