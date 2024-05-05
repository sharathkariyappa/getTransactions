const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
//const ETHERSCAN_API = process.env.ETHERSCAN_API;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const transactionSchema = new mongoose.Schema({
  address: String,
  transactions: [Object]
});
const Transaction = mongoose.model('Transaction', transactionSchema);

app.get('/user-info/:address', async (req, res) => {
  const { address } = req.params;
  try {
    const userTransactions = await Transaction.findOne({ address });
    let balance = 0;
    if (userTransactions) {
      userTransactions.transactions.forEach(transaction => {
        if (transaction.to.toLowerCase() === address.toLowerCase()) {
          balance += parseFloat(transaction.value);
        } else if (transaction.from.toLowerCase() === address.toLowerCase()) {
          balance -= parseFloat(transaction.value);
        }
      });
    }

    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`);
    const currentPriceOfEther = response.data.ethereum.usd;
    res.json({ balance, currentPriceOfEther });
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: 'Error fetching user info' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
