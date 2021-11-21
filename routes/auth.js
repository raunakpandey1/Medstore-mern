const express = require('express');
const router = express.Router();
const {signin, signup, updateuser, storesignup, storesignin} = require('../controllers/auth')

//user Auth
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/updateuserdata").post(updateuser);

//store Auth
router.route("/storesignup").post(storesignup);
router.route("/storesignin").post(storesignin);

module.exports = router;