require("dotenv").config();
const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");
const path = require("path");

if (!process.env.DATABASE_URL) {
  throw new Error(
    "[ERROR] You need provide DATABASE_URL to populate database, please set it into a .env file."
  );
}

let stream = fs.createReadStream(
  path.resolve(__dirname, "../Transactions.csv")
);
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function (data) {
    csvData.push(data);
  })
  .on("end", function () {
    // remove the first line: header
    csvData.shift();
    // create a new connection to the database
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    const query = `
      INSERT INTO "Transaction" (
        id,
        account,
        description,
        category,
        reference,
        currency,
        amount,
        status,
        "transactionDate",
        "createdAt",
        "updatedAt"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `;

    pool.connect((err, client, done) => {
      if (err) throw err;
      try {
        csvData.forEach((row) => {
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log("inserted " + res.rowCount + " account:", row[1]);
            }
          });
        });
      } finally {
        done();
      }
    });
  });

stream.pipe(csvStream);
