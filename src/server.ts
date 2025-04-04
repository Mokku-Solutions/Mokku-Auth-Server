import express from "express";
import { connectDB } from "./config/connectDB";
import router from "./routes";
import path from "path";

const server = express();

connectDB();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "public")));
server.use("/api", router);

export default server;
