import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import headerImg2 from "../assets/img/footergif2.gif";

export const Notfound = () => {
  return (
    <section className="project" id="projects222">
      <Container>
        <Row style={{ marginTop: '21vh' }}>
          <Col size={6} className="d-flex flex-column justify-content-center align-items-center">
            <h2 id="projects22">Coming Soon!</h2>
            <p>Astrounaut Lottery, Astrounaut Pottery and Astrounaut Prediction Coming Soon</p>
          </Col>
          <Col size={6} className="d-flex flex-column justify-content-center align-items-center">
            <img src={headerImg2} style={{height: "400px", width: "400px"}} className="" />
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
