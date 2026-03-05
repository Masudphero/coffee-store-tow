import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AddCoffee from "../Components/AddCoffee";
import UpdateCoffee from "../Components/UpdateCoffee";
import View from "../Components/View";
import Signin from "../Components/Signin"; // ✅ Import
import Register from "../Components/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "signin", element: <Signin /> }, // ✅ path must match "/signin"
      {path:"register", element:<Register/>},
      { 
        path: "addCoffee", 
        element: <AddCoffee /> 
      },
      { 
        path: "updateCoffee/:id", 
        element: <UpdateCoffee /> 
      },
      { path: "coffee/:id", element: <View /> },
    ],
  },
]);

export default router;