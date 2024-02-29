import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectLoggedInUser } from "../AuthSlice";
function Protected({ children }) {
  const user = useSelector(selectLoggedInUser);
  const location = useLocation();
  if (!user) {
    return <Navigate to="/Signin" state={{ prevUrl: location.pathname }} />;
  }
  return children;
}

export default Protected;
