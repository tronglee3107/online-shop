import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetail from "./pages/ProductDetail";
function App() {
    const isSellerPath = useLocation().pathname.includes("seller");
    const {showUserLogin} = useAppContext();
    return (
        <div>
            {isSellerPath ? null : <Navbar />}
            {showUserLogin && <Login />}
            <Toaster />
            <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<AllProducts />} />
                    <Route path="/products/:category" element={<ProductCategory />} />
                    <Route path="/products/:category/:productId" element={<ProductDetail />} />
                </Routes>
            </div>
            {!isSellerPath && <Footer />}
        </div>
    );
}

export default App;
