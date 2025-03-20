import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register"
import Dashboard from "./pages/dashboard/Dashboard";
import Myprofile from "./pages/myprofile/Myprofile";
import Userindiv from "./pages/userindiv/Userindiv";

function App(){
  const router=createBrowserRouter([
    {path:"/",element:<Home/>},
    {path:"/login",element:<Login/>},
    {path:"/register",element:<Register/>},
    {path:"/dashboard",element:<Dashboard/>},
    {path:"/myprofile",element:<Myprofile/>},
    {path:"/user/:fullname/:email/:skill/:id",element:<Userindiv/>}
  ])
  return(
    <div>
     
     <RouterProvider router={router}/>
    </div>
  )
}

export default App;