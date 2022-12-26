import { useEffect } from "react";
import { fetchAllProduct } from "./redux/reducers/productReducer";
import { useAppDispatch, useAppSelector } from "./reduxhook/hooks";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { darkTheme } from "./Themes/darkTheme";
import { lightTheme } from "./Themes/lightTheme";
import './Styles/app.scss'
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";


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
      <RouterProvider router={router}/>
    </ThemeProvider>
  );
}

export default App;
