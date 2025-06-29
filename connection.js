const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://Angelin:alitta@cluster0.xkndept.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((error) => {
    console.log("❌ DB connection error:", error);
  });

