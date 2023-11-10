require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");
const { MongoClient } = require("mongodb");

const CLIENT_ID = process.env.CLIENT_ID; //Get Client ID from local environment
const MONGODB_URI = "mongodb://localhost:27017";
const DATABASE_NAME = "my_google_login_app";
const COLLECTION_NAME = "google_users";
const oAuth2Client = new OAuth2Client(CLIENT_ID);

const app = express();

app.use(express.json());

// Use CORS
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

// Set up MongoDB
const client = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect();

const database = client.db(DATABASE_NAME);
const collection = database.collection(COLLECTION_NAME);

app.post("/handleAccessToken", async (req, res) => {
  try {
    const { credentials } = req.body; // Get credentials from client.

    // Verify Client Token using oAuth2Client
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: credentials,
      audience: CLIENT_ID,
    });

    // Get details of user using verified ticket
    const payload = ticket.getPayload();

    const userId = payload.sub; 

    const existingUser = await collection.findOne({ _id: userId }); // Check if user details already available in database, if yes update details, if not add new user to database

    if (!existingUser) {
      await collection.insertOne({ _id: userId, ...payload });
      console.log("Inserted document with _id:", userId);
    } else {
      await collection.updateOne({ _id: userId }, { $set: { ...payload } });
      console.log(
        "User already exists with _id:",
        userId,
        "Updated all user information."
      );
    }

    // Send back username,picture url and email of user to client.
    res.json({
      message: "User Data Response from server",
      userName: payload.name,
      userPicture: payload.picture,
      userEmail: payload.email,
    });
  } catch (error) {
    console.error("Error handling access token:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
