import "reflect-metadata";
import "express-async-errors";
import express from "express";

import usersRoutes from "./routes/users.routes";
import loginRoute from "./routes/login.routes";
import modulesRoutes from "./routes/modules.routes";

import verifyErrorMiddleware from "./middlewares/verifyError.middleware";
import classesRoutes from "./routes/classes.routes";

const app = express();

app.use(express.json());
app.use("/users", usersRoutes);
app.use("/login", loginRoute);
app.use("/modules", modulesRoutes)
app.use("/classes", classesRoutes)

app.use(verifyErrorMiddleware);

export default app;
