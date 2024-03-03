import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../AuthSlice";
function Protected({ children }) {
  const user = useSelector(selectLoggedInUser);

  if (!user) {
    return <Navigate to="/Signin" />;
  }
  return children;
}

export default Protected;
