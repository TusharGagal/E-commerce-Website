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
import Checkout from "./Pages/Checkout";
import ProductdetailPage from "./Pages/ProductdetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "Signin",
    element: <Loginpage />,
  },

  {
    path: "Signup",
    element: <SignupPage />,
  },
  {
    path: "cart",
    element: <CartPage />,
  },

  {
    path: "checkout",
    element: <Checkout />,
  },

  {
    path: "product-details/:id",
    element: <ProductdetailPage />,
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
