import express from "express";
import { connectDB } from "./config/connectDB";
import router from "./routes";

const server = express();

connectDB();

server.use(express.json());
server.use("/api", router);

export default server;
