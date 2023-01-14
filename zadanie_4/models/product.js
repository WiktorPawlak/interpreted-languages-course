const mongoose = require('../presistence/db');

const productsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productName: String,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories' },
  price: { type: Number, min: 0 },
  weight: { type: Number, min: 0 }
});

module.exports = mongoose.model('Products', productsSchema, 'products');