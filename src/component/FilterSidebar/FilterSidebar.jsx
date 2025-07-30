import React, { useState, useEffect } from "react";
import styles from "./FilterSidebar.module.scss";
import { FiX, FiStar, FiChevronDown, FiChevronUp } from "react-icons/fi";

const FilterSidebar = ({ categories, brands, filters, setFilters, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    price: true,
    rating: true,
    stock: true
  });

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleCategory = (categoryName) => {
    const newCategories = localFilters.categories.includes(categoryName)
      ? localFilters.categories.filter((c) => c !== categoryName)
      : [...localFilters.categories, categoryName];
    setLocalFilters({ ...localFilters, categories: newCategories });
  };

  const toggleBrand = (brand) => {
    const newBrands = localFilters.brands.includes(brand)
      ? localFilters.brands.filter((b) => b !== brand)
      : [...localFilters.brands, brand];
    setLocalFilters({ ...localFilters, brands: newBrands });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({
      ...localFilters,
      priceRange: {
        ...localFilters.priceRange,
        [name]: Number(value),
      },
    });
  };

  const handleRatingChange = (rating) => {
    setLocalFilters({
      ...localFilters,
      rating: localFilters.rating === rating ? 0 : rating,
    });
  };

  const handleStockStatusChange = (status) => {
    setLocalFilters({
      ...localFilters,
      stockStatus: status,
    });
  };

  const applyFilters = () => {
    setFilters(localFilters);
    onClose();
  };

  const clearFilters = () => {
    setLocalFilters({
      categories: [],
      brands: [],
      priceRange: { min: 0, max: 1000 },
      rating: 0,
      stockStatus: "all",
    });
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h2>Filters</h2>
        <div className={styles.headerActions}>
          <button className={styles.clearButton} onClick={clearFilters}>
            Clear all
          </button>
          <button className={styles.closeBtn} onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>
      </div>

      <div className={styles.filterContent}>
        {/* Categories */}
        <div className={styles.filterSection}>
          <div className={styles.sectionHeader} onClick={() => toggleSection("categories")}>
            <h3>Categories</h3>
            {expandedSections.categories ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {expandedSections.categories && (
            <div className={styles.checkboxGroup}>
              {categories.map((category) => (
                <label key={category.name} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={localFilters.categories.includes(category.name)}
                    onChange={() => toggleCategory(category.name)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>{category.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Brands */}
        <div className={styles.filterSection}>
          <div className={styles.sectionHeader} onClick={() => toggleSection("brands")}>
            <h3>Brands</h3>
            {expandedSections.brands ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {expandedSections.brands && (
            <div className={styles.checkboxGroup}>
              {brands.map((brand) => (
                <label key={brand} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={localFilters.brands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.labelText}>{brand}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className={styles.filterSection}>
          <div className={styles.sectionHeader} onClick={() => toggleSection("price")}>
            <h3>Price Range</h3>
            {expandedSections.price ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {expandedSections.price && (
            <div className={styles.priceRange}>
              <div className={styles.priceInputs}>
                <div className={styles.inputGroup}>
                  <span className={styles.currency}>$</span>
                  <input
                    type="number"
                    name="min"
                    value={localFilters.priceRange.min}
                    min="0"
                    max={localFilters.priceRange.max}
                    onChange={handlePriceChange}
                    placeholder="Min"
                  />
                </div>
                <div className={styles.dash}>-</div>
                <div className={styles.inputGroup}>
                  <span className={styles.currency}>$</span>
                  <input
                    type="number"
                    name="max"
                    value={localFilters.priceRange.max}
                    min={localFilters.priceRange.min}
                    max="10000"
                    onChange={handlePriceChange}
                    placeholder="Max"
                  />
                </div>
              </div>
              <div className={styles.rangeSliderContainer}>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={localFilters.priceRange.min}
                  onChange={(e) =>
                    handlePriceChange({ target: { name: "min", value: e.target.value } })
                  }
                  className={styles.rangeSlider}
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={localFilters.priceRange.max}
                  onChange={(e) =>
                    handlePriceChange({ target: { name: "max", value: e.target.value } })
                  }
                  className={styles.rangeSlider}
                />
              </div>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className={styles.filterSection}>
          <div className={styles.sectionHeader} onClick={() => toggleSection("rating")}>
            <h3>Customer Reviews</h3>
            {expandedSections.rating ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {expandedSections.rating && (
            <div className={styles.ratingFilter}>
              {[4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  className={`${styles.ratingButton} ${
                    localFilters.rating >= rating ? styles.active : ""
                  }`}
                  onClick={() => handleRatingChange(rating)}
                >
                  <div className={styles.starsContainer}>
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <FiStar
                          key={i}
                          className={`${styles.ratingStar} ${
                            i < rating ? styles.filled : ""
                          }`}
                        />
                      ))}
                  </div>
                  <span className={styles.ratingText}>{rating} & Up</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Stock */}
        <div className={styles.filterSection}>
          <div className={styles.sectionHeader} onClick={() => toggleSection("stock")}>
            <h3>Availability</h3>
            {expandedSections.stock ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {expandedSections.stock && (
            <div className={styles.radioGroup}>
              {["all", "in-stock", "out-of-stock"].map((status) => (
                <label key={status} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="stockStatus"
                    checked={localFilters.stockStatus === status}
                    onChange={() => handleStockStatusChange(status)}
                  />
                  <span className={styles.radiomark}></span>
                  <span className={styles.labelText}>
                    {status === "all"
                      ? "All Products"
                      : status === "in-stock"
                      ? "In Stock Only"
                      : "Out of Stock"}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.actionButtons}>
        <button className={styles.applyButton} onClick={applyFilters}>
          Show Results
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
