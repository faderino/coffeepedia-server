const express = require("express");
const cors = require("cors");
const {connection} = require("./config/mongoConnection");
const router = require("./routes");
const app = express();
const port = process.env.PORT || 4002;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

connection()
.then(() => {
  console.log('db connect')
  app.listen(port, () => {
    console.log("app connected to " + port);
  })
})
.catch(err => {
  console.log(err)
  console.log('db not connect')
}) 
