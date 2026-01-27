import React, { useState, useRef } from 'react';
import axios from 'axios';
import './CropVisualization3D.css';

const CropVisualization3D = () => {
  const [scanning, setScanning] = useState(false);
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

  const handleScan = async () => {
    if (!selectedImage) {
      alert("Please capture or upload a crop image first.");
      return;
    }

    setScanning(true);
    setResults(null);

    try {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : { id: 'guest' };

      const response = await axios.post('http://localhost:5000/api/crop/analyze', {
        userId: user.id,
        imageData: 'dummy-crop-image'
      });

      if (response.data.success) {
        setTimeout(() => {
          setResults(response.data.analysis);
          setScanning(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Crop scan failed", error);
      setScanning(false);
      alert("Analysis failed. Please try again.");
    }
  };

  return (
    <>
      <main className="main">
        <section className="left-section">
          <div className="capture-card">
            <div className="icon-box" onClick={handleCameraClick}>
              {selectedImage ? <img src={selectedImage} alt="Crop" style={{ width: '100%', height: '100%', borderRadius: '22px', objectFit: 'cover' }} /> : '🌿'}
            </div>
            <h2>Capture Crop</h2>
            <p>Take a clear photo of the crop leaf<br />for disease detection.</p>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>

          <button className="scan-btn" onClick={handleScan} disabled={scanning}>
            {scanning ? "Analyzing..." : "🔍 Analyze Crop"}
          </button>
        </section>

        <section className="right-section">
          {!results ? (
            <>
              <div className="analysis-icon">🧪</div>
              <h2>Ready for Crop Analysis</h2>
            </>
          ) : (
            <div className="advisor-card" style={{ width: '100%', boxShadow: 'none', border: '1px solid #eee' }}>
              <div className="advisor-header" style={{ padding: '20px', background: results.disease === 'Healthy' ? '#4CAF50' : '#f44336' }}>
                <div>
                  <h2>Crop Report</h2>
                  <span className="status">● COMPLETE</span>
                </div>
              </div>
              <div className="advisor-body" style={{ minHeight: 'auto', padding: '20px', alignItems: 'flex-start', textAlign: 'left' }}>
                <div style={{ width: '100%' }}>
                  <h3>Diagnosis: {results.disease}</h3>
                  <p>Confidence: {results.confidence}</p>
                  <p>Severity: {results.severity}</p>

                  {results.bestTime && (
                    <div style={{ margin: '15px 0', padding: '10px', background: '#f0fdf4', borderRadius: '8px', fontSize: '0.9rem' }}>
                      <p style={{ marginBottom: '5px' }}><strong>📅 Best Time to Grow:</strong> {results.bestTime}</p>
                      <p style={{ color: '#d32f2f' }}><strong>❌ Avoid Planting:</strong> {results.worstTime}</p>
                    </div>
                  )}

                  <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #eee' }} />
                  <p><strong>Treatment Plan:</strong> {results.treatment}</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <h2>FarmWise Intelligence</h2>
        <div className="stats">
          <div><h1>0</h1><p>CROP REPORTS</p></div>
          <div><h1>0</h1><p>ALERTS</p></div>
        </div>
      </footer>
    </>
  );
};

export default CropVisualization3D;
