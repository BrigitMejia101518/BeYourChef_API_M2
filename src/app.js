import express from "express";
import recipesRouter from "./routers/recipes_router.js";
import cors from "cors"; 
import authRouter from "./routers/auth_router.js";

const app = express();

app.use(cors());
app.use(express.json());



app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get("/api/health", (req, res) => {
    return res.status(200).json({ status: "ok" });
});


app.use("/api/recipes", recipesRouter);
app.use("/api/auth", authRouter);


export default app;