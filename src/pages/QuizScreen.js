import React, { useState } from "react";
import { Box, Typography, LinearProgress, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import questions from "../data/questions";
import oxyLogo from "../assets/oxy-logo-color.webp";
import successSound from "../assets/correct.wav";
import wrongSound from "../assets/wrong.wav";
import celebrateSound from "../assets/celebrateLeaderboard.mp3";
import Background from "../assets/Background.webp";
import Leaderboard from "../components/Leaderboard";

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
    // Navigate to the /name route
    navigate("/name");
  };
  

  const handleAnswer = (index) => {
    if (soundPlaying) return; // Prevent additional clicks while the sound is playing

    const isCorrect = index === questions[currentQuestion].answer;
    const audio = new Audio(isCorrect ? successSound : wrongSound);
    setSoundPlaying(true);
    setSelectedAnswer(index);

    // Show the correct answer
    if (!isCorrect) {
      setCorrectAnswerShown(true);
    }

    // Play sound and move to the next question when it ends
    audio.onended = () => {
      setSoundPlaying(false);

      if (isCorrect) {
        setScore((prev) => prev + 1);
      }

      setTimeout(() => {
        setSelectedAnswer(null);
        setCorrectAnswerShown(false);

        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion((prev) => prev + 1);
        } else {
          setQuizCompleted(true);

          // Check if user made it to the leaderboard
          if (score + 1 === questions.length) {
            const celebrateAudio = new Audio(celebrateSound);
            celebrateAudio.play();

            const winners = JSON.parse(localStorage.getItem("winners")) || [];
            winners.push(playerName);
            localStorage.setItem("winners", JSON.stringify(winners));

            setMadeToLeaderboard(true);
          }
        }
      }, 2000);
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
        padding: "20px",
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
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "150px",
          height: "auto",
        }}
      />
      {/* Restart Button - Fixed to the top-left corner */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleRestartClick} 
        sx={{
          position: "fixed",
          top: "30px",
          left: "30px",
          fontSize: "2rem",
          borderRadius: "25px",
          padding: "10px 20px",
          fontWeight: "bold",
          zIndex: 10,
        }}
      >
        Restart
      </Button>
      {/* Leaderboard */}
      <Leaderboard />

      {/* Celebration Screen */}
      {quizCompleted && madeToLeaderboard && (
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
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <Typography variant="h2" color="white" textAlign="center" fontWeight="bold" mb={2}>
            🎉 Congratulations, {playerName}! 🎉
          </Typography>
          <Typography
            variant="h5"
            color="white"
            textAlign="center"
            mb={3}
          >
            You made it to the leaderboard by answering all questions correctly!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/name")}
            sx={{
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Play Again
          </Button>
        </Box>
      )}

      {/* Quiz Completed Screen */}
      {quizCompleted && !madeToLeaderboard && (
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
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <Typography variant="h2" color="white" fontWeight="bold" mb={2}>
            Quiz Completed!
          </Typography>
          <Typography
            variant="h5"
            color="white"
            textAlign="center"
            mb={3}
          >
            You scored {score} out of {questions.length}. Better luck next time!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/name")}
            sx={{
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Try Again
          </Button>
        </Box>
      )}

      {/* Question Section */}
      {!quizCompleted && (
        <>
          <Box sx={{ width: "100%", textAlign: "center", mb: 4 }}>
            <Typography variant="h3" fontWeight="bold" mb={2}>
              Question {currentQuestion + 1} / {questions.length}
            </Typography>
            <Typography variant="h4">{questions[currentQuestion].question}</Typography>
          </Box>

          {/* Options */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
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
                      : correctAnswerShown && index === questions[currentQuestion].answer
                      ? "success.main"
                      : "secondary.main",
                  backgroundColor:
                    selectedAnswer === index
                      ? index === questions[currentQuestion].answer
                        ? "success.light"
                        : "error.light"
                      : correctAnswerShown && index === questions[currentQuestion].answer
                      ? "success.light"
                      : "white",
                  borderRadius: "10px",
                  width: "250px",
                  height: "250px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: soundPlaying ? "not-allowed" : "pointer",
                  p: 2,
                }}
                onClick={() => handleAnswer(index)}
                disabled={soundPlaying || selectedAnswer !== null}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: "-25px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "secondary.main",
                    color: "white",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize:"2rem"
                  }}
                >
                  {index + 1}
                </Typography>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  {option}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Progress */}
          <Box sx={{ width: "100%", maxWidth: "600px", mt: 4 }}>
            <Typography variant="body1" textAlign="center" mb={2}>
              Correct Answers: {score} / {questions.length}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(score / questions.length) * 100}
              sx={{
                height: "10px",
                borderRadius: "5px",
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
}

export default QuizScreen;
