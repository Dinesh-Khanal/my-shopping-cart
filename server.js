const express = require("express");
const favicon = require("express-favicon");
const mongoose = require("mongoose");
const path = require('path');

const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Use routes
app.use("/api/products", require("./routes/products"));

app.get('/*', (req, res) =>{
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
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
