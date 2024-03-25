//import mongoose from 'mongoose';

import app from "./src/app";
import connectionToDatabase from "./src/utils/dbConnection";

const port = process.env.PORT || 3000;
//const MONGO_DB_URI = process.env.MONGO_DB_URI
async function startServer() {
  try {
    await connectionToDatabase();
    app.listen(port, () => {
      console.log(`Listening: http://localhost:${port}`);
    });
  } catch (err) {
    console.log("database error: ", err);
    console.error("Database connection error:", err);
  }
}

startServer();
