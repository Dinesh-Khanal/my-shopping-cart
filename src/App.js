import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import { fetchProducts } from "./myredux";

function App() {
  //const [products, setProducts] = useState(data.products);
  const products = useSelector((state) => state.items);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filterProducts = (e) => {
    //console.log(e.target.value);
    const tempSize = e.target.value;
    if (tempSize === "") {
      setSize("");
      //setProducts(data.products);
      setSort("");
    } else {
      const newProducts = data.products.filter(
        (product) => product.availableSizes.indexOf(tempSize) >= 0
      );
      setSize(tempSize);
      //setProducts(newProducts);
      setSort("");
    }
  };

  const sortProducts = (e) => {
    //console.log(e.target.value);
    const tempSort = e.target.value;
    const tempProducts = products
      .slice()
      .sort((a, b) =>
        tempSort === "lowest"
          ? a.price > b.price
            ? 1
            : -1
          : tempSort === "highest"
          ? a.price < b.price
            ? 1
            : -1
          : a._id > b._id
          ? 1
          : -1
      );
    setSort(tempSort);
    //setProducts(tempProducts);
  };

  const addToCart = (product) => {
    const tempCartItems = cartItems.slice(); // same as {...cartItms}
    let alreadyInCart = false;
    tempCartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      tempCartItems.push({ ...product, count: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(tempCartItems));
    setCartItems(tempCartItems);
  };

  const removeFromCart = (product) => {
    const tempCartItems = cartItems.filter((item) => item._id !== product._id);
    localStorage.setItem("cartItems", JSON.stringify(tempCartItems));
    setCartItems(tempCartItems);
  };

  const createOrder = (order) => {
    console.log(order.customer);
  };

  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter
              count={products.length}
              size={size}
              sort={sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            />
            {products.length > 0 ? (
              <Products products={products} addToCart={addToCart} />
            ) : (
              <div>Loading...</div>
            )}
          </div>
          <div className="sidebar">
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              createOrder={createOrder}
            />
          </div>
        </div>
      </main>
      <footer>All right is reserved</footer>
    </div>
  );
}

export default App;
