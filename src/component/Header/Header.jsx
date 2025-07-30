import React, { useState } from 'react';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaStore, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Calculate total quantity in cart
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.logo}>
          <FaStore className={styles.storeIcon} />
          <span>MyStore</span>
        </Link>

        {/* Mobile menu button */}
        <button className={styles.menuButton} onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation - desktop and mobile */}
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <Link to="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Home</Link>
          {/* <Link to="/products" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Products</Link> */}
          <Link to="/about" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>About</Link>
          
          {/* Mobile cart link - only visible in mobile menu */}
          <Link 
            to="/cart" 
            className={`${styles.cartLink} ${styles.mobileCartLink}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className={styles.cartIconContainer}>
              <FaShoppingCart className={styles.cartIcon} />
              {totalQuantity > 0 && (
                <span className={styles.cartCount}>{totalQuantity}</span>
              )}
            </div>
            <span className={styles.cartText}>Cart</span>
          </Link>
        </nav>

        {/* Desktop cart link - hidden on mobile */}
        <Link to="/cart" className={`${styles.cartLink} ${styles.desktopCartLink}`}>
          <div className={styles.cartIconContainer}>
            <FaShoppingCart className={styles.cartIcon} />
            {totalQuantity > 0 && (
              <span className={styles.cartCount}>{totalQuantity}</span>
            )}
          </div>
          <span className={styles.cartText}>Cart</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;