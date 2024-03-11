import Navbar from "../features/Navbar/Navbar";
import UserProfile from "../features/User/components/UserProfile";
import Footer from "../features/CommonComponents/Footer";

export default function UserProfilePage() {
  return (
    <>
      <Navbar>
        <UserProfile />
      </Navbar>
      <Footer />
    </>
  );
}
