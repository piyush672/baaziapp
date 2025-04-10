// src/screens/GamesScreen.tsx
import React from "react";
import "./GamesScreen.css"; // Import the CSS for styling

const GamesScreen: React.FC = () => {
  return (
    <div className="games-screen">
      <h1>Available Games</h1>
      <div className="games-list">
        {/* Game Card: Slots */}
        <div className="game-card">
          <div className="game-card-image slots-image">
            {/* Placeholder for an image or icon */}
            <span>SLOTS</span>
          </div>
          <div className="game-card-content">
            <h2>Slots</h2>
            <p>Spin the reels and try your luck!</p>
            {/* Add a button or link to play - could link to a specific route or handle logic */}
            <button
              className="play-button"
              onClick={() => alert("Starting Slots!")}
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
