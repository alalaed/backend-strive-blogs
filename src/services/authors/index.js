import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const authorsRouter = express.Router();

const authorsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "/authors.json"
);

const getAuthors = () => fs.readFileSync(authorsJSONPath);

const writeAuthors = (content) =>
  fs.writeFileSync(authorsJSONPath, JSON.stringify(content));

authorsRouter.post("/", (req, res, next) => {});
authorsRouter.get("/", (req, res, next) => {
  const authors = getAuthors();
  res.send(authors);
});
authorsRouter.get("/:authorId", (req, res, next) => {});
authorsRouter.put("/:authorId", (req, res, next) => {});
authorsRouter.delete("/:authorId", (req, res, next) => {});

export default authorsRouter;
