const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ordersSchema = Schema({
  _id: Schema.Types.ObjectId,
  userData: {
    username: String,
    email: String,
    phoneNumber: String
  },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: 'Products' },
    quantity: { type: Number, min: 1 },
    totalPrice: { type: Number, min: 0 },
  }],
  totalOrderPrice: { type: Number, min: 0 },
  approvalDate: { type: Date, default: null },
  status: { type: mongoose.Schema.Types.ObjectId, ref: 'States' }
});

module.exports = mongoose.model('Orders', ordersSchema, 'orders');