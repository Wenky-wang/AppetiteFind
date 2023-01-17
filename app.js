const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const Restaurant = require("./models/restaurant.js");
const Account = require("./models/account.js");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.static("public"));

const url = "mongodb://localhost:27017/appetitedb";


// Read from db
app.get("/res", async (req,res) => {
  try {
    await mongoose.connect(url);
    console.log("readRes - database connected");

    Restaurant.find((err, restaus) => {  // findAll function
        if(err) console.log("ERROR in readRes: ", err);
        else {
            res.send(restaus);  // why we need JSON.stringify?
            mongoose.connection.close();
        }
    })
  }  catch(err) { console.log("ERROR in readRes connection: ", err); }
})
app.get("/acc", async (req,res) => {
  try {
    await mongoose.connect(url);
    console.log("readAcc - database connected");

    Account.find((err, accounts) => {  // findAll function
        if(err) console.log("ERROR in readAcc: ", err);
        else {
            res.send(accounts);
            mongoose.connection.close();
        }
    })
  }  catch(err) { console.log("ERROR in readAcc connection: ", err); }
})


// Add new to db
// note that account is not open to be added yet
app.post("/res", async (req,res) => {
  try {
      const { res_num, name, time, nation, totalRating, ratingNumber } = req.body;
      const restau = new Restaurant({
        res_num, name, time, nation, totalRating, ratingNumber
      })
      
      await mongoose.connect(url); 
      console.log("addRes - database connected");

      // add data
      restau.save((err) => {
          if (err) console.log("ERROR in addRes: ", err);
          else {
              console.log(`New restaurant inserted`);
              res.send("New restaurant inserted");
              mongoose.connection.close();
          }
      })
    }  catch(err) { console.log("ERROR in addRes connection: ", err); }
})


// Update to db
app.put("/res/:id", async (req,res) => {
  try {
      const { name, time, nation, totalRating, ratingNumber } = req.body;
      const res_num = req.params.id;
      
      await mongoose.connect(url);
      console.log("updRes - database connected");

      // find based on all features
      Restaurant.findOneAndUpdate(
        {res_num},
        {res_num, name, time, nation, totalRating, ratingNumber},
        (err) => {
          if (err) console.log("ERROR in updRes: ", err);
          else {
            console.log("Restaurant Updated");
            res.send("Restaurant Updated");
            mongoose.connection.close();
          }
        })
    }  catch(err) { console.log("ERROR in updRes connection: ", err); }
})
app.put("/acc/:id", async (req,res) => {
  try {
      const { wished } = req.body;
      const email = req.params.id;
      
      await mongoose.connect(url);
      console.log("updAcc - database connected");

      // find based on all features
      Account.findOneAndUpdate(
        {email},
        {email, wished},
        (err) => {
          if (err) console.log("ERROR in updAcc: ", err);
          else {
            console.log("Account Updated",);
            res.send("Account Updated");
            mongoose.connection.close();
          }
        })
    }  catch(err) { console.log("ERROR in updAcc connection: ", err); }
})

// Delete from db
// account not open to be deleted yet
app.delete("/res/:id", async (req,res) => {
  try {
      const res_num = req.params.id;
      
      await mongoose.connect(url);
      console.log("delRes - database connected");

      // find based on restaurant number but not objectID
      Restaurant.findOneAndDelete({res_num}, err=>{
        if (err) console.log("ERROR in delRes: ", err);
        else {
          console.log("Restaurant deleted");
          res.send("Restaurant deleted");
          mongoose.connection.close();
        }
      })
    }  catch(err) { console.log("ERROR in delRes connection: ", err); }
})


const port = process.env.port || 5000;
app.listen(port, ()=>{
  console.log(`the server is up and listening on port ${port}`);
})