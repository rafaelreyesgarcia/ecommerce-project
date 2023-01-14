refactor data fetching using next.js `getStaticProps` instead of `useEffect`

```jsx
// useEffect
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [phrase, setPhrase] = useState(['']);

  useEffect( () => {
    fetch('/api/products')
      .then(response => response.json())
      .then(json => setProductsInfo(json));
    // console.log(productsInfo);
  }, []);

  const categoryNames = [...new Set(products.map(p => p.category))];

  if (phrase) {
    products = productsInfo.filter(p => p.name.toLowerCase().includes(phrase));
  }

  return (
    <input 
      type="text" 
      placeholder="Search for products..." 
      className="bg-gray-100 w-full py-2 px-4 rounded-xl text-stone-400" 
      value={phrase}
      onChange={e => setPhrase(e.target.value)}
    />
  )
}

// refactor to data fetch using getStaticProps
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
  const categoryNames = [...new Set(products.map(p => p.category))];
  if (phrase) {
    products = products.filter(p => p.name.toLowerCase().includes(phrase));
  } 
}
```

refactor products api

```jsx
// everything is done inside of handle
import { initMongo } from "@/lib/mongo";
import Product from "@/models/product";

export default async function handle(req, res) {
  await initMongo();
  res.json( await Product.find().exec());
}

// interacting with the model
export async function findAllProducts() {
  return Product.find().exec();
}
// initializing mongoose
export default async function handle(req, res) {
  await initMongo();
  res.json( await findAllProducts());
}
```

next.js throws error serializing object due to mongoose `_id` property.

`JSON.parse` and `JSON.stringify` is a fix for this for deep cloning

```jsx
return {
  props: {
    products: JSON.parse(JSON.stringify(products)),
  },
};
```
