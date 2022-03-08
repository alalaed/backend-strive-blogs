import express from "express";
// import url

const authorsRouter = express.Router();

// const authorsJSONPath = import.meta.url;

authorsRouter.post("/", () => {});
authorsRouter.get("/", () => {});
authorsRouter.get("/:authorId", () => {});
authorsRouter.put("/:authorId", () => {});
authorsRouter.delete("/:authorId", () => {});

export default authorsRouter;
