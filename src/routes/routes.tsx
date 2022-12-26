import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/home";
import Products from "../Pages/product/products";
import { Routes } from "../Pages/routes";

const router = createBrowserRouter([{
    path: '',
    element: <Routes/>,
    children: [
      {
        path: '',
        element: <Home/>,
      },
      {
        path: 'products',
        element: <Products/>,
      }
    ]
  
  }])

export default router