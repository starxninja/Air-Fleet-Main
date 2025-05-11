import React, { useState, useEffect } from "react";
import axios from "axios";

const LoyaltyProgramTracking = () => {
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [message, setMessage] = useState("");
  const [redeemMessage, setRedeemMessage] = useState("");

  useEffect(() => {
    const passengerId = localStorage.getItem("PassID");

    if (passengerId) {
      const fetchLoyaltyPoints = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/loyalty/${passengerId}`);
          setLoyaltyPoints(response.data.points);
        } catch (error) {
          setMessage("Failed to fetch loyalty points. Please try again later.");
        }
      };

      fetchLoyaltyPoints();
    } else {
      setMessage("No passenger ID found. Please log in.");
    }
  }, []);

  const redeemLoyaltyPoints = async () => {
    const passengerId = localStorage.getItem("PassID");

    if (!passengerId) {
      setRedeemMessage("No passenger ID found. Please log in.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/users/loyalty/redeem/${passengerId}`);
      setRedeemMessage(response.data.message);
      setLoyaltyPoints(response.data.remainingPoints);
    } catch (error) {
      setRedeemMessage("Failed to redeem points. Please try again later.");
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8 border border-black">
        {/* Title */}
        <h2 className="text-3xl font-bold text-pink-600 mb-4">Loyalty Program</h2>
        <p className="text-lg text-gray-700 mb-6">
          You have <span className="text-pink-600 font-bold">{loyaltyPoints}</span> points.
        </p>

        {/* Redeem Points Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Redeem Points for Rewards
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Enter the number of points you want to redeem for rewards (e.g., flight
            discounts, free upgrades, etc.).
          </p>
          <input
            type="number"
            placeholder="0"
            className="w-full border border-gray-300 rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
          <button
            className="bg-pink-600 text-white py-3 px-6 mt-4 rounded-md w-full hover:bg-pink-700 transition"
            onClick={redeemLoyaltyPoints}
          >
            Redeem Points
          </button>
          {redeemMessage && <p className="text-green-600 mt-4">{redeemMessage}</p>}
        </div>

        {/* Rewards Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Rewards and Discounts
          </h3>
          <ul className="bg-yellow-50 border border-yellow-200 rounded-md p-4 space-y-2">
            <li className="text-gray-700">
              <span className="font-bold text-pink-600">1000 points</span> - $50
              flight discount
            </li>
            <li className="text-gray-700">
              <span className="font-bold text-pink-600">2000 points</span> - Free
              flight upgrade
            </li>
            <li className="text-gray-700">
              <span className="font-bold text-pink-600">3000 points</span> - Free
              round-trip flight within the same region
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgramTracking;
