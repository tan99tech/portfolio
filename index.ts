import express from "express";
import public_router from "./routes/public";

const HTTP_PORT: number = 8181;
const app: express.Express = express();

app.use("/", public_router);

app.listen(HTTP_PORT, () => {
  console.log(`server listening on ${HTTP_PORT}`);
});
