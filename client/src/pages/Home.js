import React from "react";
import styles from "../styles/Home.module.css";
import homeImage from "../assets/home.png";

const Home = () => {
  return (
    <div className={styles.home}>
      {/* Banner Section */}
      <div className={styles.banner}>
        <div className={styles.bannerText}>
          <h1>
            Freshness You Can <br />
            Trust, Savings You <br />
            will Love!
          </h1>
          <div className={styles.buttons}>
            <button className={styles.shopBtn}>Shop now</button>
            <button className={styles.dealsBtn}>Explore deals →</button>
          </div>
        </div>
        <div className={styles.bannerImage}>
          <img src={homeImage} alt="Fresh Vegetables" />
        </div>
      </div>
    </div>
  );
};

export default Home;
