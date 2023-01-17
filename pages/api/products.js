import { initMongo } from "@/lib/mongo";
import Product from "@/models/product";

export async function findAllProducts() {
  return Product.find().exec();
}

export default async function handle(req, res) {
  await initMongo();
  // const ids = req.query.ids;
  const {ids} = req.query;
  // console.log(ids);
  
  if (ids) {
    const idsArray = ids.split(',');
    // console.log(idsArray);
    res.json(await Product.find({'_id':{$in:idsArray}}).exec());
  } else {
    res.json( await findAllProducts());
  }
  
}