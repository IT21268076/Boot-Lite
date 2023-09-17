import { Route, Routes } from "react-router-dom";
import { Login, ProductListing, Signup } from "./pages";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import FootballBootList from "./pages/FootballBootList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<FootballBootList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;