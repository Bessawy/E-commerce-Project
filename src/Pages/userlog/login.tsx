import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logUser, UserLogin } from "../../redux/reducers/userReducer";
import { useAppDispatch, useAppSelector } from "../../reduxhook/hooks";
import { UserType } from "../../Types/user";

const UserForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [toggle, setToggle] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userReducer);

  const signinHandler = () => {
    const login = async () => {
      await dispatch(UserLogin({ email: email, password: password }));
      setToggle(true)
    };
    login()
  };


  useEffect(() => {
    if (user.name !== "Guest") {
      navigate("/");
    } else {
      if (toggle) {
        setToggle(false);
        setMessage("Email and Password are not valid");
        setOpen(true);
      }
    }
  }, [user, toggle]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 3,
      }}
    >
      <Box className="logo_img" sx={{ width: 220, height: 50 }}></Box>
      <Paper sx={{ marginTop: 5, width: 500 }} component="form">
        <Typography variant="h5" sx={{ marginTop: 3, marginLeft: 5 }}>
          {" "}
          Sign In
        </Typography>
        <Divider sx={{ margin: 1 }} />
        <Typography variant="subtitle2" sx={{ marginTop: 2, marginLeft: 5 }}>
          {" "}
          Enter your email address
        </Typography>
        <TextField
          sx={{ marginLeft: 5, marginTop: 1, width: 400 }}
          required
          type="email"
          placeholder="useremail@example.com"
          autoComplete={"on"}
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>
        <Typography variant="subtitle2" sx={{ marginTop: 2, marginLeft: 5 }}>
          {" "}
          Enter your password
        </Typography>
        <TextField
          sx={{ marginLeft: 5, marginTop: 1, width: 400 }}
          required
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            marginTop: 7,
            marginBottom: 5,
          }}
        >
          <Button
            variant="contained"
            onClick={(e) => {
              signinHandler();
            }}
          >
            Continue
          </Button>
          <Typography variant="caption" marginTop={2} color="#FF5F1F">
            {" "}
            By continuing, I agree to Amr’s Privacy Policy and Terms of Use.
          </Typography>
        </Box>

        <Box sx={{ marginLeft: 4, marginRight: 4, marginBottom: 4 }}>
          <Divider>
            {" "}
            <Typography variant="caption">New to Amr's store</Typography>{" "}
          </Divider>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{ marginTop: 1, width: 300 }}
              onClick={() => navigate("/signup")}
            >
              Create your new account
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={"error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const Login = () => {
  return <UserForm />;
};

export default Login;
