import React from "react";
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
import { Link } from "react-router-dom";
import memories from "../../assets/images/memories.png";
import { Button } from "@mui/material";

function Navbar() {
  const user = null;
  return (
    <AppBarStyled position="static" color="inherit">
      <InnerNavbarStyled>
        <TitleStyled component={Link} to="/" variant="h2" align="center">
          Memories
        </TitleStyled>
        <ImageStyled src={memories} alt="memories" height="60" />
      </InnerNavbarStyled>
      <ToolBarStyled>
        {user ? (
          <Profile>
            <AvatarStyled alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </AvatarStyled>
            <TypographyStyled variant="h6">{user.result.name}</TypographyStyled>
            <LogoutButton variant="contained" color="secondary">
              Sign Out
            </LogoutButton>
          </Profile>
        ) : (
          <Button
            component={Link}
            to="/auth"
            color="primary"
            variant="contained">
            Sign In
          </Button>
        )}
      </ToolBarStyled>
    </AppBarStyled>
  );
}

export default Navbar;
