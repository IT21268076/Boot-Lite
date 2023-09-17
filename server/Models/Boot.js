const mongoose = require('mongoose');

const BootSchema = new mongoose.Schema({
  brand: String,
  model: String,
  price: Number,
});

const Boot = mongoose.model('Boot', BootSchema);

module.exports = {Boot};
