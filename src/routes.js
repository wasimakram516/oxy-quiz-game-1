import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import NameInputScreen from "./pages/NameInputScreen";
import QuizScreen from "./pages/QuizScreen";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/name" element={<NameInputScreen />} />
      <Route path="/quiz" element={<QuizScreen />} />
    </Routes>
  );
};

export default AppRoutes;
