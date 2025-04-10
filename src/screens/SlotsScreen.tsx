import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // For back button
import "./SlotsScreen.css";

// Define the possible icons
const icons = ["🌾", "🌽", "🥕", "🚜", "💰"]; // Wheat, Corn, Carrot, Tractor, MoneyBag

// Helper function to get a random icon
const getRandomIcon = () => icons[Math.floor(Math.random() * icons.length)];

const SlotsScreen: React.FC = () => {
  // State for the three reels
  const [reels, setReels] = useState<string[]>([icons[0], icons[0], icons[0]]);
  // State to track spinning status
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  // State for win message
  const [message, setMessage] = useState<string>("Spin to start!");
  // Refs for interval timers to ensure they are cleared properly
  const intervals = useRef<number[]>([]); // Use number type for browser interval IDs

  // Function to handle the spin
  const spinReels = () => {
    if (isSpinning) return; // Don't spin if already spinning

    setIsSpinning(true);
    setMessage(""); // Clear previous message

    // Clear any previous intervals just in case
    intervals.current.forEach(clearInterval);
    intervals.current = [];

    // Simulate spinning animation duration
    const spinDuration = 1500; // milliseconds
    const intervalTime = 100; // milliseconds for icon change flicker effect

    // Start interval for each reel individually for staggered stop effect (optional)
    const finalReels = [getRandomIcon(), getRandomIcon(), getRandomIcon()];
    const stopTimes = [spinDuration - 400, spinDuration - 200, spinDuration]; // Staggered stop times

    reels.forEach((_, index) => {
      const spinInterval = setInterval(() => {
        // Flicker effect: show random icons quickly while "spinning"
        setReels((prevReels) => {
          const newReels = [...prevReels];
          newReels[index] = getRandomIcon();
          return newReels;
        });
      }, intervalTime);

      intervals.current.push(spinInterval);

      // Schedule stop for this reel
      setTimeout(() => {
        clearInterval(spinInterval);
        setReels((prevReels) => {
          const newReels = [...prevReels];
          newReels[index] = finalReels[index]; // Set final icon
          return newReels;
        });

        // Check for win only after the last reel stops
        if (index === reels.length - 1) {
          setIsSpinning(false);
          // Basic win condition check (e.g., all three match)
          if (
            finalReels[0] === finalReels[1] &&
            finalReels[1] === finalReels[2]
          ) {
            setMessage(
              `🎉 Jackpot! You won with ${finalReels[0]}${finalReels[1]}${finalReels[2]}! 🎉`
            );
          } else if (
            finalReels[0] === finalReels[1] ||
            finalReels[1] === finalReels[2] ||
            finalReels[0] === finalReels[2]
          ) {
            setMessage(`👍 Nice! Two matched! Spin again!`); // Example for two matches
          } else {
            setMessage("Spin again!");
          }
        }
      }, stopTimes[index]);
    });
  };

  // Cleanup intervals on component unmount
  useEffect(() => {
    return () => {
      intervals.current.forEach(clearInterval);
    };
  }, []);

  return (
    <div className="slots-screen">
      <Link to="/games" className="back-button">
        ← Back to Games
      </Link>
      <h1>Farmer Slots</h1>

      <div className="slot-machine">
        <div className="reels-container">
          {reels.map((icon, index) => (
            <div key={index} className={`reel ${isSpinning ? "spinning" : ""}`}>
              <span className="reel-icon">{icon}</span>
            </div>
          ))}
        </div>
        <button
          className="spin-button"
          onClick={spinReels}
          disabled={isSpinning}
        >
          {isSpinning ? "Spinning..." : "Spin!"}
        </button>
        {message && <p className="slot-message">{message}</p>}
      </div>
    </div>
  );
};

export default SlotsScreen;
