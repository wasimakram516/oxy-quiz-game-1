import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import questions from "../data/questions";
import oxyLogo from "../assets/oxy-logo-color.webp";
import successSound from "../assets/correct.wav";
import wrongSound from "../assets/wrong.wav";
import celebrateSound from "../assets/celebrateLeaderboard.mp3";
import Background from "../assets/Background.webp";
import Leaderboard from "../components/Leaderboard";

// Import mountain images
import mountain1 from "../assets/mountains/1.png";
import mountain2 from "../assets/mountains/2.png";
import mountain3 from "../assets/mountains/3.png";
import mountain4 from "../assets/mountains/4.png";
import mountain5 from "../assets/mountains/5.png";

const mountains = [
  { image: mountain1, overlay: "rgba(107, 107, 107, 0.6)" },
  { image: mountain2, overlay: "rgba(255, 187, 188, 0.6)" },
  { image: mountain3, overlay: "rgba(140, 187, 239, 0.6)" },
  { image: mountain4, overlay: "rgba(142, 211, 167, 0.6)" },
  { image: mountain5, overlay: "rgba(211, 199, 141, 0.6)" },
];

function QuizScreen() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswerShown, setCorrectAnswerShown] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [madeToLeaderboard, setMadeToLeaderboard] = useState(false);
  const [playerName] = useState(localStorage.getItem("userName"));
  const [soundPlaying, setSoundPlaying] = useState(false);

  const handleRestartClick = () => {
    navigate("/name");
  };

  const handleAnswer = (index) => {
    if (soundPlaying) return;

    const isCorrect = index === questions[currentQuestion].answer;
    const audio = new Audio(isCorrect ? successSound : wrongSound);
    setSoundPlaying(true);
    setSelectedAnswer(index);

    if (!isCorrect) setCorrectAnswerShown(true);

    audio.onended = () => {
      setSoundPlaying(false);

      if (isCorrect) setScore((prev) => prev + 1);

      if (currentQuestion + 1 < questions.length) {
        setSelectedAnswer(null);
        setCorrectAnswerShown(false);
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setQuizCompleted(true);
        setSelectedAnswer(null);
        setCorrectAnswerShown(false);

        if (score + 1 === questions.length) {
          const celebrateAudio = new Audio(celebrateSound);
          celebrateAudio.play();

          const winners = JSON.parse(localStorage.getItem("winners")) || [];
          winners.push(playerName);
          localStorage.setItem("winners", JSON.stringify(winners));

          setMadeToLeaderboard(true);
        } else {
          setMadeToLeaderboard(false);
        }
      }
    };

    audio.play();
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: { xs: "10px", sm: "20px" },
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src={oxyLogo}
        alt="OXY Logo"
        sx={{
          position: "absolute",
          top: { xs: "10px", sm: "20px" },
          left: "50%",
          transform: "translateX(-50%)",
          width: { xs: "100px", sm: "150px" },
          height: "auto",
        }}
      />

      {/* Restart Button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleRestartClick}
        sx={{
          position: "fixed",
          top: { xs: "10px", sm: "30px" },
          left: { xs: "10px", sm: "30px" },
          fontSize: { xs: "1.2rem", sm: "2rem" },
          borderRadius: "25px",
          padding: { xs: "8px 12px", sm: "10px 20px" },
          fontWeight: "bold",
          zIndex: 10,
        }}
      >
        Restart
      </Button>

      {/* Leaderboard */}
      <Leaderboard />

      {/* Quiz Completion */}
      {quizCompleted ? (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: { xs: "10px", sm: "20px" },
            zIndex: 1000,
          }}
        >
          <Typography
            variant="h3"
            color="white"
            fontWeight="bold"
            textAlign="center"
            mb={2}
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
          >
            {madeToLeaderboard
              ? `🎉 Congratulations, ${playerName}! 🎉`
              : "Quiz Completed!"}
          </Typography>
          <Typography
            variant="h5"
            color="white"
            textAlign="center"
            mb={3}
            sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }}
          >
            {madeToLeaderboard
              ? "You made it to the leaderboard!"
              : `You scored ${score} out of ${questions.length}. Better luck next time!`}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/name")}
            sx={{
              padding: { xs: "8px 16px", sm: "10px 20px" },
              fontSize: { xs: "1rem", sm: "1.2rem" },
              fontWeight: "bold",
            }}
          >
            {madeToLeaderboard ? "Play Again" : "Try Again"}
          </Button>
        </Box>
      ) : (
        <>
          {/* Question Section */}
          <Box sx={{ width: "100%", textAlign: "center", mb: {xs:"50px",sm:"100px"}, mt: "150px" }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              mb={2}
              sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
            >
              Question {currentQuestion + 1} / {questions.length}
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
            >
              {questions[currentQuestion].question}
            </Typography>
          </Box>

          {/* Options */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 4,
              width: "100%",
              maxWidth: "600px",
            }}
          >
            {questions[currentQuestion].options.map((option, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  border: "2px solid",
                  borderColor:
                    selectedAnswer === index
                      ? index === questions[currentQuestion].answer
                        ? "success.main"
                        : "error.main"
                      : correctAnswerShown &&
                        index === questions[currentQuestion].answer
                      ? "success.main"
                      : "secondary.main",
                  backgroundColor:
                    selectedAnswer === index
                      ? index === questions[currentQuestion].answer
                        ? "success.light"
                        : "error.light"
                      : correctAnswerShown &&
                        index === questions[currentQuestion].answer
                      ? "success.light"
                      : "white",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: soundPlaying ? "not-allowed" : "pointer",
                  p: 2,
                  width: "100%",
                  height: { xs: "150px", sm: "200px" },
                }}
                onClick={() => handleAnswer(index)}
                disabled={soundPlaying || selectedAnswer !== null}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: "-20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "secondary.main",
                    color: "white",
                    borderRadius: "50%",
                    width: { xs: "40px", sm: "50px" },
                    height: { xs: "40px", sm: "50px" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: { xs: "1.5rem", sm: "2rem" },
                  }}
                >
                  {index + 1}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "center",
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                  }}
                >
                  {option}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Mountains Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              mt: 4,
              overflow: "hidden",
            }}
          >
            {mountains.map((mountain, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: "100 %",
                  height: "500px",
                  overflow: "hidden",
                  mt:{xs:"20px",sm:"100px"}
                }}
              >
                {/* Mountain Image */}
                <Box
                  component="img"
                  src={mountain.image}
                  alt={`Mountain ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Color Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: index < score ? mountain.overlay : "transparent",
                    transition: "background-color 0.3s ease",
                  }}
                />
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

export default QuizScreen;
