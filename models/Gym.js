const mongoose = require('mongoose');

const gymSchema = new mongoose.Schema({
  name: String,
  lat: String,
  lon: String,
  
  category: {
      climbingFeatures: Array
  }
}, { timestamps: true});

const Gym = mongoose.model('gyms', gymSchema);
module.exports = Gym;