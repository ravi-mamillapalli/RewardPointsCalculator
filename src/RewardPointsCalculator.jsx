import React, { useState, useEffect } from "react";
import "./RewardPointsCalculator.css";

function RewardPointsCalculator() {
  const [transactionRecord, setTransactionRecord] = useState([]);
  const [monthlyRewardPoints, setMonthlyRewardPoints] = useState({});
  const [totalRewardPoints, setTotalRewardPoints] = useState({});

  useEffect(() => {
    // Simulate fetching transaction record from an asynchronous API
    fetchTransactionRecord().then((data) => setTransactionRecord(data));
  }, []);

  useEffect(() => {
    // Calculate monthly and total reward points whenever transaction record or monthlyRewardPoints state changes
    const monthlyRewardPointsMap = {};
    const totalRewardPointsMap = {};
    transactionRecord.forEach((transaction) => {
      const customerName = transaction.customerName;
      const transactionDate = new Date(transaction.transactionDate);
      const monthYear = `${transactionDate.getMonth()}-${transactionDate.getFullYear()}`;
      const transactionRewardPoints = calculateRewardPoints(
        transaction.transactionAmount
      );
      if (monthlyRewardPointsMap[customerName] === undefined) {
        monthlyRewardPointsMap[customerName] = {};
      }
      if (monthlyRewardPointsMap[customerName][monthYear] === undefined) {
        monthlyRewardPointsMap[customerName][monthYear] = 0;
      }
      monthlyRewardPointsMap[customerName][monthYear] +=
        transactionRewardPoints;
      if (totalRewardPointsMap[customerName] === undefined) {
        totalRewardPointsMap[customerName] = 0;
      }
      totalRewardPointsMap[customerName] += transactionRewardPoints;
    });
    setMonthlyRewardPoints(monthlyRewardPointsMap);
    setTotalRewardPoints(totalRewardPointsMap);
  }, [transactionRecord, monthlyRewardPoints]);

  // Define a function to calculate reward points for a single transaction
  function calculateRewardPoints(transactionAmount) {
    let points = 0;
  
    if (transactionAmount > 50 && transactionAmount <= 100) {
      points = transactionAmount - 50;
    } else if (transactionAmount > 100) {
      points = 2 * (transactionAmount - 100) + 50;
    }
  
    return points;
  }

  // Simulate an asynchronous API call to fetch transaction record
  async function fetchTransactionRecord() {
    const response = await fetch("http://localhost:3001/transactionRecord");
    const data = await response.json();
    return data;
  }

  // Render monthly reward points table
  function renderMonthlyRewardPoints() {
    const rows = [];
    Object.keys(monthlyRewardPoints).forEach((customerName) => {
      rows.push(
        <tr key={customerName}>
          <td>{customerName}</td>
          {Object.keys(monthlyRewardPoints[customerName]).map((monthYear) => (
            <td key={monthYear}>
              {monthlyRewardPoints[customerName][monthYear]}
            </td>
          ))}
        </tr>
      );
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Jan 2022</th>
            <th>Feb 2022</th>
            <th>Mar 2022</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }

  // Render total reward points table
  function renderTotalRewardPoints() {
    const rows = [];
    Object.keys(totalRewardPoints).forEach((customerName) => {
      rows.push(
        <tr key={customerName}>
          <td>{customerName}</td>
          <td>{totalRewardPoints[customerName]}</td>
        </tr>
      );
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Total Reward Points</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
  return (
    <div>
      <h1>Monthly Reward Points</h1>
      {renderMonthlyRewardPoints()}
      <h1>Total Reward Points</h1>
      {renderTotalRewardPoints()}
    </div>
  );
}

export default RewardPointsCalculator;
