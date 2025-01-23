import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import Background from "../assets/bgName.webp";
import oxyLogo from "../assets/oxy-logo-color.webp";
import Leaderboard from "../components/Leaderboard";

function NameInputScreen() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false); // State to track error
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim()) {
      setError(false); // Clear error if name is valid
      localStorage.setItem("userName", name);
      navigate("/quiz");
    } else {
      setError(true); // Show error if name is empty
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        position: "relative",
      }}
    >
      {/* Logo and Title */}
      <Box
        sx={{
          position: "absolute",
          top: "5%",
          left: "5%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Box
          component="img"
          src={oxyLogo}
          alt="OXY Logo"
          sx={{
            maxWidth: "300px",
            height: "auto",
          }}
        />
        <Typography
          variant="h1"
          sx={{
            marginTop: "20px",
            marginLeft: "30px",
            fontWeight: "bold",
            color: "black",
            textAlign: "left",
            lineHeight: "1.5",
            textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)",
          }}
        >
          Welcome to Oxy
          <br />
          HR Training{" "}
          <Box
            component="span"
            sx={{
              color: "secondary.main",
              fontWeight: "bold",
            }}
          >
            Game
          </Box>
        </Typography>
      </Box>

      {/* Leaderboard Component */}
      <Leaderboard />

      {/* Centered Name Input Section */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "400px",
          padding: 2,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "text.primary",
            marginBottom: "10px",
          }}
        >
          Name
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
          }}
        />
        {error && (
          <Alert
            severity="error"
            sx={{
              marginTop: "10px",
              width: "100%",
            }}
          >
            Please enter your name to continue.
          </Alert>
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleStart}
          fullWidth
          sx={{
            marginTop: "20px",
            fontSize: "2rem",
            fontWeight: "bold",
            borderRadius: "25px",
            padding: "10px 20px",
          }}
        >
          START
        </Button>
      </Box>
    </Box>
  );
}

export default NameInputScreen;
