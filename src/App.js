import { React, useEffect } from "react";
import "./App.css";
import Home from "./Pages/Home";
import AdminHome from "./Pages/AdminHome";
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
import AdminProductdetailPage from "./Pages/AdminProductdetailPage";
import Protected from "./features/Auth/components/Protected";
import ProtectedAdmin from "./features/Auth/components/ProtectedAdmin";
import {
  checkAuthAsync,
  selectLoggedInUser,
  selectUserChecked,
} from "./features/Auth/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchItemsByUserIdAsync } from "./features/Cart/CartSlice";
import OrderSuccessPage from "./Pages/OrderSuccessPage";
import UserOrderPage from "./Pages/UserOrderPage";
import UserProfilePage from "./Pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/User/userSlice";
import Logout from "./features/Auth/components/Logout";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import AdminProductFormPage from "./Pages/AdminProductFormPage";
import AdminOrdersPage from "./Pages/AdminOrdersPage";
import StripeCheckout from "./Pages/StripeCheckout";
import ResetPasswordPage from "./Pages/ResetPasswordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome />
      </ProtectedAdmin>
    ),
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
    path: "Logout",
    element: <Logout />,
  },
  {
    path: "forgotPassword",
    element: <ForgotPasswordPage />,
  },
  {
    path: "cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },

  {
    path: "checkout",
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },

  {
    path: "product-details/:id",
    element: <ProductdetailPage />,
  },
  {
    path: "/admin/product-details/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductdetailPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage />,
  },
  {
    path: "/myorders",
    element: (
      <Protected>
        <UserOrderPage />
      </Protected>
    ),
  },
  {
    path: "/myprofile",
    element: (
      <Protected>
        <UserProfilePage />
      </Protected>
    ),
  },
  {
    path: "/stripe-checkout",
    element: (
      <Protected>
        <StripeCheckout />
      </Protected>
    ),
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      {userChecked && <RouterProvider router={router} />}
      <ToastContainer />
    </div>
  );
}

export default App;
