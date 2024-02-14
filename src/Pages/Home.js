import Navbar from "../features/Navbar/Navbar";
import ProductList from "../features/Product-List/ProductList";

function Home() {
  return (
    <div>
      <Navbar>
        <ProductList />
      </Navbar>
    </div>
  );
}

export default Home;
