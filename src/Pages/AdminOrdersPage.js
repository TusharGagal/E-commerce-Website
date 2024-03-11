import Navbar from "../features/Navbar/Navbar";
import AdminOrders from "../features/Admin/components/AdminOrders";
import Footer from "../features/CommonComponents/Footer";

function AdminOrdersPage() {
  return (
    <div>
      <Navbar>
        <AdminOrders />
      </Navbar>
      <Footer />
    </div>
  );
}

export default AdminOrdersPage;
