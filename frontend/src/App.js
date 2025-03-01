import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
// import HomePage from "./screens/HomePage.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
