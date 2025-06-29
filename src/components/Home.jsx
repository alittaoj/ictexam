import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // ✅ initialize

  useEffect(() => {
    axios
      .get("http://localhost:3001/view")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        setPosts((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  const updatePost = (id) => {
    navigate(`/add/${id}`); // ✅ navigate to update page
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Grid container spacing={4}>
        {posts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="180"
                image={post.img_url}
                alt={post.title}
              />
              <CardContent>
                {/* Show title as subtext */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  {post.title || "Untitled"}
                </Typography>

                {/* Show content as main title */}
                <Typography variant="h6">
                  {post.content || "No content"}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deletePost(post._id)}
                  >
                    DELETE
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => updatePost(post._id)}
                  >
                    UPDATE
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
