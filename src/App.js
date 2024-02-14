import React from "react";
import "./App.css";
import Home from "./Pages/Home";
import Loginpage from "./Pages/Loginpage";
import SignupPage from "./Pages/SignupPage";
import CartPage from "./Pages/Cartpage";

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
  {
    path: "cart",
    element: <CartPage />,
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
