import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Product.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../Redux/Slice/cartSlice";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import {
  FiFilter,
  FiShoppingCart,
  FiPlus,
  FiMinus,
  FiStar,
} from "react-icons/fi";

const Product = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: { min: 0, max: 1000 },
    rating: 0,
    stockStatus: "all",
  });

  const [showFilter, setShowFilter] = useState(false);

  // Fetch products, categories, and brands from a single API
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://dummyjson.com/products?limit=100")
      .then((res) => {
        const fetchedProducts = res.data.products;
        setProducts(fetchedProducts);

        const uniqueBrands = [
          ...new Set(fetchedProducts.map((p) => p.brand)),
        ];
        setBrands(uniqueBrands);

        const uniqueCategories = [
          ...new Set(fetchedProducts.map((p) => p.category)),
        ].map((cat) => ({
          name: cat.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          slug: cat,
        }));
        setCategories(uniqueCategories);

        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const inCategory =
      filters.categories.length === 0 ||
      filters.categories.some(
        (cat) =>
          product.category.toLowerCase() === cat.toLowerCase().replace(" ", "-")
      );

    const inBrand =
      filters.brands.length === 0 || filters.brands.includes(product.brand);

    const inPriceRange =
      product.price >= filters.priceRange.min &&
      product.price <= filters.priceRange.max;

    const meetsRating = product.rating >= filters.rating;

    const meetsStockStatus =
      filters.stockStatus === "all" ||
      (filters.stockStatus === "in-stock" && product.stock > 0) ||
      (filters.stockStatus === "out-of-stock" && product.stock === 0);

    return (
      inCategory && inBrand && inPriceRange && meetsRating && meetsStockStatus
    );
  });

  const getQuantity = (productId) => {
    const item = cart.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FiStar key={i} className={styles.starFull} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FiStar key={i} className={styles.starHalf} />);
      } else {
        stars.push(<FiStar key={i} className={styles.starEmpty} />);
      }
    }

    return (
      <div className={styles.ratingContainer}>
        {stars}
        <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
      </div>
    );
  };

  const renderStockStatus = (stock) => {
    if (stock > 10) return <span className={styles.inStock}>In Stock</span>;
    if (stock > 0) return <span className={styles.lowStock}>Low Stock</span>;
    return <span className={styles.outOfStock}>Out of Stock</span>;
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.filterButtonWrapper}>
        <button
          onClick={() => setShowFilter(true)}
          className={styles.filterBtn}
        >
          <FiFilter className={styles.filterIcon} />
          Filter Products
        </button>
        {filteredProducts.length > 0 && (
          <span className={styles.filterCount}>
            {filteredProducts.length} products
          </span>
        )}
      </div>

      {showFilter && (
        <FilterSidebar
          categories={categories}
          brands={brands}
          filters={filters}
          setFilters={setFilters}
          onClose={() => setShowFilter(false)}
        />
      )}

      <div className={styles.productsContainer}>
        {filteredProducts.length === 0 ? (
          <div className={styles.noProducts}>
            <p>No products match your filters.</p>
            <button
              onClick={() =>
                setFilters({
                  categories: [],
                  brands: [],
                  priceRange: { min: 0, max: 1000 },
                  rating: 0,
                  stockStatus: "all",
                })
              }
              className={styles.resetFilters}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {filteredProducts.map((product) => {
              const quantity = getQuantity(product.id);

              return (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.imageContainer}>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className={styles.productImage}
                    />
                    {product.discountPercentage > 15 && (
                      <span className={styles.discountBadge}>
                        -{Math.round(product.discountPercentage)}%
                      </span>
                    )}
                    {product.rating >= 4.5 && (
                      <span className={styles.topRatedBadge}>Top Rated</span>
                    )}
                  </div>

                  <div className={styles.productInfo}>
                    <div className={styles.productHeader}>
                      <h3 className={styles.productName}>{product.title}</h3>
                      <span className={styles.productBrand}>
                        {product.brand}
                      </span>
                    </div>

                    <div className={styles.priceContainer}>
                      <p className={styles.productPrice}>
                        ${product.price.toFixed(2)}
                      </p>
                      {product.discountPercentage > 0 && (
                        <span className={styles.originalPrice}>
                          $
                          {(
                            product.price /
                            (1 - product.discountPercentage / 100)
                          ).toFixed(2)}
                        </span>
                      )}
                    </div>

                    {renderRatingStars(product.rating)}
                    {renderStockStatus(product.stock)}

                    <p className={styles.productDescription}>
                      {product.description}
                    </p>

                    {quantity === 0 ? (
                      <button
                        className={`${styles.addToCartButton} ${
                          product.stock === 0 ? styles.disabled : ""
                        }`}
                        onClick={() =>
                          product.stock > 0 &&
                          dispatch(
                            addItem({
                              id: product.id,
                              name: product.title,
                              price: product.price,
                              image: product.thumbnail,
                              quantity: 1,
                            })
                          )
                        }
                        disabled={product.stock === 0}
                      >
                        <FiShoppingCart className={styles.cartIcon} />
                        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                      </button>
                    ) : (
                      <div className={styles.quantityControl}>
                        <button
                          onClick={() => dispatch(removeItem(product.id))}
                          className={styles.qtyBtn}
                        >
                          <FiMinus />
                        </button>
                        <span className={styles.qty}>{quantity}</span>
                        <button
                          onClick={() =>
                            dispatch(
                              addItem({
                                id: product.id,
                                name: product.title,
                                price: product.price,
                                image: product.thumbnail,
                                quantity: 1,
                              })
                            )
                          }
                          className={styles.qtyBtn}
                          disabled={product.stock <= quantity}
                        >
                          <FiPlus />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
