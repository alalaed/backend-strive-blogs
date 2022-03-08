export const genericErrorHandler = (err, req, res, next) => {
  console.log("i am the error" + err);
  res.status(500).send({ message: "Generic server Error" });
};
