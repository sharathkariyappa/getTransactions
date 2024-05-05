# getTransactions

server side application for getting transactions through API.

## Installation

Use the package manager [npm]() to install dependencies.

```bash
npm install express
npm install mongoose
npm install axios
npm install node-cron
```

## Usage

```JavaScript
import dependencies

# Task1 'Steps'
using Etherscan API fetched the transactions and stored in MongoDB database using mongoose,

http://localhost:3000/transactions?address=0xce94e5621a5f7068253c42558c147480f38b5e0d this URL will 
get the transactions of this particular address

# Task2 'steps'
using https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr
this api fetched prices of ethereum in every 10 minutes with the help of node-cron

# Task3 'steps'
built API to get balance and price of ethereum from the above transactions.

http://localhost:3000/user-info/0xce94e5621a5f7068253c42558c147480f38b5e0d this is the URL to get price and 
balance of particular transactions
```

## 

work is completed successfully, all the transactions and prices were stored in mongoDB  database

mongodb+srv://sharathkariyappa:gettransactions@cluster0.to9fvfj.mongodb.net/
this is the api for database.



## License
