import React from "react";
import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../Redux/Slice/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = total * 0.08;
  const grandTotal = total + tax;

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cart}>
        <h2 className={styles.cartHeader}>Your Shopping Cart</h2>

        {items.length === 0 ? (
          <div className={styles.emptyCart}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            <p>Your cart is empty</p>
            <button
              className={styles.continueShopping}
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <ul className={styles.cartItems}>
              {items.map((item) => (
                <li key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImageContainer}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.itemImage}
                    />
                  </div>

                  <div className={styles.itemDetails}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.unitPrice}>
                      ${item.price.toFixed(2)} each
                    </span>
                  </div>

                  <div className={styles.quantityControls}>
                    <button
                      onClick={() => dispatch(removeItem(item.id))}
                      className={styles.qtyBtn}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className={styles.itemQuantity}>{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(
                          addItem({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            quantity: 1,
                          })
                        )
                      }
                      className={styles.qtyBtn}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className={styles.priceContainer}>
                    <span className={styles.itemPrice}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      className={styles.removeItem}
                      onClick={() => dispatch(removeItem(item.id))}
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.cartSummary}>
              <div className={styles.cartTotal}>
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className={styles.cartTotal}>
                <span>Shipping:</span>
                <span>FREE</span>
              </div>
              <div className={styles.cartTotal}>
                <span>Estimated Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className={styles.grandTotal}>
                <span>Total:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className={styles.checkoutActions}>
              <button
                className={styles.continueShopping}
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
              <button className={styles.checkoutButton}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
