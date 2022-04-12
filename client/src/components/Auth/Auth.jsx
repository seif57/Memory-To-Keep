import React, { useState } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import {
  AvatarStyled,
  FormStyled,
  PaperStyled,
  SubmitButtonStyled,
  GoogleButtonStyled,
} from "./styles";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import Icon from "./Icon";
import { login } from "../../reducers/auth";

function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    console.log("submit");
  };
  const handleChange = () => {
    console.log("change");
  };
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    handleShowPassword(false);
  };

  const googleSignInSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch(
        login({
          token,
          result,
        })
      );
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
    enqueueSnackbar("Google sign in success", { variant: "success" });
  };
  const googleSignInFailure = (error) => {
    enqueueSnackbar("Google sign in failed", { variant: "error" });
  };

  return (
    <Container component="main" maxWidth="xs">
      <PaperStyled elevation={3}>
        <AvatarStyled>
          <LockOutlinedIcon />
        </AvatarStyled>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <FormStyled onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  handleChange={handleChange}
                  name="firstName"
                  autoFocus
                  label="First Name"
                  half
                />
                <Input
                  handleChange={handleChange}
                  name="lastName"
                  label="Last Name"
                  half
                />
              </>
            )}
            <Input
              name="email"
              handleChange={handleChange}
              label="Email"
              type="email"
            />
            <Input
              name="password"
              handleChange={handleChange}
              label="Password"
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                handleChange={handleChange}
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>
          <SubmitButtonStyled
            type="submit"
            fullWidth
            variant="contained"
            color="primary">
            {isSignUp ? "Sign Up" : "Sign In"}
          </SubmitButtonStyled>
          <GoogleLogin
            clientId="304570305118-gpf4hre2shqgj994q9vmlb49s5avp61n.apps.googleusercontent.com"
            render={(renderProps) => (
              <GoogleButtonStyled
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained">
                Sign In with Google
              </GoogleButtonStyled>
            )}
            onSuccess={googleSignInSuccess}
            onFailure={googleSignInFailure}
            cookiePolicy={"single_host_origin"}
          />
          <Grid container justifyContent="space-around">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </FormStyled>
      </PaperStyled>
    </Container>
  );
}

export default Auth;
