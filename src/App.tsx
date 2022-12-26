import React, { useEffect } from "react";
import { Routes } from "./Pages/routes/routes";
import { fetchAllProduct } from "./redux/reducers/productReducer";
import { useAppDispatch, useAppSelector } from "./reduxhook/hooks";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import { darkTheme } from "./Themes/darkTheme";
import { lightTheme } from "./Themes/lightTheme";
import './Styles/app.scss'
import { url } from "inspector";

function App() {
  const mode = useAppSelector((state) => state.themeReducer) as
    | "dark"
    | "light";

  const products = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, []);
  

  return (
    <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className={'app-'+mode}>
          <Routes />
      </div>
    </ThemeProvider>
  );
}

export default App;
