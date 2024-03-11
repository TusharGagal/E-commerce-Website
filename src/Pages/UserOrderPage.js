import Navbar from "../features/Navbar/Navbar";
import UserOrders from "../features/User/components/UserOrders";
import Footer from "../features/CommonComponents/Footer";

export default function UserOrderPage() {
  return (
    <>
      <Navbar>
        <UserOrders />
      </Navbar>
      <Footer />
    </>
  );
}
