import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  
  const [showProductList, setShowProductList] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false); // New state for animation control

  const handleGetStartedClick = () => {
    setIsAnimating(true); // Start the fade-out animation
    // Set a timeout to switch views after the animation duration (e.g., 500ms)
    setTimeout(() => {
        setShowProductList(true);
        setIsAnimating(false);
    }, 500); // **NOTE**: Adjust 500ms to match your CSS transition duration in App.css
  };

  const handleHomeClick = () => {
    // When going back home, no animation is typically needed, just switch view
    setShowProductList(false);
  };

  return (
    <div className="app-container">
      {/* Use isAnimating to trigger the fade-out class */}
      <div className={`landing-page ${isAnimating ? 'fade-out' : ''} ${showProductList ? 'hidden' : ''}`}> 
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
      
      {/* Only render ProductList if showProductList is true */}
      {showProductList && (
        <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
          <ProductList onHomeClick={handleHomeClick}/>
        </div>
      )}
    </div>
  );
}

export default App;