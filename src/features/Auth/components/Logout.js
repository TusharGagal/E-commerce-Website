import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, singOutAsync } from "../AuthSlice";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(singOutAsync(user?.id));
    if (!user) {
      toast.info("You are logged Out! Kindly log in to continue.");
    }
  }, [user]);
  return <>{!user && <Navigate to="/Signin" replace={true} />}</>;
}
export default Logout;
