import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../AuthSlice";
import { selectUserInfo } from "../../User/userSlice";
function Protected({ children }) {
  const user = useSelector(selectUserInfo);

  if (!user) {
    return <Navigate to="/Signin" replace={true} />;
  }
  if (user && user.role != "admin") {
    return <Navigate to="/" replace={true} />;
  }

  return children;
}

export default Protected;
