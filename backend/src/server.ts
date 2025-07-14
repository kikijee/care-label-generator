import express, { Express, Request, Response, NextFunction} from "express";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./models";
import handleUserRoutes from "./routes/user.route";
import handleAuthRoutes from "./routes/auth.route";
import handleLabelRoutes from "./routes/label.route";
import cookieParser = require("cookie-parser");


dotenv.config();
const corsOptions = { credentials: true, origin: true };

const app: Express = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

db.sequelize.sync({ force: true}).then(()=>{
  console.log("synced db");
}).catch((error:any)=>{
  console.log(`Failed to sync db: ${error}`);
})

app.use('/api/user', handleUserRoutes());
app.use('/api/auth', handleAuthRoutes());
app.use('/api/label', handleLabelRoutes());


app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found");
  res.status(404);
  next(error);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500);
  res.json({
    error: {
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
    },
  });
});






app.listen(port, () => {
  console.log(`[server]: Server is running at my http://localhost:${port}`);
});

