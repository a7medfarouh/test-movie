import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Movies from "./Components/Movies/Movies";
import Tv from "./Components/Tv/Tv";
import People from "./Components/People/People";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";



import AuthContextProvider, {
  AuthContext,
} from "./Components/Context/AuthContext";

import jwtDecode from "jwt-decode";
import { useContext, useEffect } from "react";
import MediaContextProvider from "./Components/Context/MediaContext";
import MoivieDetails from "./Components/MovieDetails/MovieDetails";
import SearchContextProvider from "./Components/Context/SearchContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import MovieDetail from "./Components/MovieDetail/MovieDetail";

import './App.css';
import { Offline, Online } from "react-detect-offline";
import Darkmode from 'darkmode-js';



function App() {
  // new Darkmode().showWidget();
  const options = {
    bottom: '64px', // default: '32px'
    right: '0px', // default: '32px'
    left: '95%', // default: 'unset'
    time: '0.5s', // default: '0.3s'
    mixColor: '#fff', // default: '#fff'
    backgroundColorDark: '#fff',
    backgroundColorLight: '#100f2c',
    ColorDark: '#fff',
    ColorLight: '#100f2c',  // default: '#fff'
    buttonColorDark: '#100f2c',  // default: '#100f2c'
    buttonColorLight: '#fff', // default: '#fff'
    saveInCookies: false, // default: true,
    label: '🌓', // default: ''
    autoMatchOsTheme: true // default: true
  }
  
  const darkmode = new Darkmode(options);
  darkmode.showWidget();
 
  let router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            
              <Home />
            
          ),
        },
        {
          path: "about",
          element: (
            
              <About />
            
          ),
        },
        {
          path: "movies",
          element: (
            
              <Movies />
            
          ),
        },
        {
          path: "tv",
          element: (
            
              <Tv />
            
          ),
        },
        {
          path: "people",
          element: (
            
              <People />
            
          ),
        },
        {
          path: "moviedetails/:id/:media_type",
          element: (
            <ProtectedRoute>
              <MoivieDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "moviedetail/:id/:media_type",
          element: (
            <ProtectedRoute>
              <MovieDetail/>
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <Login /> },
      ],
    },
  ]);
  const { userData, setUserData } = useContext(AuthContext);

  function saveUserData() {
    let encodedToken = localStorage.getItem("user token");
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setUserData(decodedToken);
  }
  useEffect(() => {
    if (localStorage.getItem("user token") !== null) {
      saveUserData();
    }
  }, []);

  return (
    <>
      <Offline>
        <div className="offline">
          You Are Offline. Some functionality may be unavailable .
        </div>
      </Offline>

      <MediaContextProvider>
        <SearchContextProvider>
          <RouterProvider router={router} />
        </SearchContextProvider>
      </MediaContextProvider>
    </>
  );
}

export default App;
