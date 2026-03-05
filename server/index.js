// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@coffee-master-tow.8wziwpq.mongodb.net/?retryWrites=true&w=majority&tls=true`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let coffeeCollection;

async function run() {
  try {
    await client.connect();
    coffeeCollection = client.db("coffeeDB").collection("coffees");
    console.log("✅ Connected to MongoDB successfully!");

    // Test GET route
    app.get("/", (req, res) => {
      res.send("Coffee Server is running!");
    });

    // ✅ GET all coffees
    app.get("/coffees", async (req, res) => {
      try {
        const coffees = await coffeeCollection.find().toArray();
        res.json(coffees);
      } catch (err) {
        console.error("❌ Fetch Error:", err);
        res.status(500).send({ error: "Failed to fetch coffees" });
      }
    });

    // ✅ GET a coffee by ID
   app.get("/coffees/:id", async (req, res) => {
  const { id } = req.params;
  const { ObjectId } = require("mongodb");
  try {
    const coffee = await coffeeCollection.findOne({ _id: new ObjectId(id) });
    res.json(coffee);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch coffee" });
  }
});

    // ✅ POST / Add a new coffee
    app.post("/coffees", async (req, res) => {
      const newCoffee = req.body;

      // Handle photoURL mapping
      if (newCoffee.photoURL) {
        newCoffee.photoUrl = newCoffee.photoURL;
        delete newCoffee.photoURL;
      }

      try {
        const result = await coffeeCollection.insertOne(newCoffee);
        res.json({ success: true, message: "Coffee added!", data: result });
      } catch (err) {
        console.error("❌ Insert Error:", err);
        res.status(500).send({ error: "Failed to add coffee" });
      }
    });

    // ✅ DELETE a coffee by ID
    app.delete("/coffees/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const result = await coffeeCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount > 0) {
          res.json({ success: true, message: "Coffee deleted successfully!" });
        } else {
          res.status(404).json({ success: false, message: "Coffee not found!" });
        }
      } catch (err) {
        console.error("❌ Delete Error:", err);
        res.status(500).send({ error: "Failed to delete coffee" });
      }
    });

    // ✅ UPDATE a coffee by ID
    app.put("/coffees/:id", async (req, res) => {
      const id = req.params.id;
      const updatedCoffee = req.body;

      try {
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            coffeeName: updatedCoffee.coffeeName,
            availableQuantity: updatedCoffee.availableQuantity,
            supplier: updatedCoffee.supplier,
            taste: updatedCoffee.taste,
            category: updatedCoffee.category,
            details: updatedCoffee.details,
            photoUrl: updatedCoffee.photoUrl || updatedCoffee.photoURL,
          },
        };

        const result = await coffeeCollection.updateOne(filter, updateDoc);

        if (result.modifiedCount > 0) {
          res.json({ success: true, message: "Coffee updated successfully!" });
        } else {
          res.status(404).json({ success: false, message: "Coffee not found!" });
        }
      } catch (err) {
        console.error("❌ Update Error:", err);
        res.status(500).send({ error: "Failed to update coffee" });
      }
    });
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
  }
}

run().catch(console.dir);

// Start server
app.listen(port, () => {
  console.log(`☕ Coffee Server is running on port: ${port}`);
});