import express from "express";
import listEndpoints from "express-list-endpoints";
import authorsRouter from "./services/authors/index.js";
import blogsRouter from "./services/blogs/index.js";
import cors from "cors";
import { genericErrorHandler } from "./errorhandlers.js";

const server = express();

const port = 3001;

server.use(cors());
server.use(express.json());

server.use("/authors", authorsRouter);
server.use("/blogs", blogsRouter);

server.use(genericErrorHandler);

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("server is running on port" + port);
});
