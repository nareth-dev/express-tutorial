import express, { Application, Request, Response, NextFunction } from "express";
import { studentRouter } from "./routers/student_route";
import { userRoute } from "./routers/user_route";
import { movieRouter } from "./routers/movie.route";
import { globalError } from "./middlewares/global_error";
import { GlobalTime } from "./middlewares/GlobalTime";

const app = express();

// Glosbal Middleware function to log time for each request
app.use(express.json());
// Global Error Handler

app.use(GlobalTime);

// global route === sub route
app.use("/student", studentRouter);
app.use("/user", userRoute);
app.use("/movie", movieRouter);
app.use(globalError);


export default app;

