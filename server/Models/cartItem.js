const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  footballBootId: { type: mongoose.Schema.Types.ObjectId, ref: 'Boot'},
  quantity: Number,
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = { CartItem };
