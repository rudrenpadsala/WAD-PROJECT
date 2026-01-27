const express = require('express');
const router = express.Router();

// Get farming advice
router.post('/ask', (req, res) => {
  try {
    const { question, userId } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Comprehensive Agriculture Knowledge Base
    const responses = {
      // --- CROPS ---
      'rice': 'Rice requires standing water during growth. Best sown in Kharif. Use SRI method to save water. Watch out for Blast disease and Stem borer.',
      'paddy': 'For Paddy, maintain 2-5cm water level. Apply Urea in split doses. Zinc deficiency is common—apply Zinc Sulfate if leaves turn rusty brown.',
      'wheat': 'Wheat is a Ravi crop. Sowing: Nov-Dec. Crown Root Initiation (CRI) stage (21 days) is critical for irrigation. Rust is a major disease threat.',
      'tomato': 'Tomatoes need well-drained soil. Staking increases yield. Susceptible to Early Blight—spray Mancozeb. Leaf Curl Virus is spread by Whiteflies.',
      'potato': 'Potatoes need loose, aerated soil. Earth up soil around plants. Late Blight is a serious threat—monitor humidity and spray fungicides preventively.',
      'cotton': 'Cotton grows best in Black soil. BT Cotton resists Bollworm but watch for Sucking pests (Aphids/Jassids). Avoid waterlogging.',
      'sugarcane': 'Sugarcane is a long-duration crop. Deep planting helps prevention lodging. Red Rot is a major disease—select resistant varieties like Co-0238.',
      'maize': 'Maize (Corn) is sensitive to waterlogging. Spacing: 60x20cm. Fall Armyworm is a major pest—check whorls for sawdust-like excreta.',
      'corn': 'Corn requires nitrogen-rich soil. Apply Urea at knee-high stage and tasseling stage for best cob development.',
      'soybean': 'Soybean is an oilseed legume. Inculate seeds with Rhizobium culture. Yellow Mosaic Virus is common—control Whiteflies to prevent it.',
      'mustard': 'Mustard is a key Rabi oilseed. Sowing: Oct. Aphids ("Mahua") are the main pest—spray Imidacloprid if infestation is high.',
      'onion': 'Onions need sulfur-rich soil for pungency. Avoid nitrogen late in the season to improve storage life. Purple Blotch is a common fungal issue.',
      'chilli': 'Chilli plants are sensitive to excess water. Leaf Curl (Churda-Murda) is viral—control vectors (Thrips/Mites). Apply Neem oil regularly.',

      // --- SOIL & NUTRIENTS ---
      'clay': 'Clay soil has high water retention but poor drainage. Add organic matter (compost) and Gypsum to improve structure and drainage.',
      'sandy': 'Sandy soil drains too fast and holds few nutrients. Add lots of organic compost or manure. Use drip irrigation/sprinklers.',
      'loam': 'Loam is the ideal soil type (~40% sand, 40% silt, 20% clay). Suitable for almost all crops. Maintain fertility with crop rotation.',
      'black soil': 'Black soil (Regur) is rich in clay and ideal for Cotton, Sugarcane, and Soybeans. It holds moisture well but cracks when dry.',
      'red soil': 'Red soil is rich in iron but often acidic. Add Lime to correct pH. Suitable for Groundnut, Pulses, and Millets.',
      'acidic': 'Acidic soil (pH < 6) limits nutrient uptake. specificially Phosphorus. Apply Lime (Calcium Carbonate) to raise pH.',
      'alkaline': 'Alkaline soil (pH > 7.5) causes micronutrient deficiencies (Zinc/Iron). Apply Gypsum and use Acidic fertilizers like Ammonium Sulfate.',
      'nitrogen': 'Nitrogen promotes leafy growth. Deficiency: Older leaves turn yellow (V-shape). Sources: Urea, DAP, Manure.',
      'phosphorus': 'Phosphorus promotes root and fruit development. Deficiency: Leaves turn purple/dark green. Sources: DAP, SSP, Rock Phosphate.',
      'potassium': 'Potassium strengthens plants against stress and disease. Deficiency: Leaf edges burn/scorch. Sources: MOP (Muriate of Potash), Sulfate of Potash.',
      'zinc': 'Zinc deficiency causes "Khaira" disease in Rice and small leaves in fruits. Apply Zinc Sulfate as basal dose or foliar spray.',

      // --- PESTS & DISEASES ---
      'aphid': 'Aphids suck sap and spread viruses. Symptoms: Curling leaves, honeydew. Control: Neem oil, Ladybugs, Yellow sticky traps.',
      'whitefly': 'Whiteflies spread viral diseases like Leaf Curl. Control: Sticky traps, Imidacloprid spray, keeping field weed-free.',
      'bollworm': 'Pink Bollworm affects Cotton. Use Pheromone traps for monitoring. Destroy crop residues after harvest.',
      'termite': 'Termites attack roots, especially in dry soil. Treat seeds with Chlorpyriphos. Apply Neem cake in soil.',
      'nematode': 'Root-knot nematodes cause galls/swelling on roots. Rotate with Marigold (it repels them). Use Trichoderma in soil.',
      'blight': 'Blight causes rapid browning/death of leaves (e.g., Potato/Tomato). Bacterial: Copper Oxychloride. Fungal: Mancozeb/Ridomil.',
      'rust': 'Rust appears as rusty powders on leaves (Wheat, Pea). Plant resistant varieties. Spray Sulfur-based fungicides.',
      'powdery mildew': 'White powdery spots on leaves/stems. Common in dry/cool weather. Spray Wettable Sulfur or Hexaconazole.',

      // --- FARMING TECHNIQUES ---
      'hydroponic': 'Hydroponics grows plants in nutrient water without soil. Saves 90% water. Good for leafy greens like Lettuce, Spinach.',
      'organic farming': 'Focus on soil health using Compost, Manure, Bio-fertilizers. Avoid synthetic chemicals. Certification opens premium markets.',
      'mulch': 'Mulching covers soil to save moisture, suppress weeds, and regulate temperature. Plastic mulch or organic straw can be used.',
      'crop rotation': 'Never plant the same crop family back-to-back (e.g., Tomato then Potato). Alternate with Legumes to restore Nitrogen.',
      'drip': 'Drip irrigation delivers water to roots. Reduces weed growth and saves up to 50% water. Subsidies are available.',
      'greenhouse': 'Polhouses protect crops from weather/pests. Ideal for high-value crops like Capsicum, Cucumber, Flowers.',

      // --- GOVERNMENT SCHEMES (India Context) ---
      'pm kisan': 'PM-KISAN: ₹6,000/year income support to landholding farmers in 3 installments. Register at pmkisan.gov.in.',
      'kcc': 'Kisan Credit Card (KCC) gives short-term credit for crops at low interest (4% with timely repayment). Apply at any bank.',
      'fby': 'Pradhan Mantri Fasal Bima Yojana (PMFBY) offers insurance against crop loss due to natural calamities. Premium: 1.5-2% of sum insured.',
      'shc': 'Soil Health Card (SHC) scheme provides free soil testing every 2 years to recommend nutrient dosage.',
      'subsidy': 'Subsidies are available for Drip Irrigation (PMKSY), Solar Pumps (Kusum), and Farm Machinery (SMAM). Contact your Block Agriculture Officer.',

      // --- GENERAL KEYWORDS ---
      'weather': 'Always plan farm operations based on the 3-day forecast. Don\'t spray or irrigate if rain is expected.',
      'rain': 'Harvest mature crops immediately if rain is forecast. Ensure drainage in low-lying fields.',
      'market': 'Check e-NAM (National Agriculture Market) for prices. Selling directly to FPOs or consumers often yields better profit.',
      'profit': 'To maximize profit: Reduce input costs with organic inputs, focus on quality, and try to process/grade your produce before selling.'
    };

    const lowerQuestion = question.toLowerCase();

    // Logic: Find the LONGEST matching keyword. 
    // This ensures specific matches (e.g., "black soil") are found over generic ones (e.g., "soil").
    let bestMatch = null;
    let maxLen = 0;

    for (const key in responses) {
      if (lowerQuestion.includes(key)) {
        if (key.length > maxLen) {
          maxLen = key.length;
          bestMatch = responses[key];
        }
      }
    }

    const advice = bestMatch || responses['default'] || 'I am learning about that topic. Please contact a local expert for now.';

    res.json({
      question,
      answer: advice,
      timestamp: new Date(),
      userId
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
