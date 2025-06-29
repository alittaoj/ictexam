const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const BlogModel = require("./model");
require("./connection"); // connects to MongoDB

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// ➕ POST: Add a blog
app.post("/add", async (req, res) => {
  try {
    const newBlog = new BlogModel(req.body);
    await newBlog.save();
    res.status(200).json({ message: "Blog added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding blog", error });
  }
});

// 📥 GET: View all blogs
app.get("/view", async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
});

// Update post by ID
app.put("/update/:id", async (req, res) => {
  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Error updating blog", err });
  }
});


// ❌ DELETE: Remove a blog by ID
app.delete("/delete/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog", err });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
