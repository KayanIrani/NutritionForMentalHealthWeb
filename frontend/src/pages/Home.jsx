import React from "react";
import HomeStyles from "./css/HomeStyles.module.css";

const Home = () => {
  const sentences = [
    "Improve Mood - Nutrients like omega-3s, B vitamins, and magnesium play a key role in reducing anxiety and depression.",
    "Boost Brain Function - Proper nutrition sharpens memory, focus, and overall cognitive performance.",
    "Reduce Stress - Stable blood sugar from balanced meals helps regulate mood swings and stress responses.",
    "Support Sleep & Recovery - Foods rich in tryptophan and complex carbs can improve sleep quality, which is vital for mental health.",
    "Protect Long-Term Mental Well-being - Healthy eating habits lower the risk of mental health disorders over time.",
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
  "Mood-Boosting Foods":
    "Leafy greens, berries, and nuts are rich in vitamins, antioxidants, and healthy fats that help support serotonin and balance mood.",

  "Focus & Memory":
    "Fatty fish like salmon and sardines, walnuts, flaxseeds, and dark chocolate provide omega-3s and flavonoids that sharpen focus and memory.",

  "Stress & Anxiety-Calming":
    "Green tea, chamomile, pumpkin seeds, and magnesium-rich spinach can ease stress and calm the nervous system.",

  "Sleep-Supporting":
    "Kiwi, tart cherries, warm milk or yogurt, oats, and almonds contain melatonin, tryptophan, and minerals that promote restful sleep.",

  "Gut-Brain Support":
    "Yogurt with live cultures, kefir, sauerkraut, kimchi, and miso supply probiotics that strengthen gut health and support the brain–gut connection.",

  "Steady Energy (No Crashes)":
    "Oats, quinoa, sweet potatoes, lentils, and chickpeas release energy slowly, keeping blood sugar stable and energy steady.",

  "Anti-Inflammatory":
    "Turmeric with black pepper, olive oil, tomatoes, and berries are powerful anti-inflammatory foods that protect cells and reduce chronic inflammation.",

  "Hydration & Electrolytes":
    "Water, coconut water, oranges, and bananas restore hydration and electrolytes to keep the body balanced and energized."
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

      {/* Nutrition Importance Section */}
      <section className="py-3">
        <div className="container text-start py-5">
          <div className={HomeStyles.sectionHeading}>
            <h2>Why Nutrition Matters</h2>
          </div>
          <p className="lead mt-3">
            What we eat doesn't just fuel our body—it also shapes our mood,
            memory, and focus. Research shows balanced nutrition helps reduce
            anxiety, depression, and brain fog. Nutrition is more than just
            food—it's the foundation of our overall health and well-being. The
            choices we make every day about what we eat can shape how we feel,
            think, and live. A balanced diet rich in whole foods, vitamins, and
            minerals can:
          </p>

          <ul>
            {sentences.map((sentence, index) => (
              <li key={index} className="lead mt-3">
                {sentence}
              </li>
            ))}
          </ul>

          <p className="lead mt-3">
            Just like exercise strengthens the body, nutrition strengthens the
            mind. Making mindful food choices can be a powerful step toward
            resilience, clarity, and emotional balance.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-5">
        <div className="container text-start">
          <div className={`${HomeStyles.sectionHeading} mb-4`}>
            <h2>Benefits</h2>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {Object.entries(cards).map(([key, value], index) => (
              <div key={index} className="col-md-3">
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
      <section id="FF_id" className="py-5">
        <div className="container text-start">
          <div className={`${HomeStyles.sectionHeading} mb-4`}>
            <h2>Featured Foods for Mental Health</h2>
          </div>
          <div className="row text-center">
            {Object.entries(featured_foods).map(([key, value], index) => (
              <div key={index} className="col-md-4" style={{ padding: "20px" }}>
                <div
                  className={`p-4 border ${HomeStyles.featureCards}`}
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "30px",
                  }}
                >
                  <h5 style={{ marginBottom: "23px" }}>{key}</h5>
                  <p
                    className="flex-grow-1"
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section  className="py-5">
        <div className="container text-start">
          <div className={`${HomeStyles.sectionHeading} mb-4`}>
            <h2>Join Our Community</h2>
          </div>
          <p>
            Get free recipes, food-mood tips, and guides for a healthier mind.
          </p>
          <a href="#" className={`btn btn-lg mt-auto ${HomeStyles.exploreBtn}`}>
            Join Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
