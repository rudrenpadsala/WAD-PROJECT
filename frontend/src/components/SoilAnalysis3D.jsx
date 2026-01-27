import React, { useState, useRef } from 'react';
import axios from 'axios';
import './SoilAnalysis3D.css'; // Keeping the file name, but content is new styles

const SoilAnalysis3D = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setResults(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      alert("Please capture or upload a soil image first.");
      return;
    }

    setAnalyzing(true);
    setResults(null);

    try {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : { id: 'guest' };

      const response = await axios.post('http://localhost:5000/api/soil/analyze', {
        userId: user.id,
        imageData: 'dummy-image-data'
      });

      if (response.data.success) {
        setTimeout(() => {
          setResults(response.data.analysis);
          setAnalyzing(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Analysis failed", error);
      setAnalyzing(false);
      alert("Analysis failed. Please try again.");
    }
  };

  return (
    <>
      <main className="main">
        <section className="left-section">
          <div className="capture-card">
            <div className="icon-box" onClick={handleCameraClick}>
              {selectedImage ? <img src={selectedImage} alt="Soil" style={{ width: '100%', height: '100%', borderRadius: '22px', objectFit: 'cover' }} /> : '📷'}
            </div>
            <h2>Capture Soil</h2>
            <p>Place your soil sample in natural light<br />for best results.</p>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>

          <button className="scan-btn" onClick={handleAnalyze} disabled={analyzing}>
            {analyzing ? "Analyzing..." : "🔍 Initiate Scan"}
          </button>
        </section>

        <section className="right-section">
          {!results ? (
            <>
              <div className="analysis-icon">🧪</div>
              <h2>Ready for Analysis</h2>
              <p style={{ color: '#8a94a6' }}>Upload a sample to see Ph, Nitrogen,<br />and Moisture levels.</p>
            </>
          ) : (
            <div className="advisor-card" style={{ width: '100%', boxShadow: 'none', border: '1px solid #eee' }}>
              <div className="advisor-header" style={{ padding: '20px' }}>
                <div>
                  <h2>Soil Report</h2>
                  <span className="status">● COMPLETE</span>
                </div>
              </div>
              <div className="advisor-body" style={{ minHeight: 'auto', padding: '20px', alignItems: 'flex-start', textAlign: 'left' }}>
                <div style={{ width: '100%' }}>
                  <h3 style={{ color: results.ph < 6.5 ? 'orange' : 'green' }}>pH Level: {results.ph}</h3>
                  <p>Nitrogen: {results.nitrogen} mg/kg</p>
                  <p>Phosphorus: {results.phosphorus} mg/kg</p>
                  <p>Potassium: {results.potassium} mg/kg</p>
                  <p>Humidity: {results.humidity}%</p>
                  <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #eee' }} />
                  <p><strong>Recommendation:</strong> {results.recommendation}</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <h2>FarmWise Intelligence</h2>
        <div className="stats">
          <div><h1>0</h1><p>REPORTS</p></div>
          <div><h1>0</h1><p>PENDING TASKS</p></div>
        </div>
      </footer>
    </>
  );
};

export default SoilAnalysis3D;
