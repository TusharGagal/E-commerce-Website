import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../AuthSlice";
import { selectUserInfo } from "../../User/userSlice";
function Protected({ children }) {
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);
  if (!user) {
    return <Navigate to="/Signin" replace={true} />;
  }
  if (user && userInfo.role !== "admin") {
    return <Navigate to="/" replace={true} />;
  }

  return children;
}

export default Protected;
