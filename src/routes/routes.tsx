import { createBrowserRouter } from "react-router-dom";
import Cart from "../Pages/cart/Cart";
import Home from "../Pages/home";
import Createproduct from "../Pages/product/createproduct";
import Products from "../Pages/product/products";
import ProductInfo from "../Pages/product/product_info";
import { Routes } from "../Pages/routes";
import Login from "../Pages/userlog/login";
import Profile from "../Pages/userlog/profilePage";
import ProtectRoutes from "../Pages/userlog/protectedroutes";
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
        path: "products/:id",
        element: <ProductInfo />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "createproduct",
        element: <Createproduct />,
      },
      {
        path: "profile",
        element: (
          <ProtectRoutes>
            <Profile />
          </ProtectRoutes>
        ),
      },
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
