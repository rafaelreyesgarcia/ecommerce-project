import useLocalStorageState from "use-local-storage-state";

const { createContext } = require("react")

export const ProductsContext = createContext({});

export function ProductsContextProvider({children}) {

  const [selectedProducts, setSelectedProducts] = useLocalStorageState('cart', {defaultValue: []});
  return (
    <ProductsContext.Provider value={{selectedProducts, setSelectedProducts}}>
      {children}
    </ProductsContext.Provider>
  );
}