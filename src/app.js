const express = require("express");
const recipesRouter = require("./routes/recipes_route");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get("/api/health", (req, res) => {
    return res.status(200).json({ status: "ok" });
});


app.use("/api/recipes", recipesRouter);

module.exports = app;


