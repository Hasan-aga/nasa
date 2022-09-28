const mongoose = require("mongoose");

mongoose.connection.once("open", () => {
  console.log("MongoDB connection is ready.");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

async function mongoConnect() {
  await mongoose.connect(process.env.MONGO_URL);
}

module.exports = mongoConnect;
