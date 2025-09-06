import React from "react";
import HomeStyles from "./css/HomeStyles.module.css";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-white text-center py-5">
        <div className="container">
          <h1 className={`display-5 ${HomeStyles.heroHeading}`}>
            Nourish Your Mind with the Right Foods
          </h1>
          <p className="lead mb-3">
            Discover how nutrition can boost mood, reduce stress, and improve
            your mental well-being.
          </p>
          <a href="#" className={`btn btn-lg ${HomeStyles.exploreBtn}`}>
            Explore Foods for Mental Health
          </a>
        </div>

        {/* Nutrition Imp Section */}
        <section className="py-5">
          <div className="container text-start">
            {/* <h2 class="fw-justify">Why Nutrition Matters</h2> */}
            <div class={HomeStyles.nutrition}>
              <h2>Why Nutrition Matters</h2>
            </div>
            <p class="lead mt-3">
              What we eat doesn’t just fuel our body—it also shapes our mood,
              memory, and focus. Research shows balanced nutrition helps reduce
              anxiety, depression, and brain fog.
            </p>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Home;
