import { Button, Divider, Link, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import "./login.styles.css";

import { authenticateUserInfo, createUser } from "../api/api.service";
import {UserContext} from "../context/musicstore.context";
import jwt_decode from "jwt-decode";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
/**
 *
 * @param {*} setIsLogined - set to true if user has registered successfully
 * @param {*} setNotification - show notification for success or error
 * @param {*} setShowNotification - show hide notification
 * @param {*} setUserAgreed - set userAgreed to true / false
 *
 */
const Login = () => {
  const [registerUser, setRegisterUser] = useState(true);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [userNameError, setUserNameError] = useState(false);
  const [userEmailError, setUserEmailError] = useState(false);
  const [userPasswordError, setUserPasswordError] = useState(false);

  const { handleNotifications, setUserDetails, setIsLoggedIn,setAuthToken } =
    useContext(UserContext);
    const navigate = useNavigate();

  useEffect(() => {
    setUserNameError(false);
    if (userName === "") {
      setUserNameError(true);
    }
  }, [userName]);

  useEffect(() => {
    setUserEmailError(false);
    if (userEmail === "") {
      setUserEmailError(true);
    }
  }, [userEmail]);

  useEffect(() => {
    setUserPasswordError(false);
    if (userPassword === "") {
      setUserPasswordError(true);
    }
  }, [userPassword]);

  useEffect(() => {
    setUserEmailError(false);
    setUserNameError(false);
    setUserPasswordError(false);
  }, []);
  /**
   * Save users login info to local storage
   * @param {*} event - submit event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const User = {
      name: userName,
      email: userEmail,
      password: userPassword,
    };
    if (!userNameError && !userEmailError && !userPasswordError) {
      registerUser
        ? createUser(User)
            .then((response) => {
              const { data } = response;
              handleNotifications({ flag: "success", message: data?.message });
              setRegisterUser(false);
            })
            .catch((error) => {
              const { data } = error.response;
              handleNotifications({ flag: "error", message: data?.message });
            })
        : authenticateUserInfo(User)
            .then((response) => {
              const { data } = response;
              handleNotifications({ flag: "success", message: data?.message });
              setRegisterUser(false);
              const userDetails = jwt_decode(response.data.token);
              setUserDetails(userDetails);
              setIsLoggedIn(true);
              setAuthToken(response.data.token);
              navigate("/home");
            })
            .catch((error) => {
              const { data } = error.response;
              handleNotifications({ flag: "error", message: data?.message });
            });
    }
  };

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={1}
      flexWrap
      sx={{ width: "100%", height: "100%" }}
      alignItems="center"
      justifyContent="space-around"
    >
      <Box sx={{ width: "50%" }}>
        <Typography color="other.main" fontSize="3rem">
          We play the music.
        </Typography>
        <Typography
          fontSize="24px"
          textAlign="center"
          color="accent.light"
          fontWeight="700"
        >
          You enjoy it Deal ?.
        </Typography>
        <Player
          src="https://assets4.lottiefiles.com/private_files/lf30_xnjjfyjt.json"
          style={{ width: "400px", height: "300px" }}
          loop
          autoplay
        />
      </Box>
      <Box>
        <Typography
          padding={1}
          align="center"
          variant="h4"
          fontWeight="700"
          color="other.main"
        >
          {registerUser ? "Register" : "Login"}
        </Typography>
        <Box sx={{ border: "3px solid #ffccbc", borderRadius: "10px" }}>
          <Box className="form_fields">
            <label htmlFor="username">Username</label>
            <input
              value={userName}
              name="username"
              type="text"
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
          </Box>
          <Box className="form_fields">
            <label htmlFor="email">Email</label>
            <input
              value={userEmail}
              name="email"
              type="email"
              onChange={(event) => {
                setUserEmail(event.target.value);
              }}
            />
          </Box>
          <Box className="form_fields">
            <label htmlFor="password">Password</label>
            <input
              value={userPassword}
              name="password"
              type="password"
              onChange={(event) => {
                setUserPassword(event.target.value);
              }}
            />
          </Box>
          <Box className="form_button">
            <Button
              fullWidth
              sx={{ backgroundColor: "accent.light" }}
              variant="contained"
              onClick={handleSubmit}
            >
              {registerUser ? "Register" : "Login"}
            </Button>
          </Box>
        </Box>
        {registerUser ? (
          <Typography align="center" color="other.main" padding="1rem">
            Already an account ?{" "}
            <Link
              paddingLeft=".5rem"
              color="accent.light"
              onClick={() => setRegisterUser(false)}
            >
              Login
            </Link>
          </Typography>
        ) : (
          <Typography align="center" color="other.main" padding="1rem">
            Don't have an account ?{" "}
            <Link
              color="accent.light"
              paddingLeft=".5rem"
              onClick={() => setRegisterUser(true)}
            >
              Register
            </Link>
          </Typography>
        )}
      </Box>
    </Stack>
  );
};

export default Login;
