import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Categories.module.css";

// Import category images
import vegetablesImg from "../assets/vegetables.png";
import fruitsImg from "../assets/fruits.png";
import drinksImg from "../assets/drinks.png";
import instantImg from "../assets/instant.png";
import dairyImg from "../assets/dairy.png";
import bakeryImg from "../assets/bakery.png";
import grainsImg from "../assets/grains.png";

const categories = [
  { name: "Vegetables", image: vegetablesImg, path: "/category/vegetables" },
  { name: "Fruits", image: fruitsImg, path: "/category/fruits" },
  { name: "Drinks", image: drinksImg, path: "/category/drinks" },
  { name: "Instant", image: instantImg, path: "/category/instant" },
  { name: "Dairy", image: dairyImg, path: "/category/dairy" },
  { name: "Bakery", image: bakeryImg, path: "/category/bakery" },
  { name: "Grains", image: grainsImg, path: "/category/grains" },
];

const Categories = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Categories</h2>
      <div className={styles.grid}>
        {categories.map((cat, index) => (
          <Link to={cat.path} key={index} className={styles.card}>
            <img src={cat.image} alt={cat.name} />
            <h3>{cat.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
