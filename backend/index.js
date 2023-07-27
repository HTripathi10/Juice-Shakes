const express = require("express");
const app = express();
const mongoose = require('mongoose');

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

mongoose.connect("mongodb+srv://<USERNAME>:<PASSWORD>>@cluster0.q1sqzrb.mongodb.net/<DATABASE_NAME>?retryWrites=true&w=majority", { useNewUrlParser: true })
.then(async () => {
  console.log('Connected to the database');
  try {
    const db = mongoose.connection.db; // Get the database instance

    const fetched_data = db.collection("juice_items");
    const data = await fetched_data.find({}).toArray();

    const juice_category = db.collection("juice_category");
    const catData = await juice_category.find({}).toArray();

    global.juice_items = data;
    global.juice_category = catData;
  } catch (error) {
    console.error(error.message);
  }
})
.catch((error) => {
  console.error('Failed to connect to the database', error);
});

app.get("/", (req,res) => {
    res.send("hello world");
});

app.use(express.json());

app.use("/api" , require("./routes/CreateUser"));
app.use("/api" , require("./routes/DisplayData"));
app.use("/api" , require("./routes/OrderData"));

app.listen(5000 , () => {
    console.log("app listening to port 5000");
});