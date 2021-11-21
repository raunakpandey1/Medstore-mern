const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const Seller = require("../models/Seller");
const Store = require("../models/Store");

exports.checkstore = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const seller = await Seller.findById(decoded.id);
    /* const store = await Store.findOne({ownerId: decoded.id}); */

    if (!seller) {
        return next(new ErrorResponse("Not authorized to access this route by user", 401));
    }
    /* if(!store){
        return next(new ErrorResponse("No store found with this id", 404));
    } */

    req.seller = seller;

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this router", 401));
  }
};