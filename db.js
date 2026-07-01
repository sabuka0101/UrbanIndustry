import mongoose from "mongoose";

const mongoURL =
  "mongodb+srv://Vercel-Admin-urbanindustry:64GIAfyUTMbRqFsz@urbanindustry.m1ywqtu.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoURL)
  .then(() => console.log("success"))
  .catch((err) => console.log(err.message));
