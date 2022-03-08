import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import uniqid from "uniqid";

const blogsRouter = express.Router();

const blogsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "/blogs.json"
);

const getBlogs = () => JSON.parse(fs.readFileSync(blogsJSONPath));

const writeBlogs = (content) =>
  fs.writeFileSync(blogsJSONPath, JSON.stringify(content));

blogsRouter.post("/", (req, res, next) => {
  try {
    const blogs = getBlogs();
    const newBlog = { ...req.body, createdAt: new Date(), id: uniqid() };
    authors.push(newBlog);
    writeBlogs(blogs);
    res.status(201).send(newBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/", (req, res, next) => {
  try {
    const blogs = getBlogs();
    res.send(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:blogId", (req, res, next) => {
  try {
    const blogs = getBlogs();
    const foundBlog = blogs.filter((blog) => blog.id === req.params.blogId);
    res.status(200).send(foundBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:blogId", (req, res, next) => {
  try {
    const blogs = getBlogs();
    const index = blogs.findIndex((blog) => blog.id === req.params.blogId);
    const oldBlog = blogs[index];
    const updatedBlog = { ...oldBlog, ...req.body, updatedAt: new Date() };
    blogs[index] = updatedBlog;
    writeBlogs(blogs);
    res.send(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:blog‚Id", (req, res, next) => {
  try {
    const blogs = getBlogs();
    const remainingBlogs = blogs.filter(
      (blog) => blog.id !== req.params.blogId
    );
    writeBlogs(remainingBlogs);
    res.send(remainingBlogs);
  } catch (error) {
    next(error);
  }
});

export default blogsRouter;
