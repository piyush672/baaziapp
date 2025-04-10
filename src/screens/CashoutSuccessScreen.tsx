import React from "react";
import { Link } from "react-router-dom";
import "./CashoutSuccessScreen.css";

const CashoutSuccessScreen: React.FC = () => {
  // Placeholder data - in a real app, this might come from state or route params
  const amount = "500"; // Example amount
  const maskedAccount = "xxxxxx8192";

  return (
    <div className="cashout-success-screen">
      <div className="success-container">
        <div className="checkmark-wrapper">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark-check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        <h2 className="success-title">Cashout Successful!</h2>
        <p className="success-message">
          ₹{amount} has been credited to your bank account ending in{" "}
          <strong>{maskedAccount}</strong>.
        </p>
        <p className="success-note">(It may take a few moments to reflect)</p>
        <Link to="/balance" className="done-button">
          Done
        </Link>
      </div>
    </div>
  );
};

export default CashoutSuccessScreen;
