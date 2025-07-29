import express, { Application } from "express";
import morgan from "morgan";
import { setupSwagger } from "./docs/swagger";
import cookieParser from "cookie-parser";
import ApiError from "./shared/utils/ApiError";
import userRoutes from "./features/users/user.routes";
import API_PATHS from "./shared/config/apiPaths";
import errorHandler from "./middlewares/errorHandler";
import authRoutes from "./features/auth/auth.routes";

const app: Application = express();

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(morgan("tiny"));
app.use(morgan("dev"));

setupSwagger(app);

app.get("/", (_req, res) => {
    res.status(200).json({
        message: "👋 Hello, welcome to the API!",
        status: "success",
        description: "You've reached the root of our backend API. Everything is running smoothly 🚀",
        timestamp: new Date().toISOString(),
        docs: `http://localhost:${process.env.PORT}/api-docs`,
        version: "v1.0.0"
    });
});
app.use(API_PATHS.AUTH, authRoutes);
app.use(API_PATHS.USERS, userRoutes);

app.all('*all', (req, _res, next) => {
    next(new ApiError(404, `Cannot find ${req.originalUrl} on this server`));
});
app.use(errorHandler);

export default app;
