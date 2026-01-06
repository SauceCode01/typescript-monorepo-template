import express from "express";
import { tokenParser } from "./middlewares/tokenParser.js";
import cors from "cors";
import { rateLimiter } from "./middlewares/rateLimiter.js";

import cookieParser from "cookie-parser";
import { userProfileMiddleware } from "./modules/user/userProfile.middleware.js";
import { userRoleMiddleware } from "./modules/user/userRole.middleware.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import { userRouter } from "./modules/user/user.route.js";
import { questionSystemRouter } from "./modules/questionSystem/questionSystem.route.js";
import { tokenSystemRouter } from "./modules/tokenSystem/tokenSystem.route.js";

const app = express();
const port = process.env.PORT || 8000;

// CORS config
app.use(
  cors({
    origin: [
      process.env.DEV_MODE === "true" && "http://localhost:3000",
      "https://gdg-webdev.vercel.app",
    ],
    credentials: true,
  })
);

// Cors config
// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     credentials: true,
//   })
// );

app.use(loggerMiddleware.pino);

// Rate limiting
app.use(rateLimiter);

// Parsing body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("query parser", "extended");

// Parsing headers
app.use(cookieParser());
app.use(tokenParser);
app.use(userProfileMiddleware.userParser);
app.use(userRoleMiddleware.userParser);

// Routes
app.use("/api/users", userRouter.getRouter());
app.use("/api/question-system", questionSystemRouter.getRouter());
app.use("/api/token-system", tokenSystemRouter.getRouter());
// app.use("/api/stats", statRouter);
// app.use("/api/tokens", getTokenApiRouter());
// app.use("/api/wallets", getWalletApiRouter());
// app.use("/api/questions", questionApiRouter);
// app.use("/api/study-jams", studyJamRouter);
// app.use("/api/announcements", announcementRouter);
// app.use("/api/spark-wallets", sparkWalletRouter);
// app.use("/api/spark-tokens", sparkTokenRouter);

// app.use("/api/test-endpoint", (req, res) => {
//   res.json({ success: true, message: "testing route", data: null });
// });

app.use("/api/test-endpoint", (req, res) => {
  // res.json({ success: true, message: "testing route", data: null });
  throw new Error("Simulated error for testing purposes."); //
});

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
