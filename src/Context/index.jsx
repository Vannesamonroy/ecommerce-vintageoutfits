import { createContext, useState } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  //contador carrito
  const [shoppingCartCount, setShoppingCartCount] = useState(0);

  //abrir y cerrar Detalle del producto
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  //Mostrar data en product detail
  const [ProductToShowDetail, setProductToShowDetail] = useState({});
  return (
    <ShoppingCartContext.Provider
      value={{
        shoppingCartCount,
        setShoppingCartCount,
        openProductDetail,
        closeProductDetail,
        isProductDetailOpen,
        ProductToShowDetail,
        setProductToShowDetail,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
