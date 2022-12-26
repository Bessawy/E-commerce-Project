import IconButton from "@mui/material/IconButton";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useAppDispatch, useAppSelector } from "../reduxhook/hooks";
import { toggleThemeMode } from "../redux/reducers/themeModeReducer";
import {
  AppBar,
  Box,
  Divider,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink, Outlet } from "react-router-dom";
import { Container } from "@mui/system";

export const Routes = () => {
  const mode = useAppSelector((state) => state.themeReducer) as
    | "dark"
    | "light";

  const dispatch = useAppDispatch();
  const toggleTheme = () => {
    dispatch(toggleThemeMode());
  };

  return (
    <div className="root">
      <AppBar style={{ margin: 0, padding: 0 }}>
        <Toolbar
          sx={{
            margin: 0,
            bgcolor: "background.default",
            color: "text.primary",
            boxShadow: 3,
            p: 0,
          }}
        >
          <NavLink to="/">
            {" "}
            <Box
              className="logo_img"
              sx={{ width: 230, height: 50, marginRight: 10 }}
            ></Box>
          </NavLink>
          <Typography>
            <NavLink to="/"> Home </NavLink>
          </Typography>
          <Typography sx={{ ml: 1 }}>
            <NavLink to="/products"> Products </NavLink>
          </Typography>
          <IconButton sx={{ marginLeft: "auto" }} onClick={toggleTheme}>
            {mode === "dark" ? <ModeNightIcon /> : <LightModeIcon />}
          </IconButton>
          <IconButton>
            <ShoppingCartIcon />
          </IconButton>
          <IconButton>
            <Box className="login_img"
              sx={{ width: 50, height: 50}}></Box>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Outlet />

      <footer>
        <Paper sx={{ marginTop: 10, paddingBottom: 10, paddingTop: 6 }}>
          <Container maxWidth="lg">
            <Typography variant="subtitle2">
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Box borderBottom={1} marginBottom={2}>
                    {" "}
                    Help
                  </Box>
                  <Box>
                    <NavLink to="/"> Contact </NavLink>
                  </Box>
                  <Box>
                    <NavLink to="/"> Support </NavLink>
                  </Box>
                  <Box>
                    <NavLink to="/"> Privacy </NavLink>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box borderBottom={1} marginBottom={2}>
                    Account
                  </Box>
                  <Box>
                    <NavLink to="/"> Login </NavLink>
                  </Box>
                  <Box>
                    <NavLink to="/"> Register </NavLink>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box borderBottom={1} marginBottom={2}>
                    Navigate
                  </Box>
                  <Box>
                    <NavLink to="/"> Home </NavLink>
                  </Box>
                  <Box>
                    <NavLink to="/products"> Products </NavLink>
                  </Box>
                </Grid>
              </Grid>
              <Box textAlign="center" sx={{ margin: 4 }} fontWeight={400}>
                <b>AMR</b> Shopping Center &copy; {new Date().getFullYear()}
              </Box>
            </Typography>
          </Container>
        </Paper>
      </footer>
    </div>
  );
};
