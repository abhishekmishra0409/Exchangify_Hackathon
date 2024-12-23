const mongoose = require("mongoose");

 const connection = mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connection with Database established successfully "))
.catch((error) => console.log("Error in connecting with Database due to " + error));

module.exports = connection