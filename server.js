import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const PORT = 5000 || process.env.PORT;
app.get("/", (req, res) => res.send("hello"));

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
