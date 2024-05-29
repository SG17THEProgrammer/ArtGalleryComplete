const express = require('express');
const router = express.Router();

const { isAuthenticatedUser } = require('../middlewares/authMiddlewaresUser.js');
const page = require("../controllers/contactController.js")

router.route("/contact").post(isAuthenticatedUser,page.contactController)

module.exports = router