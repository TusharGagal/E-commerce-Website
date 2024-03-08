import Navbar from "../features/Navbar/Navbar";
import AdminOrders from "../features/Admin/components/AdminOrders";
function AdminOrdersPage() {
  return (
    <div>
      <Navbar>
        <AdminOrders />
      </Navbar>
    </div>
  );
}

export default AdminOrdersPage;
