import { styled } from "@mui/material/styles";
import { AppBar, Typography } from "@mui/material";

export const AppBarStyled = styled(AppBar)`
  display: flex;
  border-radius: 15px;
  flex-direction: row;
  margin: 30px 0;
  justify-content: center;
  align-items: center;
`;

export const TitleStyled = styled(Typography)`
  color: rgba(0, 183, 255, 1);
`;

// export default makeStyles((theme) => ({
//   appBar: {
//     borderRadius: 15,
//     margin: "30px 0",
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   heading: {
//     color: "rgba(0,183,255, 1)",
//   },
//   image: {
//     marginLeft: "15px",
//   },
// }));
