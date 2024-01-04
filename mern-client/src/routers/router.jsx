import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  import App from "../App";
  import Home from "../home/Home";
  import Shop from "../shop/Shop";
  import Blog from "../components/Blog";
  import SingleBook from "../shop/SingleBook";
  import DashboardLayout from "../dashboard/DashboardLayout";
  import Dashboard from "../dashboard/Dashboard";
  import UploadBook from "../dashboard/UploadBook";
  import ManageBooks from "../dashboard/ManageBooks";
  import EditBooks from "../dashboard/EditBooks";
  import Signup from "../components/Signup";
import Login from "../components/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Logout from "../components/Logout";
import MyBooks from "../components/myBooks";
import { Banner } from "flowbite-react";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,  
  },
    {
      path: "/",
      element: <App/>,
      children: [
       
        {
          path: "/home",
          element: <Home/>,  
      },
     
        {
            path: "/shop",
            element: <Shop/>,  
        },
        {
            path: "/mybooks",
            element: <MyBooks/>,  
        },
        {
            path: "/blog",
            element: <Blog/>,  
        },
        {
          path: "/book/:id",
          element: <SingleBook/>,
          loader: ({params}) => fetch(`https://mern-backend-qvrj.onrender.com/book/${params.id}`),
        },
        {
          path: "/book/:id/mybooks",
          element: <MyBooks/>,
          loader: ({params}) => fetch(`https://mern-backend-qvrj.onrender.com/book/${params.id}`),
        },
        {
          path: "/book/:id/banner",
          element: <Banner/>,
          loader: ({params}) => fetch(`https://mern-backend-qvrj.onrender.com/book/${params.id}`),
        }
      ]
    },
    {
          path: "/logout",
          element: <Logout/>,  
      },
    {
      path: "/admin/dashboard",
      element: <DashboardLayout/>,
      children: [
        {
          path: "/admin/dashboard",
          element: <PrivateRoute><Dashboard/></PrivateRoute> 
        },
        {
          path: "/admin/dashboard/upload",
          element: <UploadBook/>
        },
        {
          path: "/admin/dashboard/manage",
          element: <ManageBooks/>
        },
        {
          path: "/admin/dashboard/edit-books/:id",
          element: <EditBooks/>,
          loader: ({params}) => fetch(`https://mern-backend-qvrj.onrender.com/book/${params.id}`)
        }
        
      ]
    },
    {
      path: "/Sign-up",
      element:<Signup/> 
    },
    {
      path: "login",
      element: <Login/>
    },
    ,
    {
      path: "logout",
      element: <Logout/>
    }
   
    
  ]);

  export default router;
  