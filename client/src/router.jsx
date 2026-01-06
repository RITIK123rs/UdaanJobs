import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./homePage/HomePage";
import LoginPage from "./loginPage/loginPage";
import JobSeekerPage from "./jobseekerPage/jobseekerPage";
import RecruiterPage from "./recruiterPage/recruiterPage";
import ProtectedRoute from "./protectedRoute";


export default function Router({ addMessageBox }) {
  console.log("Route");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<LoginPage addMessageBox={addMessageBox} />}
        />
        <Route
          path="/jobSeeker"
          element={
            <ProtectedRoute userType="jobSeeker">
              <JobSeekerPage addMessageBox={addMessageBox} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter"
          element={
            <ProtectedRoute userType="recruiter">
              <RecruiterPage addMessageBox={addMessageBox} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
