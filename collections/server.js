const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/appetitedb";
mongoose.connect(url);
console.log("Database connected");

///// NOTE /////
// this file is used for only uploading the first batch of data
// use 'node savedata.js'

// get schema
const Restaurant = require("../models/restaurant.js");
const Account = require("../models/account.js");

// 1) Restaurant
const resdata = require("./res-data.json");
resdata.forEach(res => {
  // create document
  let restaurant = new Restaurant({
    res_num: res.id,
    name: res.name,
    time: res.time,
    nation: res.nation,
    totalRating: res.totalRating,
    ratingNumber: res.ratingNumber
  });

  // save document to db
  restaurant.save((err) => {
    if(err) console.log("ERROR in saving res: ", err)
    else console.log(`RES: document inserted successfully`);
  })
})
// 1) Restaurant
const accdata = require("./accounts.json");
accdata.forEach(acc => {
  // create document
  let account = new Account({
    email: acc.email,
    password: acc.password,
    type: acc.type,
    wished: acc.wished
  });

  // save document to db
  account.save((err) => {
    if(err) console.log("ERROR in saving acc: ", err)
    else console.log(`ACC: document inserted successfully`);
  })
})