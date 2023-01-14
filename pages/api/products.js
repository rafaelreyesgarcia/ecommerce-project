import { initMongo } from "@/lib/mongo";
import Product from "@/models/product";

export async function findAllProducts() {
  return Product.find().exec();
}

export default async function handle(req, res) {
  await initMongo();
  res.json( await findAllProducts());
}