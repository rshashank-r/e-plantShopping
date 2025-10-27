import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  
  const [showProductList, setShowProductList] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false); 

  const handleGetStartedClick = () => {
    setIsAnimating(true); // Start the fade-out animation
    // Timeout matches the 0.5s transition in App.css
    setTimeout(() => {
        setShowProductList(true);
        setIsAnimating(false);
    }, 500); 
  };

  const handleHomeClick = () => {
    setShowProductList(false);
  };

  return (
    <div className="app-container">
      {/* Landing Page is rendered until the product list is fully visible */}
      {!(showProductList && !isAnimating) && (
        <div className={`landing-page ${isAnimating ? 'fade-out' : ''}`}> 
          <div className="background-image"></div>
          <div className="content">
           <div className="landing_content">
           <h1>Welcome To Paradise Nursery</h1>
            <div className="divider"></div>
            <p>Where Green Meets Serenity</p>
           
            <button className="get-started-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
           </div>
            <div className="aboutus_container">
            <AboutUs/>
            </div>
          </div>
        </div>
      )}
      
      {/* Product List is rendered based on showProductList state */}
      <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
        <ProductList onHomeClick={handleHomeClick}/>
      </div>
    </div>
  );
}

export default App;