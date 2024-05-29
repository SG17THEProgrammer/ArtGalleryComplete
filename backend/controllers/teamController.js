const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncError.js");
const Team = require("../models/teamModel.js")
const fs = require("fs") ;
const assert = require("assert");



exports.createTeamController = catchAsyncErrors(async (req, res, next) =>{
    const { photo } = req.files;

  
  if(photo && photo.size > 1000000){
    return next(new ErrorHandler("photo is Required and should be less then 1mb",400));   
  }
  
  const teams = new Team({ ...req.fields});
  if (photo) {
    teams.photo.data = fs.readFileSync(photo.path);
    teams.photo.contentType = photo.type;
  }
  await teams.save();
  res.status(201).send({
    success: true,
    message: "Team Created Successfully",
    teams,
  });
})
exports.getTeamController = catchAsyncErrors(async (req, res, next) =>{
    const teams = await Team.find({}).select("-photo")
  res.status(200).send({
    success: true,
    counTotal: teams.length,
    message: "All Teams ",
    teams,
  });
})

exports.updateTeamController = catchAsyncErrors(async (req, res, next) =>{
   
  const { photo } = req.files;

  if(photo && photo.size > 1000000){
    return next(new ErrorHandler("photo is Required and should be less then 1mb",400));   
  }
 
  const teams = await Team.findByIdAndUpdate(
    req.params.pid,
    { ...req.fields },
    { new: true }
  );
  if (photo) {
    teams.photo.data = fs.readFileSync(photo.path);
    teams.photo.contentType = photo.type;
  }
  await teams.save();
  res.status(201).send({
    success: true,
    message: "Team Updated Successfully",
    teams,
  });
})


exports.teamPhotoController = catchAsyncErrors(async (req, res, next) =>{
    const teams = await Team.findById(req.params.pid).select("photo");
    if (teams.photo.data) {
      res.set("Content-type", teams.photo.contentType);
      return res.status(200).send(teams.photo.data);
    }
})
exports.deleteTeamController = catchAsyncErrors(async (req, res, next) =>{
    await Team.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Team Deleted successfully",
    });
})
