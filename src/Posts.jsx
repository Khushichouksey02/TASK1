import React, { useEffect, useState } from "react";
import {Grid,Paper,Typography,Pagination,Stack,Button,TextField,} from "@mui/material";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import CommentBankTwoToneIcon from "@mui/icons-material/CommentBankTwoTone";
import { useNavigate } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const postsPerPage = 20;

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:4000/posts");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data.slice(0, 500));
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:4000/posts/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the post");
      }

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      setError(error.message);
    }
  };

  const handleEditPost = (post) => {
    setEditingPostId(post.id);
    setEditTitle(post.title);
    setEditDescription(post.description);
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleSaveEdit = async (postId) => {
    try {
      const response = await fetch(`http://localhost:4000/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: editTitle, description: editDescription }),
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, title: editTitle, description: editDescription }
            : post
        )
      );

      setEditingPostId(null);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Function to dynamically assign card colors
  const getCardColor = (index) => {
    const colors = ["#FFEBEE", "#E3F2FD", "#E8F5E9", "#FFFDE7", "#F3E5F5"];
    return colors[index % colors.length];
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        sx={{ display: "block", marginBottom: "20px" }}
        onClick={() => navigate("/Addpost")}
      >
        Add New Post
      </Button>
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Posts
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Grid container spacing={3}>
          {currentPosts.map((post, index) => (
            <Grid item xs={12} key={post.id}>
              <Paper
                elevation={3}
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  backgroundColor: getCardColor(index),
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {editingPostId === post.id ? (
                  <>
                    <TextField
                      label="Title"
                      fullWidth
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      sx={{ marginBottom: "10px" }}
                    />
                    <TextField
                      label="Description"
                      fullWidth
                      multiline
                      rows={2}
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      sx={{ marginBottom: "10px" }}
                    />
                    <div>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleSaveEdit(post.id)}
                        sx={{ marginRight: "10px" }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Typography variant="h6" gutterBottom>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {post.description}
                    </Typography>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <div style={{ textAlign: "left" }}>
                        <Typography variant="caption" color="textSecondary">
                          Author ID: {post.authorId}
                        </Typography>
                        <br />
                        <Typography variant="caption" color="textSecondary">
                          Published: {post.datePublished}
                        </Typography>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <Typography variant="caption" color="textSecondary">
                          <FavoriteTwoToneIcon fontSize="small" />{" "}
                          {post.numLikes}
                        </Typography>
                        <br />
                        <Typography variant="caption" color="textSecondary">
                          <CommentBankTwoToneIcon /> {post.numComments}
                        </Typography>
                        <br />
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{ marginBottom: "10px" }}
                          onClick={() => handleEditPost(post)}
                        >
                          Edit
                        </Button>
                        <br />
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{ marginBottom: "40px" }}
                          onClick={() => handleDeletePost(post.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Stack spacing={2} sx={{ marginTop: "20px", alignItems: "center" }}>
          <Pagination
            count={Math.ceil(posts.length / postsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            aria-label="Post Pagination"
          />
        </Stack>
      </div>
    </>
  );
}

export default Posts;
