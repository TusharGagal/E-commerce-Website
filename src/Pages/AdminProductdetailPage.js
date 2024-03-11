import Navbar from "../features/Navbar/Navbar";
import AdminProductDetails from "../features/Admin/components/AdminProductDetails";
import Footer from "../features/CommonComponents/Footer";

function AdminProductdetailPage() {
  return (
    <div>
      <Navbar>
        <AdminProductDetails />
      </Navbar>
      <Footer />
    </div>
  );
}

export default AdminProductdetailPage;
