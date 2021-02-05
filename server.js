const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const app = express();
const path = require('path');

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Use routes
app.use("/api/products", require("./routes/products"));

app.use((req, res, next) =>{
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

//connect to mongodb atlas
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected to database");
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
