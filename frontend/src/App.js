import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import RegisterScreen from "./screens/RegisterScreen";
import OrderScreen from "./screens/OrderScreen";




import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Header />
      <main className="py-3" >
        <Container>
          <Routes>
            <Route path="/" exact element={<HomeScreen />} />
            <Route path="/login" exact element={<LoginScreen  />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/shipping" exact element={<ShippingScreen  />} />
            <Route path="/placeorder" exact element={<PlaceOrderScreen  />} />
            <Route path="/order/:id" exact element={<OrderScreen  />} />
            <Route path="/payment" exact element={<PaymentScreen  />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
