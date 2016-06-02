var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TourSiteSchema = new Schema({
  name: String,
  seasonPhotos: [{
    month: Number,
    img: String
  }],
  foodPhotos: [{
    img: String
  }],
  activityPhotos: [{
    type: String
  }],
  flightFee: Number,
  dailyFee: Number,
  description: String,
  score: Number
});