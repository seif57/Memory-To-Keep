import { styled } from "@mui/material/styles";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export const AppBarStyled = styled(AppBar)`
  display: flex;
  border-radius: 15px;
  flex-direction: row;
  margin: 30px 0;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
`;

export const TitleStyled = styled(Typography)`
  color: rgba(0, 183, 255, 1);
  text-decoration: none;
`;
export const ImageStyled = styled("img")`
  margin-left: 10px;
  margin-top: 5px;
`;
export const InnerNavbarStyled = styled("div")`
  display: flex;
  align-items: center;
`;

export const ToolBarStyled = styled(Toolbar)`
  display: flex;
  justify-content: flex-end;
  width: 400px;
`;

export const AvatarStyled = styled(Avatar)(({ theme }) => ({
  backgroundColor: deepPurple[500],
  color: theme.palette.getContrastText(deepPurple[500]),
}));

export const TypographyStyled = styled(Typography)`
  display: flex;
  align-items: center;
`;

export const LogoutButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(deepPurple[500]),
}));
export const Profile = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "400px",
  [theme.breakpoints.down("sm")]: {
    width: "auto",
    marginTop: 20,
    justifyContent: "center",
  },
}));
