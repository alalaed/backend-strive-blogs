import express from "express";
import { pipeline } from "stream";
import multer from "multer";
import { savedAvatars } from "../../lib/fs-tools.js";
import { getAuthorsReadableStream } from "../../lib/fs-tools.js";
import json2csv from "json2csv";
import { sendEmail } from "../../lib/email-tools.js";

const filesRouter = express.Router();

filesRouter.post(
  "/uploadSingle",
  multer().single("avatar"),
  async (req, res, next) => {
    try {
      await savedAvatars(req.file.originalname, req.file.buffer);
      res.send({ message: "uploaded" });
    } catch (error) {
      next(error);
    }
  }
);

filesRouter.post(
  "/uploadMultiple",
  multer().array("avatars"),
  async (req, res, next) => {
    try {
      const arrayOfPromises = req.files.map((file) =>
        savedAvatars(file.originalname, file.buffer)
      );
      await Promise.all(arrayOfPromises);
      res.send({ message: "uploaded" });
    } catch (error) {
      next(error);
    }
  }
);

filesRouter.get("/downloadCSV", (req, res, next) => {
  try {
    res.setHeader("Content-Disposition", "attachment; filename=example.pdf");

    const source = getAuthorsReadableStream();
    const transform = new json2csv.Transform({ fields: ["name", "surname"] });
    const destination = res;

    pipeline(source, transform, destination, (err) => {
      console.log(err);
    });
  } catch (error) {
    next(error);
  }
});

filesRouter.post("/register", async (req, res, next) => {
  try {
    const { email } = req.body;

    await sendEmail(email);
    res.send();
  } catch (error) {
    next(error);
  }
});

export default filesRouter;
