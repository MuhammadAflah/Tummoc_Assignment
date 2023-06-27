import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GLogin from "./GLogin";
import { BackendUrl } from "../Utils/Contants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../Redux/action";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const defaultTheme = createTheme();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      let url = BackendUrl + "login";
      console.log("Network calling to url", url);
      let body = { ...userDetails };
      axios
        .post(url, body)
        .then((res) => {
          const { token: userToken, message } = res.data;
          dispatch(setToken(userToken));
          alert(message);
        })
        .catch((error) => {
          console.log("Error in handleSubmit catch:", error);
        });
    } catch (error) {
      console.log("Error in handleSubmit", error);
    }
    setUserDetails({
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
    //  to ignore the warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      {token ? null : (
        <div className="user_form">
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  {/* <LockOutlinedIcon /> */}
                </Avatar>
                <Typography component="h1" variant="h5">
                  Login
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleChange}
                    value={userDetails.email}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    value={userDetails.password}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    LogIn
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
          <GLogin />
        </div>
      )}
    </>
  );
}
