import IconButton from "@mui/material/IconButton";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useAppDispatch, useAppSelector } from "../reduxhook/hooks";
import { toggleThemeMode } from "../redux/reducers/themeModeReducer";
import {
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink, Outlet } from "react-router-dom";


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
          <Typography>
            <NavLink to="/"> Home </NavLink>
          </Typography>
          <Typography sx={{ml: 1}}>
            <NavLink to="/products"> Products </NavLink>
          </Typography>

          <IconButton sx={{ marginLeft: "auto" }} onClick={toggleTheme}>
            {mode === "dark" ? <ModeNightIcon /> : <LightModeIcon />}
          </IconButton>
          <ShoppingCartIcon />
        </Toolbar>
      </AppBar>

      <Outlet/>

      <footer>

      </footer>
    </div>
  );
};

