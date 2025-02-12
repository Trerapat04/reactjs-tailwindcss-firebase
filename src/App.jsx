import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { UserAuthContextProvider } from "./context/UserAuthContext";


function App() {
  return (
    <UserAuthContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Home />
            </>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </UserAuthContextProvider>
  );
}

export default App;
