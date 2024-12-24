const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const morgan = require('morgan');


// Importing routes
const authRoutes = require("./routes/authenticationRoutes");
const collabRoutes = require("./routes/collabRoute")
const inviteRoutes = require("./routes/inviteRoute")
const postRoute = require("./routes/postRoute")
const exchangeRoute = require("./routes/exchangeRoute")

// Environment variables
require("dotenv").config();

// Initialize express app
const app = express();
app.use(morgan('dev'));

// Define the port
const port = process.env.PORT || 3000;

// Database connection
const mongo = require("./database/dbConnection");
mongo.connection;

// Cloudinary connection
const cloudinary = require('./database/cloudConnection');

// Middlewares
const corsOptions = {
    origin: 'http://localhost:5173', // Allow only your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow cookies and credentials
  };
  
  app.use(cors(corsOptions));
  
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: path.join(__dirname, "tmp"),
    })
);

// Test endpoint
app.get("/", (req, res) => {
    res.status(200).send(`Server is running at port ${port}`);
});

// Routes
app.use("/auth", authRoutes);
app.use("/collab", collabRoutes);
app.use("/invite", inviteRoutes);
app.use("/posts", postRoute);
app.use("/exchange", exchangeRoute);


// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message,
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
