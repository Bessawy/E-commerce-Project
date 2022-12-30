import { createBrowserRouter } from "react-router-dom";
import Cart from "../Pages/cart/Cart";
import Home from "../Pages/home";
import Products from "../Pages/product/products";
import { Routes } from "../Pages/routes";
import Login from "../Pages/userlog/login";
import Register from "../Pages/userlog/register";

const router = createBrowserRouter([
  {
    path: "",
    element: <Routes />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "cart",
        element: <Cart />
      }
    ],
  },
  {
    path: "signin",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Register />,
  },
]);

export default router;
