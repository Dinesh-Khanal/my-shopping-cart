import React, { useState } from "react";
import formatCurrency from "../util";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

const Products = ({ products, addToCart }) => {
  const [product, setProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
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
                  onClick={() => addToCart(product)}
                  className="button primary"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
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
