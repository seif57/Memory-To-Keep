import mongoose from "mongoose";

const { Error } = mongoose;
const errors = (err, req, res, next) => {
  if (err instanceof Error.ValidationError) {
    return res.status(400).json({
      status: "FAILED",
      message: "Document didn't pass validation",
      details: err.message,
    });
  }
  console.error(err);
  return res.status(500).json({
    status: "FAILED",
    message: "Internal server error",
  });
};

export default errors;
