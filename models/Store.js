const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
  ownerId: {
    type: String,
    required: [true, "Please provide Owner Id"],
  },
  storeName: {
    type: String,
    required: [true, "Please provide Storename"],
  },
  ownerName: {
    type: String,
    required: [true, "Please provide Ownername"],
  },
  ownerEmail: {
    type: String,
    required: [true, "Please provide email address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  latitude: {
    type: String,
    required: [true, "Location Error"],
  },
  longitude: {
    type: String,
    required: [true, "Location Error"],
  },
  storeAddress: {
    type: String,
    default: "-",
  },
  storeItem: {
    type: Array,
    default: [],
  },
  addressList: {
    type: Object,
  },
},
{timestamps: true});

const Store = mongoose.model("Store", StoreSchema);

module.exports = Store;