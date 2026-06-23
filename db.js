import mongoose from "mongoose";

const mongoURL = "mongodb://127.0.0.1:27017/UrbanIndustry";

mongoose
  .connect(mongoURL)
  .then(() => console.log("success"))
  .catch((err) => console.log(err.message));
