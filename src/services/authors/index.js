import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import uniqid from "uniqid";

const authorsRouter = express.Router();

const authorsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "/authors.json"
);

const getAuthors = () => JSON.parse(fs.readFileSync(authorsJSONPath));

const writeAuthors = (content) =>
  fs.writeFileSync(authorsJSONPath, JSON.stringify(content));

authorsRouter.post("/", (req, res, next) => {
  try {
    const authors = getAuthors();
    const newAuthor = { ...req.body, createdAt: new Date(), id: uniqid() };
    authors.push(newAuthor);
    writeAuthors(authors);
    res.status(201).send(newAuthor);
  } catch (error) {
    next(error);
  }
});

authorsRouter.get("/", (req, res, next) => {
  try {
    const authors = getAuthors();
    res.send(authors);
  } catch (error) {
    next(error);
  }
});

authorsRouter.get("/:authorId", (req, res, next) => {
  try {
    const authors = getAuthors();
    const foundAuthor = authors.filter(
      (author) => author.id === req.params.authorId
    );
    res.status(200).send(foundAuthor);
  } catch (error) {
    next(error);
  }
});

authorsRouter.put("/:authorId", (req, res, next) => {
  try {
    const authors = getAuthors();
    const index = authors.findIndex(
      (author) => author.id === req.params.authorId
    );
    const oldAuthor = authors[index];
    const updatedAuthor = { ...oldAuthor, ...req.body, updatedAt: new Date() };
    authors[index] = updatedAuthor;
    writeAuthors(authors);
    res.send(updatedAuthor);
  } catch (error) {
    next(error);
  }
});

authorsRouter.delete("/:authorId", (req, res, next) => {
  try {
    const authors = getAuthors();
    const remainingAuthors = authors.filter(
      (author) => author.id !== req.params.authorId
    );
    writeAuthors(remainingAuthors);
    res.send(remainingAuthors);
  } catch (error) {
    next(error);
  }
});

export default authorsRouter;
