const express = require("express");
const cors = require("cors");
require ("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());           // ✅ Enable CORS for all routes
app.use(express.json());   // ✅ Parse incoming JSON requests







// const uri = "mongodb+srv://masudranaph1_db_user:wX50rDcMWtK45heD@coffee-master-tow.8wziwpq.mongodb.net/?retryWrites=true&w=majority&tls=true";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@coffee-master-tow.8wziwpq.mongodb.net/?retryWrites=true&w=majority&tls=true`;
console.log(uri)

// Create MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Keep MongoDB connection alive
async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB successfully!");

    // Reference to your collection
    const coffeeCollection = client.db("coffeeDB").collection("coffees");

    // Example: GET all coffees
    app.get("/coffees", async (req, res) => {
      try {
        const coffees = await coffeeCollection.find().toArray();
        res.send(coffees);
      } catch (err) {
        res.status(500).send({ error: "Failed to fetch coffees" });
      }
    });

    // Example: Add a new coffee
    app.post("/coffees", async (req, res) => {
      const newCoffee = req.body;
      try {
        const result = await coffeeCollection.insertOne(newCoffee);
        res.send(result);
      } catch (err) {
        res.status(500).send({ error: "Failed to add coffee" });
      }
    });

  } catch (err) {
    console.error(err);
  }
}
run().catch(console.dir);

// Test route
app.get("/", (req, res) => {
  res.send("Coffee making Server is running!");
});

// Start server
app.listen(port, () => {
  console.log(`Coffee Server is running on port: ${port}`);
});