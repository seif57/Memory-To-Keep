import React, { useState } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import {
  AvatarStyled,
  FormStyled,
  PaperStyled,
  SubmitButtonStyled,
  GoogleButtonStyled,
} from "./styles";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import Icon from "./Icon";
import { googleSignIn } from "../../reducers/auth";
import { signIn, signUp } from "../../actions/auth";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        enqueueSnackbar("Passwords do not match", { variant: "error" });
        return;
      }
      dispatch(signUp({ formData: formData, navigate: navigate })).then(
        (res) => {
          if (res.error) {
            enqueueSnackbar(res.payload.response.data.message, {
              variant: "error",
              autoHideDuration: 3000,
            });
          } else {
            enqueueSnackbar("Successfully signed up", {
              variant: "success",
              autoHideDuration: 2000,
            });
          }
        }
      );
    } else {
      dispatch(signIn({ formData: formData, navigate: navigate })).then(
        (response) => {
          if (response.error) {
            return enqueueSnackbar(response.payload.response.data.message, {
              variant: "error",
              autoHideDuration: 2000,
            });
          }
          enqueueSnackbar(response.payload.message, {
            variant: "success",
            autoHideDuration: 2000,
          });
        }
      );
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  const googleSignInSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch(
        googleSignIn({
          token,
          result,
        })
      );
      navigate("/");
    } catch (error) {
      enqueueSnackbar(error.message, {
        autoHideDuration: 2000,
        variant: "error",
      });
    }
    enqueueSnackbar("Google sign in success", {
      TransitionComponent: Slide,
      variant: "success",
      autoHideDuration: 2000,
    });
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
            color="primary"
          >
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
                variant="contained"
              >
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
