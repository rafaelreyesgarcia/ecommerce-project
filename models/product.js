const { Schema, model, models } = require("mongoose");

const ProductSchema = new Schema({
  name: String,
  description: String,
  category: String,
  img: String,
  price: Number,
});

const Product = models?.Product || model('Product', ProductSchema);

export default Product;