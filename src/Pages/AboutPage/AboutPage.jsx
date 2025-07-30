import React from "react";
import styles from "./AboutPage.module.scss";
import teamImage from "../../assets/images/team.jpg";
import storeImage from "../../assets/images/store.jpg";
import deliveryImage from "../../assets/images/delivery.jpg";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.aboutPage}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Our Story</h1>
          <p>
            Discover the journey behind MyStore - your trusted shopping
            destination
          </p>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className={styles.container}>
          <div className={styles.aboutContent}>
            <h2>Welcome to MyStore</h2>
            <p>
              Founded in 2015, MyStore began as a small local shop with a big
              dream - to revolutionize the way people shop. Today, we've grown
              into one of the leading e-commerce platforms, serving millions of
              satisfied customers worldwide.
            </p>
            <p>
              Our mission is simple: to provide high-quality products at
              affordable prices with exceptional customer service. We carefully
              curate our selection to bring you the best items from trusted
              brands and emerging designers.
            </p>
          </div>
          <div className={styles.aboutImage}>
            <img src={storeImage} alt="MyStore physical location" />
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <h2>Our Core Values</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>💎</div>
            <h3>Quality</h3>
            <p>
              We source only the finest products and stand behind everything we
              sell.
            </p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>💰</div>
            <h3>Value</h3>
            <p>
              Great products shouldn't break the bank. We work hard to keep
              prices fair.
            </p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>🚚</div>
            <h3>Fast Delivery</h3>
            <p>Get your orders quickly with our efficient shipping network.</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>❤️</div>
            <h3>Customer Care</h3>
            <p>
              Your satisfaction is our top priority. We're here to help 24/7.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.teamSection}>
        <div className={styles.container}>
          <div className={styles.teamImage}>
            <img src={teamImage} alt="MyStore team" />
          </div>
          <div className={styles.teamContent}>
            <h2>Meet Our Team</h2>
            <p>
              Behind MyStore is a dedicated team of professionals passionate
              about delivering excellent shopping experiences. From our buyers
              who carefully select each product to our customer service
              representatives who are always ready to help, we work together to
              make MyStore your favorite shopping destination.
            </p>
            <p>
              We're proud of our diverse team that brings together expertise
              from retail, technology, logistics, and marketing to create a
              seamless shopping experience for you.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.deliverySection}>
        <div className={styles.container}>
          <div className={styles.deliveryContent}>
            <h2>Fast & Reliable Delivery</h2>
            <p>
              We've partnered with leading logistics providers to ensure your
              orders arrive quickly and in perfect condition. Our warehouses are
              strategically located across the country to minimize delivery
              times.
            </p>
            <ul>
              <li>Same-day dispatch for orders before 3pm</li>
              <li>Free shipping on orders over $50</li>
              <li>Real-time tracking for all shipments</li>
              <li>Easy returns within 30 days</li>
            </ul>
          </div>
          <div className={styles.deliveryImage}>
            <img src={deliveryImage} alt="Delivery service" />
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2>Ready to Shop?</h2>
        <p>
          Join millions of happy customers who trust MyStore for their shopping
          needs.
        </p>
        <button
          className={styles.shopButton}
          onClick={() => navigate("/")}
        >
          Start Shopping Now
        </button>
      </section>
    </div>
  );
};

export default AboutPage;
