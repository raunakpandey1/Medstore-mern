const express = require('express');
const router = express.Router();
 
const {getuser, registerstore , addproduct, searchProduct, getsingleproduct,getrandomproducts, additemtocart, getAllCartItem, removeitemfromcart, buyproduct ,getallStoreProduct , getallOrderedProduct , getStoreDetails , getorderhistory ,getAnalytics, getseller} = require('../controllers/private');
 
 
const {protect} = require('../middleware/auth');
const { checkstore } = require('../middleware/checkstore');

router.route("/getuser").get(protect, getuser);
router.route("/getrandomproducts").get(getrandomproducts);
router.route("/product").post(protect, addproduct);
router.route("/searchproduct").post(searchProduct);
router.route("/getsingleproduct/:productId").get(getsingleproduct);
router.route("/additemtocart").post(protect, additemtocart);
router.route("/getallcartitem").post(protect, getAllCartItem);
router.route("/removeitemfromcart").post(protect, removeitemfromcart);
router.route("/buyproduct").post(protect, buyproduct);
 
router.route("/getorderhistory").post(protect, getorderhistory);

//seller private route
router.route("/getseller").get(checkstore, getseller);
router.route("/createstore/:userid").post(checkstore, registerstore);
router.route("/storedashboard/addstoreproduct").post(checkstore, addproduct);
router.route("/storedashboard/allstoreproduct").post(checkstore, getallStoreProduct);
router.route("/storedashboard/orders").post(checkstore, getallOrderedProduct);
router.route("/storedashboard/setting").post(checkstore, getStoreDetails);
router.route("/storedashboard/analytics").post(checkstore, getAnalytics);
module.exports = router;