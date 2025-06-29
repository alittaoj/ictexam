// 📁 Add.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";

const Add = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/view/${id}`)
        .then((res) => setInputs(res.data))
        .catch((err) => console.error("Error fetching single post:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const endpoint = id
      ? `http://localhost:3001/update/${id}`
      : "http://localhost:3001/add";

    const method = id ? axios.put : axios.post;

    method(endpoint, inputs)
      .then(() => navigate("/"))
      .catch((err) => console.error("Submit error:", err));
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" mb={2}>
        {id ? "Update Blog" : "Add Blog"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Title"
          value={inputs.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="content"
          label="Content"
          value={inputs.content}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <TextField
          name="img_url"
          label="Image URL"
          value={inputs.img_url}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {id ? "Update" : "Add"} Blog
        </Button>
      </form>
    </Box>
  );
};

export default Add;
