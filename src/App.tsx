import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import "./Styles/app.scss";

import { useAppDispatch, useAppSelector } from "./reduxhook/hooks";
import { fetchAllProduct } from "./redux/reducers/productReducer";
import { darkTheme } from "./Themes/darkTheme";
import { lightTheme } from "./Themes/lightTheme";
import router from "./routes/routes";

function App() {
  const mode = useAppSelector((state) => state.themeReducer) as
    | "dark"
    | "light";

  const dispatch = useAppDispatch();

  useEffect(()=>{
    const themeLocalStorage = async () => {
      localStorage.setItem('theme', mode)
    }
    themeLocalStorage()
  }, [mode])

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  return (
    <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
