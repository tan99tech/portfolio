import express from "express";
import path from "path";
import public_router from "./routes/public";
import admin_router from "./routes/admin";

const HTTP_PORT: number = 8181;
const app: express.Express = express();

app.use("/", public_router);
app.use("/admin", admin_router);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(HTTP_PORT, () => {
  console.log(`server listening on ${HTTP_PORT}`);
});
