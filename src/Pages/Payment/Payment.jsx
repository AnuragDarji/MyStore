import React, { useState } from "react";
import styles from "./Payment.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCreditCard, FaCheckCircle, FaLock, FaShippingFast } from "react-icons/fa";

const Payment = () => {
  const [paid, setPaid] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { total } = location.state || { total: 0 };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setPaid(true);
      setIsProcessing(false);
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setExpiry(value);
  };

  if (!location.state) {
    navigate("/");
    return null;
  }

  return (
    <div className={styles.paymentPage}>
      <div className={styles.paymentContainer}>
        {!paid ? (
          <>
            <div className={styles.paymentHeader}>
              <h2><FaCreditCard /> Payment Details</h2>
              <div className={styles.securePayment}>
                <FaLock /> Secure Payment
              </div>
            </div>
            
            <div className={styles.amountDisplay}>
              <span>Total Amount:</span>
              <span className={styles.amount}>${total.toFixed(2)}</span>
            </div>
            
            <form onSubmit={handlePayment} className={styles.paymentForm}>
              <div className={styles.formGroup}>
                <label htmlFor="cardName">Cardholder Name</label>
                <input
                  type="text"
                  id="cardName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name on card"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                />
              </div>
              
              <div className={styles.cardDetails}>
                <div className={`${styles.formGroup} ${styles.expiry}`}>
                  <label htmlFor="expiry">Expiry Date</label>
                  <input
                    type="text"
                    id="expiry"
                    value={expiry}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>
                
                <div className={`${styles.formGroup} ${styles.cvv}`}>
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                className={styles.payButton}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
              </button>
              
              
            </form>
          </>
        ) : (
          <div className={styles.successContainer}>
            <div className={styles.successIcon}>
              <FaCheckCircle />
            </div>
            <h2>Payment Successful!</h2>
            <p className={styles.successAmount}>${total.toFixed(2)} has been processed</p>
            
            <div className={styles.deliveryInfo}>
              <FaShippingFast className={styles.shippingIcon} />
              <p>Your order will be delivered within 2-3 business days</p>
            </div>
            
            <div className={styles.orderDetails}>
              <p>A confirmation has been sent to your email</p>
              <p>Order ID: #{Math.floor(Math.random() * 1000000)}</p>
            </div>
            
            <button 
              onClick={() => navigate("/")} 
              className={styles.continueShopping}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;