import {
  Card,
  CardActions,
  CardMedia,
  Typography,
  ButtonBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const CardStyled = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  height: 100%;
  position: relative;
`;
export const ButtonBaseStyled = styled(ButtonBase)`
  display: block;
  text-align: intial;
`;
export const CardMediaStyled = styled(CardMedia)`
  height: 0;
  padding-top: 56.25%;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: darken;
`;

export const Title = styled(Typography)`
  padding: 0 16px;
`;

export const CardActionsStyled = styled(CardActions)`
  padding: 0 16px 8px 16px;
  display: flex;
  justify-content: space-between;
`;

export const Overlay = styled("div")`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
`;
export const Overlay2 = styled("div")`
  position: absolute;
  top: 20px;
  right: 5px;
  color: white;
`;

export const Details = styled("div")`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;
