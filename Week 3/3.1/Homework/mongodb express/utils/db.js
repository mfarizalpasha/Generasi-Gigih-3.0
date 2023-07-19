const { MongoClient } = require("mongodb");

// URL koneksi MongoDB
const uri = "mongodb://127.0.0.1:27017";
const dbName = "music_database";

let db = null;

async function connectToDatabase() {
  if (db) {
    return db;
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return null;
  }
}

module.exports = {
  connectToDatabase,
};
