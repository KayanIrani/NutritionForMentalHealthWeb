import React from "react";
import HomeStyles from "./css/HomeStyles.module.css";

const Home = () => {
  const sentences = [
    "Improve Mood – Nutrients like omega-3s, B vitamins, and magnesium play a key role in reducing anxiety and depression.",
    "Boost Brain Function – Proper nutrition sharpens memory, focus, and overall cognitive performance.",
    "Reduce Stress – Stable blood sugar from balanced meals helps regulate mood swings and stress responses.",
    "Support Sleep & Recovery – Foods rich in tryptophan and complex carbs can improve sleep quality, which is vital for mental health.",
    "Protect Long-Term Mental Well-being – Healthy eating habits lower the risk of mental health disorders over time.",
  ];

  const cards = {
    "Better Brain Function":
      "Omega-3s and antioxidants support memory and focus.",
    "Help produce neurotransmitters":
      "B Vitamins help reduce fatigue, support energy metabolism in brain cells, and protect against cognitive decline.",
    "Protect brain cells from oxidative stress":
      "Antioxidants help slow aging of the brain, improve memory and learning.",
    "Calms the nervous system":
      "Magnesium helps reduces stress and anxiety, supports learning and memory",
  };

  const featured_foods = {
    "Mood-Boosting Foods": "Leafy greens Berries Nuts",
    "Focus & Memory":
      "Fatty fish (salmon, sardines) Walnuts Flaxseeds Dark chocolate",
    "Stress & Anxiety-Calming":
      "Green tea Chamomile Pumpkin seeds Spinach (magnesium-rich)",
    "Sleep-Supporting": "Kiwi Tart cherry Warm milk or yogurt Oats Almonds",
    "Gut–Brain Support":
      "Yogurt with live cultures Kefir Sauerkraut Kimchi Miso",
    "Steady Energy (No Crashes)":
      "Oats Quinoa Sweet potatoes Lentils Chickpeas",
    "Anti-Inflammatory":
      "Turmeric (with black pepper) Olive oil, Tomatoes Berries",
    "Hydration & Electrolytes": "Water Coconut water Oranges Bananas",
  };

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
      </section>

      {/* Nutrition Imp Section */}
      <section className="py-3">
        <div className="container text-start py-5">
          {/* <h2 class="fw-justify">Why Nutrition Matters</h2> */}
          <div class={HomeStyles.sectionHeading}>
            <h2>Why Nutrition Matters</h2>
          </div>
          <p class="lead mt-3">
            What we eat doesn’t just fuel our body—it also shapes our mood,
            memory, and focus. Research shows balanced nutrition helps reduce
            anxiety, depression, and brain fog. Nutrition is more than just
            food—it’s the foundation of our overall health and well-being. The
            choices we make every day about what we eat can shape how we feel,
            think, and live. A balanced diet rich in whole foods, vitamins, and
            minerals can:
          </p>

          <ul>
            {sentences.map((sentence) => (
              <li class="lead mt-3">{sentence}</li>
            ))}
          </ul>
          <p class="lead mt-3">
            Just like exercise strengthens the body, nutrition strengthens the
            mind. Making mindful food choices can be a powerful step toward
            resilience, clarity, and emotional balance.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-5">
        <div className="container text-start">
          <div class={`${HomeStyles.sectionHeading} mb-4`}>
            <h2>Benefits</h2>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {Object.entries(cards).map(([key, value]) => (
              <div className="col-md-3">
                <div className={`card text-center ${HomeStyles.card}`}>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-3">
                      <b>{key}</b>
                    </h5>
                    <p className="card-text flex-grow-1">{value}</p>
                    <a
                      href="#"
                      className={`btn btn-lg mt-auto ${HomeStyles.exploreBtn}`}
                    >
                      Go Somewhere
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Foods */}
      <section class="py-5">
        <div class="container text-start">
          <div class={`${HomeStyles.sectionHeading} mb-4`}>
            <h2>Featured Foods for Mental Health</h2>
          </div>
          <div class="row text-center">
            {Object.entries(featured_foods).map(([key, value]) => (
              <div class="col-md-4">
                <div class="p-4 border rounded">
                  <h5>{key}</h5>
                  <p className="flex-grow-1">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-5">
        <div className="container text-start">
          <div class={`${HomeStyles.sectionHeading} mb-4`}>
            <h2>Join Our Community</h2>
          </div>
          <p>
            Get free recipes, food–mood tips, and guides for a healthier mind.
          </p>
          <a href="#" className={`btn btn-lg mt-auto ${HomeStyles.exploreBtn}`}>
            Subscribe Now
          </a>
        </div>
      </section>
      
      {/* Footer */}
      <footer class="bg-dark text-center text-white py-3">
        <p class="mb-0">
          © 2025 Mindful Nutrition | About Us | Resources | Contact
        </p>
      </footer>
    </div>
  );
};

export default Home;
