import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AIAnalyzer from "./pages/AIAnalyzer";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Landing Page */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        {/* Register Page */}
        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/ai-analyzer"
          element={<AIAnalyzer />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route 
          path="/order-success" 
          element={<OrderSuccess />} 
        />

        <Route 
          path="/my-orders" 
          element={<MyOrders />} 
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
