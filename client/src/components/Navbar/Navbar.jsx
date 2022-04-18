import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";

import {
  AppBarStyled,
  TitleStyled,
  ImageStyled,
  InnerNavbarStyled,
  ToolBarStyled,
  AvatarStyled,
  TypographyStyled,
  LogoutButton,
  Profile,
} from "./styles";
import { Link, useNavigate } from "react-router-dom";
import memoriesLogo from "../../assets/images/memoriesLogo.png";
import memoriesText from "../../assets/images/memoriesText.png";

import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/auth";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.authData?.result);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);

      if (decodedToken.exp * 1000 < Date.now()) {
        handleLogout();
      }
    }
  }, []);

  return (
    <AppBarStyled position="static" color="inherit">
      <InnerNavbarStyled>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={memoriesText} alt="icon" height="45px" />
          <ImageStyled src={memoriesLogo} alt="icon" height="40px" />
        </Link>
      </InnerNavbarStyled>
      <ToolBarStyled>
        {user ? (
          <Profile>
            <AvatarStyled alt={user.name} src={user.imageUrl}>
              {user.name.charAt(0)}
            </AvatarStyled>
            <TypographyStyled variant="h6">{user.name}</TypographyStyled>
            <LogoutButton
              onClick={handleLogout}
              variant="contained"
              color="secondary"
            >
              Sign Out
            </LogoutButton>
          </Profile>
        ) : (
          <Button
            component={Link}
            to="/auth"
            color="primary"
            variant="contained"
          >
            Sign In
          </Button>
        )}
      </ToolBarStyled>
    </AppBarStyled>
  );
}

export default Navbar;
