import React from "react";
import { Box, Typography } from "@mui/material";

function Leaderboard() {
  const winners = JSON.parse(localStorage.getItem("winners")) || [];

  return (
    <Box
      sx={{
        position: "fixed",
        top: { xs: 8, sm: 16 },
        right: { xs: 8, sm: 16 },
        backgroundColor: "white",
        padding: { xs: "10px", sm: "20px" },
        borderRadius: 2,
        boxShadow: 3,
        width: { xs: "150px", sm: "200px" },
        border: "1px solid #e1705d",
        zIndex: 10,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "secondary.main",
          mb: 2,
          fontSize: { xs: "1rem", sm: "1.5rem" },
        }}
      >
        Leaderboard
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {winners.map((winner, index) => (
          <Box
            key={index}
            sx={{
              padding: { xs: "6px 8px", sm: "8px 12px" },
              backgroundColor: "#f9f9f9",
              border: "1px solid #ddd",
              borderRadius: "5px",
              textAlign: "center",
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              fontWeight: "500",
              color: "#333",
            }}
          >
            {winner}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Leaderboard;
