import { React, useEffect } from "react";
import "./App.css";
import Home from "./Pages/Home";
import Loginpage from "./Pages/Loginpage";
import SignupPage from "./Pages/SignupPage";
import PageNotFound from "./Pages/404page";
import CartPage from "./Pages/Cartpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import OrderSuccessPage from "./Pages/OrderSuccessPage";
import UserOrderPage from "./Pages/UserOrderPage";

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
  {
    path: "order-success/:id",
    element: <OrderSuccessPage />,
  },
  {
    path: "myorders",
    element: (
      <Protected>
        <UserOrderPage />,
      </Protected>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
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
      <ToastContainer />
    </div>
  );
}

export default App;
