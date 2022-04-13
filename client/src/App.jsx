import React from "react";
import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      maxSnack={3}>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </SnackbarProvider>
  );
}

export default App;
