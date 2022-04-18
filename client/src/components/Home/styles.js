import { styled } from "@mui/material/styles";
import { Grid, AppBar } from "@mui/material";

export const GridStyled = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
  },
}));

export const AppBarStyled = styled(AppBar)`
  border-radius: 4;
  margin-bottom: 1rem;
  display: flex;
  padding: 16px;
`;
