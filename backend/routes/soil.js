const express = require('express');
const router = express.Router();

// Analyze soil sample
router.post('/analyze', (req, res) => {
  try {
    const { userId, imageData } = req.body;

    // Simulated soil analysis
    // database of realistic soil scenarios
    const soilScenarios = [
      {
        type: 'Nitrogen Deficient Loam',
        ph: 6.8, n: 45, p: 35, k: 180, humidity: 30,
        recommendation: 'Detected yellowing in older leaves. Critical Nitrogen deficiency. \n🌱 Organic: Apply Vermicompost (2 tons/acre) or grow legume cover crops. \n🧪 Chemical: Apply Urea in split doses. \n💧 Water: Ensure adequate moisture for N uptake.'
      },
      {
        type: 'Acidic Red Soil',
        ph: 5.2, n: 120, p: 15, k: 200, humidity: 45,
        recommendation: 'Soil is highly Acidic (pH 5.2). Phosphorus lock-up likely. \n🌱 Organic: Add wood ash or bone meal. \n🧪 Chemical: Apply Lime (Calcium Carbonate) at 500kg/acre to raise pH. \n⚠ Crop: Suitable for Tea/Coffee, but poor for vegetables.'
      },
      {
        type: 'Alkaline Clay',
        ph: 8.4, n: 140, p: 40, k: 250, humidity: 60,
        recommendation: 'Soil is Saline/Alkaline. Poor drainage detected. \n🌱 Organic: Use acidic compost or pine needle mulch. \n🧪 Chemical: Apply Gypsum to displace sodium and Sulfur to lower pH. \n💧 Irrigate with fresh water to leach salts.'
      },
      {
        type: 'Ideal Garden Soil',
        ph: 6.5, n: 160, p: 50, k: 220, humidity: 55,
        recommendation: 'Excellent soil health! Balanced NPK and ideal pH. \n✅ Recommended: Suitable for all vegetables (Tomato, Capsicum, Spinach). \n🌟 Tip: Maintain organic matter with annual manure application.'
      },
      {
        type: 'Phosphorus Deficient Sandy Soil',
        ph: 7.2, n: 110, p: 10, k: 130, humidity: 20,
        recommendation: 'Root development may be stunted due to low Phosphorus. \n🌱 Organic: Rock Phosphate or Bone Meal. \n🧪 Chemical: Apply DAP (Diammonium Phosphate) near root zone. \n💧 Mulch heavily to retain moisture in sandy texture.'
      }
    ];

    const scenario = soilScenarios[Math.floor(Math.random() * soilScenarios.length)];

    const analysis = {
      userId,
      timestamp: new Date(),
      ph: scenario.ph,
      nitrogen: scenario.n,
      phosphorus: scenario.p,
      potassium: scenario.k,
      humidity: scenario.humidity,
      recommendation: scenario.recommendation
    };

    res.json({
      success: true,
      analysis
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
