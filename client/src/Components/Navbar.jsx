import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../Redux/action";
import { useNavigate } from "react-router-dom";
import { parseToken } from "../Utils/JwtUtils";
import { BackendUrl } from "../Utils/Contants";

function NavbarTop() {
  const { token } = useSelector((store) => store);
  const navigate = useNavigate();
  let userName = null;
  if (token) {
    const payload = parseToken(token);
    const { firstName } = payload?.user;
    userName = firstName;
  }

  const dispatch = useDispatch();

  const handleLogout = () => {
    // To delete the token as no longer availabe after logout
    dispatch(setToken(null));
    alert("Logout successfully");
    window.open(`${BackendUrl}auth/google/logout`, "_self");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#home">Tummaco</Navbar.Brand>
          <Nav className="me-auto">
            {token ? (
              <>
                <Nav.Link href="/home">Dashboard</Nav.Link>
              </>
            ) : null}
          </Nav>
          {token ? (
            <Nav>
              <Nav.Link href="#">{userName}</Nav.Link>
              <Nav.Link href="#" onClick={handleLogout}>
                Logout
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Signup</Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarTop;
