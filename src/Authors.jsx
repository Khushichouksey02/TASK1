import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import VolunteerActivismTwoToneIcon from "@mui/icons-material/VolunteerActivismTwoTone";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CallTwoToneIcon from "@mui/icons-material/CallTwoTone";
import CommentBankTwoToneIcon from "@mui/icons-material/CommentBankTwoTone";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const authorsPerPage = 20;
  const nav =useNavigate()

  // Fetch author data from API
  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/authors");
      if (!response.ok) {
        throw new Error("Failed to fetch authors");
      }
      const data = await response.json();
      setAuthors(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  // Pagination logic
  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Function for background color
  const getCardColor = (index) => {
    const colors = ["#FFEBEE", "#E3F2FD", "#E8F5E9", "#FFFDE7", "#F3E5F5"];
    return colors[index % colors.length];
  };

  const handleDetailsClick = (author) => {
    nav("/AuthorDetails",{state:author})
  };

  if (loading) {
    return (
      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ height: "80vh" }}
      >
        <CircularProgress color="primary" />
        <Typography variant="h6" color="textSecondary">
          Loading authors...
        </Typography>
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ height: "80vh" }}
      >
        <Alert severity="error" sx={{ maxWidth: "400px", textAlign: "center" }}>
          {error}
        </Alert>
      </Stack>
    );
  }

  if (authors.length === 0) {
    return (
      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ height: "80vh" }}
      >
        <Typography variant="h6" color="textSecondary">
          No authors found.
        </Typography>
      </Stack>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Authors
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        A list of authors and their details
      </Typography>
      <Grid container spacing={4}>
        {currentAuthors.map((author, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                textAlign: "center",
                borderRadius: "16px",
                backgroundColor: getCardColor(index),
                "&:hover": { boxShadow: 6 },
              }}
            >
              <Avatar
                alt={`${author.firstName} Avatar`}
                src={author.avatar || ""}
                sx={{
                  width: 64,
                  height: 64,
                  margin: "0 auto",
                  marginBottom: "10px",
                  bgcolor: "#3f51b5",
                }}
              >
                {author.firstName[0]}
              </Avatar>
              <Typography variant="h6" component="h3">
                {author.firstName} {author.lastName}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}
              >
                <CallTwoToneIcon fontSize="small" /> {author.phone}
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}
              >
                <VolunteerActivismTwoToneIcon fontSize="small" />{" "}
                {author.numLikes || 0}
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}
              >
                <CommentBankTwoToneIcon fontSize="small" />{" "}
                {author.numComments || 0}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Posts: {author.numPosts || 0}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{marginBottom:'50px', marginLeft:'15px'}}
                onClick={() => handleDetailsClick(author)}
                aria-label={`View details for ${author.firstName}`}
              >
                Details
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} sx={{ marginTop: "20px", alignItems: "center" }}>
        <Pagination
          count={Math.ceil(authors.length / authorsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          aria-label="Pagination"
        />
      </Stack>
    </div>
  );
}

export default Authors;