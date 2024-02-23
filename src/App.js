import { React, useEffect } from "react";
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
import Protected from "./features/Auth/components/Protected";
import { selectLoggedInUser } from "./features/Auth/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchItemsByUserIdAsync } from "./features/Cart/CartSlice";

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
    element: (
      <Protected>
        <CartPage />,
      </Protected>
    ),
  },

  {
    path: "checkout",
    element: (
      <Protected>
        <Checkout />,
      </Protected>
    ),
  },

  {
    path: "product-details/:id",
    element: <ProductdetailPage />,
  },
]);
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
