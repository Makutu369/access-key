import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import user from "./routes/userRoute.js";
import key from "./routes/keyRoute.js";
dotenv.config();

//db connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db connect success"))
  .catch((e) => console.log(e));

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
app.get("/", (req, res) => res.send("hello"));
app.use("/user", user);
app.use("/", key);
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
