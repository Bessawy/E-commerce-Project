import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUser } from "../../redux/reducers/userReducer";
import { useAppDispatch, useAppSelector } from "../../reduxhook/hooks";
import { newUserAvatar } from "../utils";

const UserForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [msgStatus, setmsgStatus] = useState<"error" | "success">("success");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReducer);

  const createAccount = () => {
    if (password.length < 5) {
      setMessage("Password is too short!");
      setmsgStatus("error");
      setOpen(true);
    } else {
      dispatch(
        createUser({
          email: email,
          password: password,
          name: name,
          avatar: new URL(newUserAvatar),
        })
      ).then((res) => {
        if ("error" in res) {
          setMessage("Data entered is invalid!");
          setmsgStatus("error");
          setOpen(true);
        }
      });
    }
  };

  useEffect(() => {
    if (user.name !== "Guest") {
      navigate("/");
    }
  }, [user, navigate]);

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
          Create new account
        </Typography>
        <Divider sx={{ margin: 1 }} />
        <Grid container>
          <Grid item xs={6}>
            <Typography
              variant="subtitle2"
              sx={{ marginTop: 2, marginLeft: 5 }}
            >
              {" "}
              First name
            </Typography>
            <TextField
              sx={{ marginLeft: 5, marginTop: 1, width: 190 }}
              required
              type="name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" sx={{ marginTop: 2 }}>
              {" "}
              Family name
            </Typography>
            <TextField
              sx={{ marginTop: 1, width: 190 }}
              type="name"
              variant="outlined"
            ></TextField>
          </Grid>
        </Grid>

        <Typography variant="subtitle2" sx={{ marginTop: 2, marginLeft: 5 }}>
          {" "}
          Enter your email address
        </Typography>
        <TextField
          sx={{ marginLeft: 5, marginTop: 1, width: 400 }}
          required
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="user@mail.com"
          autoComplete="off"
          variant="outlined"
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
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          variant="filled"
        ></TextField>
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <Button
            variant="contained"
            type="submit"
            onClick={() => createAccount()}
          >
            Create Account
          </Button>
          <Typography variant="caption" marginTop={2} color="#FF5F1F">
            {" "}
            By continuing, I agree to Amr’s Privacy Policy and Terms of Use.
          </Typography>
        </Box>

        <Divider sx={{ pl: 4, pr: 4 }}>
          {" "}
          <Typography variant="caption">
            already have an account
          </Typography>{" "}
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
            sx={{ margin: 1, width: 100 }}
            onClick={() => navigate("/signin")}
          >
            Sign in
          </Button>
        </Box>
      </Paper>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={msgStatus}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const Register = () => {
  return <UserForm />;
};

export default Register;
