import { Container, Col, Row } from "react-bootstrap";
import Account from "./Account";
import { Routes, Route } from "react-router-dom";
import FreeComponent from "./FreeComponent";
import AuthComponent from "./AuthComponent";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1>React Authentication Tutorial</h1>

          <section id="navigation">
            <a href="/">Home</a>
            <a href="/free">Free Component</a>
            <a href="/auth">Auth Component</a>
          </section>
        </Col>
      </Row>

      {/* Create routes here */}
      <Routes>
        <Route exact path="/" Component={Account} />
        <Route exact path="/free" Component={FreeComponent} />
        <Route exact path="/auth" element={<ProtectedRoutes>
          <AuthComponent />
        </ProtectedRoutes>} />
      </Routes>
    </Container>
  );
}

export default App;
