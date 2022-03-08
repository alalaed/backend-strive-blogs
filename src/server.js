import express from "express";
import listEndpoints from "express-list-endpoints";
import authorsRouter from "./services/authors/index.js";
import blogsRouter from "./services/blogs/index.js";

const server = express();

const port = 4000;
server.use(express.json());
server.use("/authors", authorsRouter);
server.use("/blogs", blogsRouter);

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("server is running on port" + port);
});