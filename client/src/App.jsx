import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { useDispatch } from "react-redux";
import { setToken } from "./reducers/auth";
import PostDetails from "./components/PostDetails/PostDetails";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      dispatch(setToken(user));
    }
  }, [user, dispatch]);

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      maxSnack={3}>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="posts/search" element={<Home />} />
          <Route path="posts/:id" element={<PostDetails />} />
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate to="/posts" />}
          />
        </Routes>
      </Container>
    </SnackbarProvider>
  );
}

export default App;
