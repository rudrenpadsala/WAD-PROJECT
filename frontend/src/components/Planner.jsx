import React, { useState } from 'react';
import './Planner.css';

const Planner = () => {
    const [selectedSeason, setSelectedSeason] = useState(null);

    const seasons = [
        { id: 'summer', name: 'Summer', icon: '☀️', color: '#FFD54F', desc: 'March to June' },
        { id: 'monsoon', name: 'Monsoon', icon: '🌧️', color: '#90CAF9', desc: 'July to October' },
        { id: 'autumn', name: 'Autumn', icon: '🍂', color: '#FFAB91', desc: 'October to November' },
        { id: 'winter', name: 'Winter', icon: '❄️', color: '#B0BEC5', desc: 'December to February' },
        { id: 'spring', name: 'Spring', icon: '🌸', color: '#A5D6A7', desc: 'February to March' }
    ];

    const cropsData = {
        summer: [
            { name: 'Watermelon', duration: '80-100 days', water: 'Regular', profit: 'High' },
            { name: 'Cucumber', duration: '50-70 days', water: 'High', profit: 'Medium' },
            { name: 'Okra (Lady Finger)', duration: '60-180 days', water: 'Medium', profit: 'Medium' },
            { name: 'Bitter Gourd', duration: '55-60 days', water: 'Regular', profit: 'High' },
            { name: 'Pumpkin', duration: '90-120 days', water: 'Medium', profit: 'Medium' }
        ],
        monsoon: [
            { name: 'Rice (Paddy)', duration: '120-150 days', water: 'Very High', profit: 'High' },
            { name: 'Maize (Corn)', duration: '90-110 days', water: 'Medium', profit: 'Medium' },
            { name: 'Soybean', duration: '85-110 days', water: 'Medium', profit: 'High' },
            { name: 'Cotton', duration: '150-180 days', water: 'Medium', profit: 'High' },
            { name: 'Turmeric', duration: '7-9 months', water: 'High', profit: 'Very High' }
        ],
        autumn: [
            { name: 'Mustard', duration: '100-110 days', water: 'Low', profit: 'Medium' },
            { name: 'Spinach', duration: '45-60 days', water: 'Low', profit: 'Medium' },
            { name: 'Radish', duration: '40-50 days', water: 'Regular', profit: 'Medium' },
            { name: 'Turnip', duration: '50-60 days', water: 'Regular', profit: 'Medium' }
        ],
        winter: [
            { name: 'Wheat', duration: '120-140 days', water: 'Medium', profit: 'High' },
            { name: 'Barley', duration: '55-60 days', water: 'Low', profit: 'Medium' },
            { name: 'Potato', duration: '90-120 days', water: 'Medium', profit: 'High' },
            { name: 'Peas', duration: '60-70 days', water: 'Medium', profit: 'High' },
            { name: 'Cauliflower', duration: '85-90 days', water: 'Regular', profit: 'Medium' }
        ],
        spring: [
            { name: 'Sunflower', duration: '90-100 days', water: 'Medium', profit: 'High' },
            { name: 'Tomato', duration: '70-100 days', water: 'Regular', profit: 'High' },
            { name: 'Capsicum', duration: '70-80 days', water: 'Medium', profit: 'High' },
            { name: 'Cabbage', duration: '80-100 days', water: 'Regular', profit: 'Medium' }
        ]
    };

    return (
        <main className="main" style={{ flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
            <div className="planner-header">
                <h1>Crop Planner</h1>
                <p>Select a season to view recommended crops.</p>
            </div>

            <div className="seasons-grid">
                {seasons.map((season) => (
                    <div
                        key={season.id}
                        className={`season-card ${selectedSeason === season.id ? 'active' : ''}`}
                        onClick={() => setSelectedSeason(season.id)}
                        style={{ borderBottom: `4px solid ${season.color}` }}
                    >
                        <div className="season-icon">{season.icon}</div>
                        <h3>{season.name}</h3>
                        <p>{season.desc}</p>
                    </div>
                ))}
            </div>

            {selectedSeason && (
                <div className="crops-container fade-in">
                    <h2 style={{ marginBottom: '20px', color: '#1f5135' }}>
                        Recommended for {seasons.find(s => s.id === selectedSeason)?.name}
                    </h2>

                    <div className="crops-list">
                        {cropsData[selectedSeason].map((crop, index) => (
                            <div key={index} className="crop-card">
                                <div className="crop-header">
                                    <h4>{crop.name}</h4>
                                </div>
                                <div className="crop-details">
                                    <div className="detail-row">
                                        <span>⏳ Duration:</span>
                                        <strong>{crop.duration}</strong>
                                    </div>
                                    <div className="detail-row">
                                        <span>💧 Water:</span>
                                        <strong>{crop.water}</strong>
                                    </div>
                                    <div className="detail-row">
                                        <span>💰 Potential:</span>
                                        <strong style={{ color: crop.profit === 'High' || crop.profit === 'Very High' ? 'green' : '#666' }}>
                                            {crop.profit}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <footer className="footer" style={{ width: '100%', maxWidth: '1000px', marginTop: 'auto' }}>
                <h2>FarmWise Intelligence</h2>
                <div className="stats">
                    <div><h1>{Object.keys(cropsData).length}</h1><p>SEASONS</p></div>
                    <div><h1>20+</h1><p>CROPS DB</p></div>
                </div>
            </footer>
        </main>
    );
};

export default Planner;
