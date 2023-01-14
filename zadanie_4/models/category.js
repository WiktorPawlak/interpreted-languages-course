const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriesSchema = Schema({
  _id: Schema.Types.ObjectId,
  categoryName: String
});

module.exports = mongoose.model('Categories', categoriesSchema, 'categories');