import React, { useState } from "react";
import formatCurrency from "../util";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../myredux";

const Products = () => {
  const allProducts = useSelector((state) => state.products.items);
  const filteredProducts = useSelector((state) => state.products.filteredItems);
  const [product, setProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const products = !filteredProducts ? allProducts : filteredProducts;
  const dispatch = useDispatch();

  const openModal = (product) => {
    setProduct(product);
    setModalOpen(true);
  };
  const closeModal = () => {
    setProduct(null);
    setModalOpen(false);
  };
  return (
    <div>
      {!products ? (
        <div>Loading...</div>
      ) : (
        <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <a href={"#" + product._id} onClick={() => openModal(product)}>
                  <img src={product.image} alt={product.title} />
                  <p>{product.title}</p>
                </a>
                <div className="product-price">
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="button primary"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {product && (
        <Modal isOpen={modalOpen} onRequestClose={closeModal}>
          <Zoom>
            <button className="close-modal" onClick={closeModal}>
              X
            </button>
            <div className="product-details">
              <img src={product.image} alt={product.title} />
              <div className="product-details-description">
                <p>
                  <strong>{product.title}</strong>
                </p>
                <p>{product.description}</p>
                <p>
                  Available Sizes:{" "}
                  {product.availableSizes.map((x) => (
                    <span>
                      {" "}
                      <button className="button">{x}</button>
                    </span>
                  ))}
                </p>
                <div className="product-price">
                  <div>Price: {formatCurrency(product.price)}</div>
                  <button
                    className="button primary"
                    onClick={() => {
                      addToCart(product);
                      closeModal();
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
};

export default Products;
