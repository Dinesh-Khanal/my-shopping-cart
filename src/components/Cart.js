import React, { useState } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, createOrder } from "../myredux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [showCheckOut, setShowCheckOut] = useState(false);
  const dispatch = useDispatch();
  const handleInput = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const order = {
      name: customer.name,
      email: customer.email,
      address: customer.address,
      cartItems,
      total: cartItems.reduce((a, c) => a+c.price*c.count,0)
    };
    createOrder(order);
    setCustomer({
      name: "",
      email: "",
      address: "",
    });
    setShowCheckOut(false);
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="cart cart-header">Cart is empty</div>
      ) : (
        <div className="cart cart-header">
          You have {cartItems.length} products in the cart
        </div>
      )}
      <div>
        <div className="cart">
          <Fade left cascade>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formatCurrency(item.price)} X {item.count}{" "}
                      <button
                        onClick={() => dispatch(removeFromCart(item))}
                        className="button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        {cartItems.length !== 0 && (
          <div className="cart">
            <div className="total">
              <div>
                Total:{" "}
                {formatCurrency(
                  cartItems.reduce((a, c) => a + c.price * c.count, 0)
                )}
              </div>
              <button
                onClick={() => setShowCheckOut(true)}
                className="button primary"
              >
                Proceed
              </button>
            </div>
          </div>
        )}
        {showCheckOut && (
          <div className="cart">
            <Fade right cascade>
              <form onSubmit={handleSubmit}>
                <ul className="form-container">
                  <li>
                    <label>Name</label>
                    <input
                      name="name"
                      required
                      type="text"
                      value={customer.name}
                      onChange={handleInput}
                    />
                  </li>
                  <li>
                    <label>Email</label>
                    <input
                      name="email"
                      required
                      type="email"
                      value={customer.email}
                      onChange={handleInput}
                    />
                  </li>
                  <li>
                    <label>Address</label>
                    <input
                      name="address"
                      required
                      type="text"
                      value={customer.address}
                      onChange={handleInput}
                    />
                  </li>
                  <li>
                    <button className="button primary" type="submit">Checkout</button>
                  </li>
                </ul>
              </form>
            </Fade>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
