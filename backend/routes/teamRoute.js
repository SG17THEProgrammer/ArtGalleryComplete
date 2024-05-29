const express = require('express')
const router = express.Router()
const pages = require('../controllers/teamController.js')
const formidable = require("express-formidable");

router.route('/create-team').post(formidable(),pages.createTeamController)
router.route("/update-team/:pid").put(formidable(),pages.updateTeamController);
router.route("/get-team").get(pages.getTeamController)
router.route("/team-photo/:pid").get(pages.teamPhotoController)
router.route("/delete-team/:pid").delete(pages.deleteTeamController)

module.exports = router