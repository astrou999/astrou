import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import { Container, Row, Col, Image } from "react-bootstrap";

export const Skills = () => {

  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>Get your tickets now!</h2>
                        <h2 className="mt-5">1<span style={{fontSize: "0.7em"}}>d</span> 19<span style={{fontSize: "0.7em"}}>h</span> 55<span style={{fontSize: "0.7em"}}>m</span> <span style={{fontSize: "0.7em"}}>until the draw</span></h2>
                        <Container>
                          <Row className="mt-5">
                            <Col lg={6} sm={12}>
                              <p>Next Draw</p>
                            </Col>
                            <Col lg={6} sm={12}>
                              <h3>#626 | Draw: Aug 17, 2022, 7:00 PM</h3>
                            </Col>
                          </Row>
                          <Row className="mt-5">
                            <Col lg={6} sm={12}>
                              <p>Prize Pot</p>
                            </Col>
                            <Col lg={6} sm={12}>
                              <h2>$123.000</h2>
                            </Col>
                          </Row>
                          <Row className="mt-5">
                            <Col lg={6} sm={12}>
                              <p>Your Tickets</p>
                            </Col>
                            <Col lg={6} sm={12}>
                              <div className="new-lottery-bx">
                                <button className="d-flex justify-content-center" type="submit">Buy Tickets!</button>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className="mt-5">Connect your wallet to check if you've won!</h3>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="new-lottery-bx mt-2">
                                <button className="d-flex justify-content-center w-50" type="submit">Connect Wallet</button>
                              </div>
                            </Col>
                          </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
