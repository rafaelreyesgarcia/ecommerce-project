import Layout from "@/components/Layout"
import { ProductsContext } from "@/components/ProductsContext";
import { useContext, useEffect, useState } from "react"

export default function Checkout() {
  const {selectedProducts, setSelectedProducts} = useContext(ProductsContext);
  const [productsInfo, setProductsInfo] = useState([]);
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)];
    fetch('/api/products?ids='+uniqIds.join(','))
      .then(response => response.json())
      .then(json => setProductsInfo(json));
  }, [selectedProducts]);

  function addProduct(id) {
    setSelectedProducts(prev => [...prev, id]);
  }

  function removeProduct(id) {
    // position of id
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      // const newSelectedProducts = selectedProducts.filter((value, index) => index !== pos);
      setSelectedProducts(prev => {
        return prev.filter((value, index ) => index !== pos);
      });
    }
  }

  const delivery = 5;

  let subtotal = 0;

  console.log(selectedProducts);
  console.log(productsInfo);

  // SUBTOTAL BUG
  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const productMatch = productsInfo.find(p => p._id === id);
      const price = productMatch.price; // sometimes productMatch returns undefined so .price can't be accessed, supposedly the if statement should be checking for this
      // console.log(price);
      subtotal += price;
    }
  }
  
  const total = subtotal + delivery;

  return (
    <Layout>
      {!productsInfo.length && (
        <div>no products in your shopping cart</div>
      )}
      {productsInfo.length && productsInfo.map(product => (
        <div 
          key={product._id}
          className="flex mb-5"
        >
          <div className="bg-gray-100 p-3 rounded-xl shrink-0">
            <img
              className="w-24" 
              src={product.img} 
              alt={product.name} 
            />
          </div>
          <div className="pl-4">
            <h3 className="font-bold tex-lg">{product.name}</h3>
            <p className="text-sm leading-4 text-gray-400">{product.description}</p>
            <div className="flex">
              <div className="grow">${product.price}</div>
              <div>
                <button 
                  className="
                    border border-emerald-500 rounded-lg
                   text-emerald-500 px-2
                  "
                  onClick={() => removeProduct(product._id)}
                >
                  -
                </button>
                {/* QTY */}
                <span className="px-2">
                  {selectedProducts.filter(id => id === product._id).length}
                </span>
                <button 
                  className="
                    bg-emerald-500 rounded-lg
                   text-white px-2
                  "
                  onClick={() => addProduct(product._id)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* {console.log(productsInfo)} */}
      {/* FORM */}
      <div className="mt-4">
        <input 
          value={address}
          onChange={e => setAddress(e.target.value)} 
          className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" 
          type="text" 
          placeholder="Street address" 
        />
        <input 
          value={zipcode}
          onChange={e => setZipcode(e.target.value)} 
          className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" 
          type="text" 
          placeholder="Zipcode" 
        />
        <input 
          value={name}
          onChange={e => setName(e.target.value)} 
          className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" 
          type="text" 
          placeholder="Name" 
        />
        <input 
          value={email}
          onChange={e => setEmail(e.target.value)} 
          className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" 
          type="text" 
          placeholder="Email address" 
        />
      </div>
      <div className="mt-4">
        <div className="flex mx-1 my-3">
          <h3 className="grow font-bold text-gray-300">Subtotal:</h3>
          <h3 className="font-bold">${subtotal}</h3>
        </div>
        <div className="flex mx-1 my-3">
          <h3 className="grow font-bold text-gray-300">Shipping Fee:</h3>
          <h3 className="font-bold">${delivery}</h3>
        </div>
        <div className="flex mx-1 my-3 pt-3 border-dashed border-emerald-500 border-t ">
          <h3 className="grow font-bold text-gray-300">Total:</h3>
          <h3 className="font-bold">${total}</h3>
        </div>
      </div>
      <button
        className="
          bg-emerald-500 text-white 
          p-5 w-full px-5 py-2 rounded-lg mt-2 my-4
          shadow-emerald-400 shadow-xs
        "
      >
        Complete Checkout
      </button>
    </Layout>
  )
}   