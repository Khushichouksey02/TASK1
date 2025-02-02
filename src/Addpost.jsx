import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Typography, Snackbar, Alert } from "@mui/material";

function AddPost() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    description: "",
    authorId: state?.id || "",
    datePublished: new Date().toISOString().split("T")[0], // date
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      setSuccess(true);
      setTimeout(() => navigate("/"), 2000); // Redirect after success
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", maxWidth: "500px", margin: "20px auto", borderRadius: "12px",}}>
      <Typography variant="h5" gutterBottom>
        Create a New Post
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          required
          value={post.title}
          onChange={handleChange}
          margin="normal"
        />
        <br />
        <TextField
          label="Description"
          name="description"
          required
          multiline
          rows={4}
          value={post.description}
          onChange={handleChange}
          margin="normal"
        />
        <br />
        <TextField
          label="Author ID"
          name="authorId"
          value={post.authorId}
          InputProps={{ readOnly: true }}
          margin="normal"
        />
        <br /> 
        <TextField
          label="Published Date"
          name="datePublished"
          value={post.datePublished}
          InputProps={{ readOnly: true }}
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" size="small" fullWidth sx={{ marginBottom: "20px" }}>
          Submit
        </Button>
      </form> 

      <Snackbar open={success} autoHideDuration={2000} onClose={() => setSuccess(false)}>
        <Alert severity="success">Post Created Successfully!</Alert>
      </Snackbar>
    </Paper>
  );
}

export default AddPost;
