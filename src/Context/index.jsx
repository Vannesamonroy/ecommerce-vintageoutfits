import React, { createContext, useEffect, useState } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  //Shopping Cart - Increment quantity
  const [count, setCount] = useState(0);

  //Product Detail - Open/Close
  const [detailOpen, setDetailOpen] = useState(false);
  const openProductDetail = () => setDetailOpen(true);
  const closeProductDetail = () => setDetailOpen(false);

  //Product Detail - Show product
  const [productToShow, setProductToShow] = useState({});

  //Shopping Cart - Add products to cart
  const [cartProducts, setCartProducts] = useState([]);

  //Checkout Side Menu - Open/Close
  const [isCheckoutSideOpen, setIsCheckoutSideOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideOpen(false);

  //Shopping Cart - Order
  const [order, setOrder] = useState([]);

  //Get Products
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);

  //Get Products By Title
  const [searchByTitle, setSearchByTitle] = useState(null);

  //Get products by Category
  const [searchByCategory, setSearchByCategory] = useState(null);

  useEffect(() => {
    fetch(
      "https://strapi-production-1287.up.railway.app/api/products?populate=images",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 0bfbc7532724998b6331cc3666f52966c510ed5c60d1431c7320b4523036bc264873555bd940bc787b14df863430acb8a195d8ab43a2ede279d8767036e0fe83bfd531384abf879f0b170db2ae05b4bcad5df569b142d06fa4346e221ac8645b9c0c7b5fe3f56d0e3821a47ab2a05576b341b264d28bbde4f8e39ab6838f1485`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setItems(data.data);
      });
  }, []);

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter((item) =>
      item.attributes.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  const filteredItemsByCategory = (items, searchByCategory) => {
    console.log(items, searchByCategory)
    return items?.filter((item) =>
      item.attributes?.category
        .toLowerCase()
        .includes(searchByCategory.toLowerCase())
    );
  };

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if (searchType === "BY_TITLE") {
      return filteredItemsByTitle(items, searchByTitle);
    }

    if (searchType === "BY_CATEGORY") {
      return filteredItemsByCategory(items, searchByCategory);
    }

    if (searchType === "BY_TITLE_AND_CATEGORY") {
      return filteredItemsByCategory(items, searchByCategory).filter((item) =>
        item.attributes.title
          .toLowerCase()
          .includes(searchByTitle.toLowerCase())
      );
    }

    if (!searchType) {
      return items;
    }
  };

  useEffect(() => {
    if (searchByTitle && searchByCategory)
      setFilteredItems(
        filterBy(
          "BY_TITLE_AND_CATEGORY",
          items,
          searchByTitle,
          searchByCategory
        )
      );
    if (searchByTitle && !searchByCategory)
      setFilteredItems(
        filterBy("BY_TITLE", items, searchByTitle, searchByCategory)
      );
    if (!searchByTitle && searchByCategory)
      setFilteredItems(
        filterBy("BY_CATEGORY", items, searchByTitle, searchByCategory)
      );
    if (!searchByTitle && !searchByCategory)
      setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory));
  }, [items, searchByTitle, searchByCategory]);

  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        openProductDetail,
        closeProductDetail,
        detailOpen,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckoutSideOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        order,
        setOrder,
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        searchByCategory,
        setSearchByCategory,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
