import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './LandingPage.css';

const LandingPage = () => {
    const heroRef = useRef(null);
    const featuresRef = useRef(null);

    useEffect(() => {
        // Simple entry animations
        const tl = gsap.timeline();

        tl.from(heroRef.current.children, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.from(entry.target.children, {
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power3.out"
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        if (featuresRef.current) {
            observer.observe(featuresRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="landing-page">
            {/* Navbar (simplified for landing) */}
            <nav className="navbar">
                <div className="logo">FarmWise</div>
                <div className="menu">
                    <Link to="/signin" className="btn-secondary-lg" style={{ padding: '8px 25px', fontSize: '1rem', border: '1px solid #1f5135' }}>Sign In</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="landing-hero">
                {/* Decorative floating elements */}
                <div className="floating-element" style={{ top: '15%', left: '10%', padding: '20px' }}>
                    <span style={{ fontSize: '2rem' }}>🌿</span>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>98% Accuracy</p>
                </div>
                <div className="floating-element" style={{ bottom: '20%', right: '10%', padding: '20px', animationDelay: '1s' }}>
                    <span style={{ fontSize: '2rem' }}>🤖</span>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>AI Powered</p>
                </div>

                <div className="hero-content" ref={heroRef}>
                    <h1 className="hero-title">The Future of <br />Smart Farming</h1>
                    <p className="hero-subtitle">
                        Empowering farmers with AI-driven insights for Soil Analysis, Crop Health, and Smart Planning.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/signup" className="btn-primary-lg">Get Started</Link>
                        <a href="#features" className="btn-secondary-lg">Learn More</a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
                <div className="section-header">
                    <h2>Everything You Need</h2>
                    <p style={{ color: '#666', fontSize: '1.2rem' }}>A complete ecosystem for modern agriculture</p>
                </div>

                <div className="features-grid" ref={featuresRef}>
                    <div className="feature-card soil">
                        <div className="feature-icon soil-icon">🌍</div>
                        <h3 className="feature-title">Soil Analysis</h3>
                        <p className="feature-desc">Instantly analyze soil health, pH levels, and nutrient composition using basic image processing.</p>
                    </div>

                    <div className="feature-card crop">
                        <div className="feature-icon crop-icon">🌿</div>
                        <h3 className="feature-title">Crop Protection</h3>
                        <p className="feature-desc">Detect diseases early with our AI scanner and get immediate treatment recommendations.</p>
                    </div>

                    <div className="feature-card advisor">
                        <div className="feature-icon advisor-icon">🤖</div>
                        <h3 className="feature-title">AI Advisor</h3>
                        <p className="feature-desc">24/7 agricultural expert to answer your queries about farming techniques and government schemes.</p>
                    </div>

                    <div className="feature-card planner">
                        <div className="feature-icon planner-icon">📅</div>
                        <h3 className="feature-title">Smart Planner</h3>
                        <p className="feature-desc">Plan your planting schedule based on seasons to maximize yield and profit.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
