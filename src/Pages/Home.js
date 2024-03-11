import Navbar from "../features/Navbar/Navbar";
import ProductList from "../features/Product-List/components/ProductList";
import Footer from "../features/CommonComponents/Footer";
function Home() {
  return (
    <div>
      <Navbar>
        <ProductList />
      </Navbar>
      <Footer />
    </div>
  );
}

export default Home;
