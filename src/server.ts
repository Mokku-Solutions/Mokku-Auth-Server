import express from "express";
import { connectDB } from "./config/connectDB";
import router from "./routes";
import path from "path";
import cors from "cors"

const server = express();

connectDB();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "public")));
server.use(cors())
server.use("/api", router);

export default server;
