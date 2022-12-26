import IconButton from "@mui/material/IconButton";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useAppDispatch, useAppSelector } from "../../reduxhook/hooks";
import { toggleThemeMode } from "../../redux/reducers/themeModeReducer";
import { Box } from "@mui/system";
import { AppBar, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { findAncestor } from "typescript";
import { useState } from "react";

export const Routes = () => {
  const mode = useAppSelector((state) => state.themeReducer) as
    | "dark"
    | "light";

  const dispatch = useAppDispatch();
  const toggleTheme = () => {
    dispatch(toggleThemeMode());
  };

  return (
    <div className="route">
      <AppBar style={{ margin: 0, padding: 0 }}>
        <Toolbar
          sx={{
            margin: 0,
            bgcolor: "background.default",
            color: "text.primary",
            boxShadow: 3,
            p: 0
          }}
        >
          <Tabs sx={{marginRight: "auto"}} value={0} indicatorColor="secondary">
            <Tab value={0} label="Home" />
            <Tab value={1} label="About" />
          </Tabs>

          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <ModeNightIcon /> : <LightModeIcon />}
          </IconButton>
          <ShoppingCartIcon />
        </Toolbar>
      </AppBar>
      <footer></footer>
    </div>
  );
};
