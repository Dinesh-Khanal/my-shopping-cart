import React, { useState } from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";

function App() {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  const filterProducts = (e) => {
    //console.log(e.target.value);
    const tempSize = e.target.value;
    if (tempSize === "") {
      setSize("");
      setProducts(data.products);
      setSort("");
    } else {
      const newProducts = data.products.filter(
        (product) => product.availableSizes.indexOf(tempSize) >= 0
      );
      setSize(tempSize);
      setProducts(newProducts);
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
    setProducts(tempProducts);
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
            <Products products={products} />
          </div>
          <div className="sidebar">Cart Items</div>
        </div>
      </main>
      <footer>All right is reserved</footer>
    </div>
  );
}

export default App;
