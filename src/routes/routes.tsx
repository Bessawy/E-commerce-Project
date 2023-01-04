import { createBrowserRouter } from "react-router-dom";

import Cart from "../Pages/cart/Cart";
import Home from "../Pages/home";
import Notfound from "../Pages/notfound";
import Createproduct from "../Pages/product/createproduct";
import Products from "../Pages/product/products";
import ProductInfo from "../Pages/product/product_info";
import { Routes } from "../Pages/routes";
import Login from "../Pages/userlog/login";
import Profile from "../Pages/userlog/profilePage";
import ProtectAdmin from "../Pages/userlog/protectedAdmin";
import ProtectLogin from "../Pages/userlog/protectedLogin";
import Register from "../Pages/userlog/register";
import Users from "../Pages/userlog/Users";

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
        path: "users",
        element: (
          <ProtectAdmin>
            <Users />
          </ProtectAdmin>
        ),
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
          <ProtectLogin>
            <Profile />
          </ProtectLogin>
        ),
      },
      {
        path: "*",
        element: <Notfound />,
      },
      {},
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
