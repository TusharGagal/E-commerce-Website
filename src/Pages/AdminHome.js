import Navbar from "../features/Navbar/Navbar";
import AdminProductList from "../features/Admin/components/AdminProductList";
import Footer from "../features/CommonComponents/Footer";

function AdminHome() {
  return (
    <div>
      <Navbar>
        <AdminProductList />
      </Navbar>
      <Footer />
    </div>
  );
}

export default AdminHome;
