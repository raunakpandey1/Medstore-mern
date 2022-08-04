const mongoose = require("mongoose");
require('dotenv').config({path:"config.env"})
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology:true,
            useNewUrlParser: true,
            useCreateIndex: true
  });

  console.log("MongoDB Connected");
};

module.exports = connectDB;