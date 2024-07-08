import express from "express";
import admin_router from "./routes/admin";
import public_router from "./routes/public";
import prophecy_router from "./routes/prophecy";

const HTTP_PORT: number = 8181;
const app: express.Express = express();

app.use("/prophecy", prophecy_router);
app.use("/admin", admin_router);
app.use("/public", public_router);

app.listen(HTTP_PORT, () => {
  console.log(`server listening on ${HTTP_PORT}`);
});
