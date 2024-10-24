import { createBrowserRouter,Outlet } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage.jsx';
import Login from './Routes/Login';
import SignUp from './Routes/SignUp'; 
import Search from './Routes/SearchForService';  
import NavBar from './components/NavBar/navbar';
import Footer from './components/Footer/Footer';
import Edit from './Routes/EditProfile';  
import Messages from './Routes/Messages';
import Message from './Routes/Message';
import Service from './Routes/Service';
import Orders from './Routes/Orders';
import Add from './Routes/Add';
import MyGigs from './Routes/MyGigs.jsx';
import Gig from './Routes/gig.jsx';
import Pay from './Routes/pay.jsx';
import Success from './Routes/success.jsx';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
}from "@tanstack/react-query";


export const Layout = ()=>{
  const queryClient = new QueryClient()
    return(
        <QueryClientProvider client={queryClient}>
          <NavBar/>
          <Outlet/>
          <Footer/>
        </QueryClientProvider>
      
    )
};
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path:"/",
          element: <HomePage/>
        },
        {
          path:"/login",
          element: <Login/>
        },
        {
          path:"/signup",
          element: <SignUp/>
        },
        {
          path:"/SearchForService",
          element: <Search/>
        },
        {
          path:"/EditProfile",
          element: <Edit/>
        },
        {
          path:"/Messages",
          element: <Messages/>
        },
        {
          path:"/message/:id",
          element: <Message/>
        },
        {
          path:"/service",
          element: <Service/>
        },
        {
          path:"/Orders",
          element: <Orders/>
        },
        {
          path:"/gig/:id",
          element: <Gig/>
        },
        {
          path:"/MyGigs",
          element: <MyGigs/>
        },
        {
          path:"/Add",
          element: <Add/>
        },
        {
          path:"/Pay/:id",
          element: <Pay/>
        },
        {
          path:"/Success",
          element: <Success/>
        },
      ]
    }
  ]);
