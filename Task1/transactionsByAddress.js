const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const ETHERSCAN_API = process.env.ETHERSCAN_API;
const DATABASE_URL = process.env.DATABASE_URL;



app.get('/transactions', async (req, res) => {
  const { address } = req.query;
  try {
    const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&apikey=${ETHERSCAN_API}`);
    const transactions = response.data.result;
    
 

    res.json({ transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Error fetching transactions' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
