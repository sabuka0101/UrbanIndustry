import express from "express";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const mongoURL = "mongodb://127.0.0.1:27017/products";
app.use(express.json());
app.use(express.static(path.join(__dirname)));
mongoose
  .connect(mongoURL)
  .then(() => console.log("success"))
  .catch((err) => console.log(`fail ${err}`));

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Product = mongoose.model("product", productSchema);

app.post("/products", async (req, res) => {
  try {
    for (let i = 0; i < products.length; i++) {
      const product = await Product.create(products[i]);
    }
    res.status(201).send("success");
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/products", (req, res) => {
  const products = [
    {
      category: "Sneakers",
      productName: "Nike",
      price: 30,
      imgUrl: "assets/airforce.png",
    },
    {
      productName: "Adidas",
      category: "Sneakers",
      price: 25,
      imgUrl: "assets/airforce.png",
    },
    {
      productName: "Puma",
      category: "Sneakers",
      price: 35,
      imgUrl: "assets/airforce.png",
    },
    {
      productName: "LumberJack",
      category: "Sneakers",
      price: 60,
      imgUrl: "assets/airforce.png",
    },
  ];
  res.json(products);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "admin.html"));
});

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`),
);
