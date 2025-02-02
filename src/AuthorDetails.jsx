import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Paper, Typography, Button, Box, Grid } from "@mui/material";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import CommentBankTwoToneIcon from "@mui/icons-material/CommentBankTwoTone";

function AuthorDetails() {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const { state } = useLocation();
    const [showHighestLiked, setShowHighestLiked] = useState(false);
    const [showHighestCommented, setShowHighestCommented] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:4000/posts?authorId=${state.id}`);
                if (!response.ok) throw new Error("Failed to fetch posts");

                const data = await response.json();
                setPosts(data);
                setError(null);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [state.id]);

    const handleHighestLiked = () => {
        const sortedPosts = posts.slice().sort((a, b) => b.numLikes - a.numLikes).slice(0, 5);
        setPosts(sortedPosts);
        setShowHighestLiked(true);
        setShowHighestCommented(false);
    };

    const handleHighestCommented = () => {
        const sortedPosts = posts.slice().sort((a, b) => b.numComments - a.numComments).slice(0, 5);
        setPosts(sortedPosts);
        setShowHighestLiked(false);
        setShowHighestCommented(true);
    };

    if (!state) return <Typography variant="h6">No author details available</Typography>;

    const getCardColor = (index) => {
        const colors = ["#FFEBEE", "#E3F2FD", "#E8F5E9", "#FFFDE7", "#F3E5F5"];
        return colors[index % colors.length];
    };

    return (
        <>
            <Paper
                elevation={3}
                style={{
                    padding: "20px",
                    maxWidth: "400px",
                    margin: "20px auto",
                    backgroundColor: "#B3C8CF",
                    borderRadius: "12px",
                }}
            >
                <Typography variant="h5" gutterBottom>
                    {state.firstName} {state.lastName}
                </Typography>
                <Typography variant="body1">Phone: {state.phone}</Typography>
                <Typography variant="body1">Comments: {state.numComments}</Typography>
                <Typography variant="body1">Likes: {state.numLikes}</Typography>
                <Box display="flex" justifyContent="center" alignItems="center" gap="10px" flexWrap="wrap">
                      <Button
                         variant="contained"
                         color="primary"
                         sx={{ marginBottom: "40px" }}
                         onClick={handleHighestLiked}
                         style={{ fontSize: "12px", padding: "5px 10px" }}
                     >
                         Top 5 Liked
                     </Button>
                     <Button
                         variant="contained"
                         sx={{ marginBottom: "40px" }}
                         color="primary"
                         size="small"
                         onClick={handleHighestCommented}
                         style={{ fontSize: "12px", padding: "5px 10px" }}
                     >
                         Top 5 Commented
                     </Button>
                </Box>
            </Paper>

            {loading && <Typography variant="h6">Loading posts...</Typography>}
            {error && <Typography variant="h6" color="error">{error}</Typography>}

            <Grid container spacing={2} style={{ marginTop: "20px" }}>
                {posts.map((post, index) => (
                    <Grid item xs={12} key={post.id}>
                        <Paper
                            elevation={3}
                            style={{
                                padding: "20px",
                                borderRadius: "16px",
                                backgroundColor: getCardColor(index),
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                {post.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {post.description}
                            </Typography>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                                <div>
                                    <Typography variant="caption" color="textSecondary">
                                        Author ID: {post.authorId}
                                    </Typography>
                                    <br />
                                    <Typography variant="caption" color="textSecondary">
                                        Published: {post.datePublished}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="caption" color="textSecondary">
                                        <FavoriteTwoToneIcon fontSize="small" /> {post.numLikes}
                                    </Typography>
                                    <br />
                                    <Typography variant="caption" color="textSecondary">
                                        <CommentBankTwoToneIcon /> {post.numComments}
                                    </Typography>
                                </div>
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default AuthorDetails;
