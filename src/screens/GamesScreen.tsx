// src/screens/GamesScreen.tsx
import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "./GamesScreen.css"; // Import the CSS for styling

const GamesScreen: React.FC = () => {
  return (
    <div className="games-screen">
      {/* Banner Image */}
      <div className="games-banner">
        <img
          src="https://d1ioice0blp2od.cloudfront.net/fmtapp%2Fasset%2F2025%2F4%2F10%2F6953393b-3f37-49be-a441-e6f49034444f_farmer_slots.png"
          alt="Farmer enjoying games on a mobile device"
          className="banner-image"
        />
      </div>

      <div className="games-list">
        {/* New Game Card: Kheeti11 */}
        <div className="game-card">
          {/* Use the provided image for Kheeti11 */}
          <div className="game-card-image kheeti11-image">
            <img src="https://iili.io/3c3fXj4.jpg" alt="Kheeti11 Game" />
          </div>
          <div className="game-card-content">
            <h2>Kheeti11</h2>
            <p>Kheetibaazi pe khet banao aur tractor jeetne ka mauka pao</p>
            {/* Assuming this opens an external link or another route */}
            <button
              className="play-button"
              onClick={() => alert("Kheeti11 game TBD!")}
            >
              Play Now
            </button>
          </div>
        </div>

        {/* Game Card: Kisan Quiz */}
        <div className="game-card">
          <div className="game-card-image quiz-image">
            {/* Use the provided image for Kisan Quiz */}
            <img src="https://iili.io/3c3oO7t.md.png" alt="Kisan Quiz Game" />
          </div>
          <div className="game-card-content">
            <h2>Kisan Quiz</h2>
            <p>Test your farming knowledge!</p>
            {/* Use Link to navigate */}
            <Link to="/games/kisan-quiz" className="play-button">
              Play Now
            </Link>
          </div>
        </div>

        {/* Game Card: Slots */}
        <div className="game-card">
          <div className="game-card-image slots-image">
            {/* Placeholder for an image or icon */}
            <span>SLOTS</span>
          </div>
          <div className="game-card-content">
            <h2>Slots</h2>
            <p>Spin the reels and try your luck!</p>
            {/* Use Link to navigate */}
            <Link to="/games/slots" className="play-button">
              Play Now
            </Link>
          </div>
        </div>

        {/* Game Card: Spin the Wheel */}
        <div className="game-card">
          <div className="game-card-image wheel-image">
            {/* Placeholder for an image or icon */}
            <span>WHEEL</span>
          </div>
          <div className="game-card-content">
            <h2>Spin the Wheel</h2>
            <p>Spin for a chance to win prizes!</p>
            <button
              className="play-button"
              onClick={() => alert("Starting Spin the Wheel!")}
            >
              Play Now
            </button>
          </div>
        </div>

        {/* Example of where another game card could go */}
        {/*
        <div className="game-card">
          <div className="game-card-image poker-image">
            <span>POKER</span>
          </div>
          <div className="game-card-content">
            <h2>Poker</h2>
            <p>Join a table and test your skills.</p>
            <button className="play-button">Play Now</button>
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default GamesScreen;
