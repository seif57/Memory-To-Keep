import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Card = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
    flexDirection: "column",
  },
}));
export const Section = styled("div")(({ theme }) => ({
  borderRadius: "20px",
  margin: "10px",
  flex: 1,
}));

export const ImageSection = styled("div")(({ theme }) => ({
  marginLeft: "20px",
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
  },
}));

export const Media = styled("img")`
  border-radius: 20px;
  object-fit: center;
  width: 100%;
  max-height: 400px;
`;

export const RecommendedPosts = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const LoadingPaper = styled(Paper)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  height: 39vh;
`;
