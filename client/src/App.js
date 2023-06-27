import "./App.css";
import AllRoutes from "./Components/AllRoutes";
import NavbarTop from "./Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <NavbarTop />
      <AllRoutes />
    </div>
  );
}

export default App;
