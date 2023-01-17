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

# footer and layout

A Layout component for the default app layout.

a div that applies padding to all 4 sides.

the div wraps the children that are passed from the index component.

the Footer component is added below this in the Layout component.

ProductsContext imports `createContext` and `useState` 

`ProductsContext` will be a new context set to an object literal

```jsx
// ProductsContext.js
const { createContext, useState } = require("react")

export const ProductsContext = createContext({});

export function ProductsContextProvider({children}) {
  const [selectedProducts, setSelectedProducts] = useState([]);

  return (
    <ProductsContext.Provider value={{selectedProducts, setSelectedProducts}}>
      {children}
    </ProductsContext.Provider>
  );
}
```

ProductsContext.js exports both `ProductsContext` and `ProductsContextProvider` which will wrap the `_app.js`.

the provider will pass the state and setState destructured properties from the `useState` invocation.

```jsx
// _app.js
export default function App({ Component, pageProps }) {
  return (
    <ProductsContextProvider>
      <Component {...pageProps} />
    </ProductsContextProvider>
  )  
}
```

then the footer component imports both `useContext` and `ProductsContext` (initially set to empty object literal)

the `setSelectedProducts` is destructured from invoking `useContext(ProductsContext)` in the Product.js component.

an event handler is attached to the `onClick` event of the add to cart button in the Product.js component.

This handler sets the state to the previous state plus adding the `_id` of the Product component that is added to the cart.

```jsx
function addProduct() {
    setSelectedProducts(prev => [...prev, _id]);
}
// ...
return (
  <button 
    onClick={addProduct} 
  >
    +
  </button>
)
```

the `selectedProducts` is destructured from invoking `useContext(ProductsContext)` in the Footer.js component.

`selectedProducts.length` is displayed in the cart.

the footer component wraps two next/link components for home and cart pages.

SVG attributes should be camelCased so there's no context errors logged in the console.

```jsx
<path stroke-linejoin="round">
<path strokeLinejoin="round">
```

# saving cart to localStorage

state can then be saved to a database or localStorage

npm install use-local-storage-state

refactor `useState` hook in ProductContext.js to `useLocalStorageState`

# checkout page

we can't use `getServerSideProps` as the checkout page is different for every user. 




