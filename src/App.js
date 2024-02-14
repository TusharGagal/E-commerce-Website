import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ProductList from "./features/Product-List/ProductList";
import Navbar from "./features/Navbar/Navbar";
import Home from "./Pages/Home";
import Loginpage from "./Pages/Loginpage";
import SignupPage from "./Pages/SignupPage";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "SignIn",
    element: <Loginpage />,
  },

  {
    path: "SignUp",
    element: <SignupPage />,
  },
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
