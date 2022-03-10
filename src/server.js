import express from "express";
import { join } from "path";
import listEndpoints from "express-list-endpoints";
import authorsRouter from "./services/authors/index.js";
import blogsRouter from "./services/blogs/index.js";
import cors from "cors";
import {
  genericErrorHandler,
  badRequestHandler,
  unauthorizedHandler,
  notFoundHandler,
} from "./errorhandlers.js";
import filesRouter from "./services/files/index.js";

const server = express();

const port = process.env.PORT;

const publicFolderPath = join(process.cwd(), "./public");

const whitelist = [process.env.FE_DEV_URl, process.env.FE_PROD_URL];

server.use(
  cors({
    origin: function (origin, next) {
      if (origin || whitelist.indexOf(origin) !== -1) {
        console.log("origin allowed");
        next(null, true);
      } else {
        console.log("origin is allowed");
        next(new Error("CORS Error"));
      }
    },
  })
);
server.use(express.json());

server.use("/authors", authorsRouter);
server.use("/blogs", blogsRouter);
server.use("/files", filesRouter);

server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("server is running on port" + port);
});
