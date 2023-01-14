import { useState } from "react"
import Product from "@/components/product";
import { initMongo } from "@/lib/mongo";
import { findAllProducts } from "./api/products";

export async function getServerSideProps() {
  await initMongo();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default function Home({products}) {
  const [phrase, setPhrase] = useState(['']);
  // console.log(products);
  
  const categoryNames = [...new Set(products.map(p => p.category))]; // ... shallow copies the set in array
  // console.log(categoryNames);

  if (phrase) {
    products = products.filter(p => p.name.toLowerCase().includes(phrase));
  } 

  // console.log(phrase);

  return (
    <>
      <div className="p-5">
        <input 
          type="text" 
          placeholder="Search for products..." 
          className="bg-gray-100 w-full py-2 px-4 rounded-xl text-stone-400" 
          value={phrase}
          onChange={e => setPhrase(e.target.value)}
        />
        <div>
          {categoryNames.map(category => (
            <div key={category}>
              {products.find(p => p.category === category) && (
                <div>
                  <h2 className="text-2xl py-5 capitalize">{category}</h2>
                    <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                      {products.filter(p => p.category === category).map(productInfo => (
                        <div key={productInfo._id} className='px-5 snap-start'>
                          <Product {...productInfo} />
                        </div>
                      ))}
                    </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* <h2 className="text-2xl">Phones</h2> */}
      </div>
    </>
  )
}

