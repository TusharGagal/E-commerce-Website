import Navbar from "../features/Navbar/Navbar";
import ProductDetails from "../features/Product-List/components/ProductDetails";
import Footer from "../features/CommonComponents/Footer";

function ProductdetailPage() {
  return (
    <div>
      <Navbar>
        <ProductDetails />
      </Navbar>
      <Footer />
    </div>
  );
}

export default ProductdetailPage;
