// src/components/Hero.js
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ProductPage.css'; // Use the same stylesheet

const Hero = ({ searchTerm, setSearchTerm }) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <header className="hero-section text-center text-white py-5 mb-4">
      <div className="container">
        <h1 className="display-3 fw-bold animate__animated animate__fadeInDown">
          Explore Our Collection
        </h1>
        <p className="lead animate__animated animate__fadeInUp animate__delay-1s">
          Find exactly what you need with our curated selection.
        </p>
        <div className="search-bar mt-4 animate__animated animate__fadeIn animate__delay-2s">
          <div className="input-group mx-auto" style={{ maxWidth: '600px' }}>
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;