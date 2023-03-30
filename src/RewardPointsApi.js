const express = require("express");
const app = express();

app.get("/api/transactions", (req, res) => {
  const transactions = [
    {
      customerId: 1,
      date: "2022-01-01",
      amount: 120
    },
    {
      customerId: 1,
      date: "2022-01-15",
      amount: 50
    },
    {
      customerId: 1,
      date: "2022-02-01",
      amount: 80
    },
    {
      customerId: 2,
      date: "2022-01-05",
      amount: 150
    },
    {
      customerId: 2,
      date: "2022-02-01",
      amount: 75
    },
    {
      customerId: 2,
      date: "2022-03-01",
      amount: 200
    },
    {
      customerId: 3,
      date: "2022-01-10",
      amount: 90
    },
    {
      customerId: 3,
      date: "2022-02-01",
      amount: 120
    },
    {
      customerId: 3,
      date: "2022-03-01",
      amount: 180
    }
  ];

  setTimeout(() => {
    res.json(transactions);
  }, 1000);
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
