//const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sellerSchema = new mongoose.Schema({
  profileImg: {
    type: String,
    default: "https://cdn.shoplightspeed.com/shops/626275/files/18687152/600x600x1/stickers-northwest-sticker-smiley-face.jpg",
  },
  firstname: {
    type: String,
    required: [true, "Please provide Firstname"],
  },
  lastname: {
    type: String,
    required: [true, "Please provide Lastname"],
  },
  email: {
    type: String,
    required: [true, "Please provide email address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 8,
    select: false,
  },
  cartItem: {
    type: Array,
    default: [],
  },
  userAddress: {
    type: String,
    default: "-",
  },
  storeId:{
    type: String,
    default: "",
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]

});

sellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

sellerSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

sellerSchema.methods.getSignedJwtToken = async function() {
  try{
    let token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    this.tokens = this.tokens.concat({token: token});
    await this.save();
    return token;
  }catch(err){
    console.log(err);
  }
};






const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;