import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./components/AppRoutes";
import Navbar from "./components/Navbar";
function App() {
  return (
    <Router>
      <h1>React blog</h1>
      <Navbar />
      <AppRoutes />
    </Router>
  );
}

export default App;
