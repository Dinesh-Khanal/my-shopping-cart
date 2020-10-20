const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to mongodb atlas
mongoose.connect(
  "mongodb://dinesh:RQm23SzI4hKjVZn6@nodejscluster-shard-00-00.pt0ox.mongodb.net:27017,nodejscluster-shard-00-01.pt0ox.mongodb.net:27017,nodejscluster-shard-00-02.pt0ox.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-ffvd6b-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected to database");
  }
);

//create product modal
const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    proce: Number,
    availableSizes: [String],
  })
);

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
