require("dotenv").config();
const app = require("./app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 3000;

async function initServer() {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
}

initServer();