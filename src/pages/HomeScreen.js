import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import oxyBackground from "../assets/Oxy-bg-start1.webp";

function HomeScreen() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Clear stored username and winners from localStorage
    localStorage.removeItem("userName");
    localStorage.removeItem("winners");

    // Navigate to the /name route
    navigate("/name");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${oxyBackground})`,
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
      <Button
        variant="contained"
        color="secondary"
        onClick={handleGetStarted}
        sx={{
          padding: { xs: "8px 16px", sm: "10px 20px", md: "12px 28px" },
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          fontWeight: "bold",
          borderRadius: "25px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
          position: "absolute",
          top: { xs: "55%", sm: "60%" },
        }}
      >
        Get Started
      </Button>
    </Box>
  );
}

export default HomeScreen;
