import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <header className="about-hero">
        <div className="about-inner">
          <h1>About LibraTech</h1>
          <p className="lead">Connecting readers with the right books — simple, fast, and delightful.</p>
        </div>
      </header>

      <section className="about-content">
        <div className="container">
          <h2>Our Mission</h2>
          <p>
            LibraTech was built to make knowledge accessible. We curate, catalogue, and lend books
            to students, professionals, and curious readers so they can explore ideas without
            friction. Our focus is on usability, reliable service, and an inclusive collection.
          </p>

          <h2>What We Offer</h2>
          <ul className="features-list">
            <li>Curated collections across genres and subjects</li>
            <li>Simple issue/return flow with reminders</li>
            <li>Account management and reading history</li>
          </ul>

          {/* Team section removed temporarily */}

          <div className="cta">
            <p>Ready to explore? Start browsing our collection.</p>
            <Link to="/books" className="btn-primary small">Browse Books</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
