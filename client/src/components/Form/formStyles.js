import { TextField, Button, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));
export const TextFieldStyled = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1),
}));

export const SubmitButtonStyled = styled(Button)(({ theme }) => ({
  marginBottom: 10,
}));

export const FormContainerStyled = styled("form")(
  ({ theme }) => `
 display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
);

export const FileInputContainerStyled = styled("div")(
  ({ theme }) => `
  width: 97%;
  margin: 10px 0;
`
);
