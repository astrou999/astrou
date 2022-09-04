import { useState, useEffect } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import claimed from "../assets/img/claimed.png"
import headerImg from "../assets/img/header-img.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

import readAbleNumber from "../helpers/stringReadable";
import formatTime from "../helpers/formatTime";
import shorterAddress from "../helpers/shorterAddress";

export const Banner = ({ 
  isConnected,
  isLastPrizeClaimed,
  tokenAddress,
  accountBalance, 
  isAccountHolder,
  drawWinner, 
  prizeBalance, 
  winnerAddress, 
  lastPrize, 
  lastPrizeClaimed,
  totalHolders, 
  minimumPrizeForDraw, 
  drawTime, 
  claimPrize,
  totalPrizeClaimed,
  totalPrizeBurned,
  winnerList,
}) => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "ST Reward", "ST Reward", "ST Reward" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  useEffect(() => {
    if (minimumPrizeForDraw) {
      move()
    }
  }, [minimumPrizeForDraw, prizeBalance])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  function drawTheWinner (e) {
    console.log("submit");
    e.preventDefault()
    drawWinner()
  }

  function claimPrizeHandle (e) {
    console.log("submit");
    e.preventDefault()
    claimPrize()
  }

  // function move() {
  function move() {
    var max = minimumPrizeForDraw
    var percentage = prizeBalance / max * 100
    var i = 0;
    if (i == 0) {
      i = 1;
      var elem = document.getElementById("myBar");
      var number = document.getElementById("value");
      var button = document.getElementById("draw")
      var width = 1;
      var id = setInterval(frame, 80);
      function frame() {
        if (i >= percentage) {
          clearInterval(id);
        } else 
        if (i >= 100) {
          i++;
          number.textContent = readAbleNumber((i * max / 100).toFixed()) + " $AST";
          button.style.display = 'block'
          number.style.marginTop = "-15px"
        } else {
          width++;
          i++;
          elem.style.width = width + "%";
          number.textContent = readAbleNumber((i * max / 100).toFixed()) + " $AST";
        }
      }
    }
  }
  // }

  return (
    <>
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col className="d-flex justify-content-center">
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline d-flex justify-content-center" style={{width: "100%"}}>Hello there! Welcome to</span>
                <h1 className="d-flex justify-content-center mb-3" style={{ fontWeight: 'bolder'}}>{`A`}<span className="txt-rotate" data-period="1000" data-rotate='[ "st Reward", "st Reward", "st Reward" ]'><span className="wrap">{text}</span></span></h1>
                <h4 className="d-flex justify-content-center mb-5">HOLD AND WIN THE REWARD!</h4>
                <h3 className="d-flex justify-content-center ">Reach {readAbleNumber(minimumPrizeForDraw)} $AST</h3>
                <h3 className="d-flex justify-content-center mb-5">To Draw REWARD!</h3>


                <h5 className="d-flex justify-content-center ">Current Reward Balance</h5>
                <div id="myProgress">
                  <div id="myBar">
                      <div id="value" className="fs-4 text-nowrap">0</div>
                      <div id="draw" style={{display: "none", cursor: "pointer"}} onClick={(e) => drawTheWinner(e)} className="fs-5">DRAW WINNER</div>
                  </div>
                </div>
                <h3 className="d-flex justify-content-center align-items-center" style={{width: "100%"}}><span style={{fontSize: "0.7em"}}>Total Holders: &nbsp;</span>{totalHolders}</h3>
                {
                  isConnected && 
                  <>
                    <h3 className="d-flex justify-content-center align-items-center" style={{width: "100%"}}><span style={{fontSize: "0.7em"}}></span>{isAccountHolder ? `You're Holder` : `Your're not holder!`}</h3>
                    <h3 className="d-flex justify-content-center align-items-center" style={{width: "100%"}}><span style={{fontSize: "0.7em"}}>Your Balance: &nbsp;</span>{readAbleNumber(accountBalance)} $AST</h3>
                  </>
                }
                <div className="new-lottery-bx mb-5" style={{ marginTop: '-40px'}}>
                  <button onClick={(e) => window.open(`https://pancakeswap.finance/swap?outputCurrency=${tokenAddress}`, '_blank')} className="d-flex justify-content-center" type="submit">Buy Now!</button>
                </div>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>Get your reward now!</h2>
                        <div className="project3 mt-5">
                          <Tab.Container id="projects-tabs" defaultActiveKey="first">
                            <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                              <Nav.Item>
                                <Nav.Link eventKey="first">Last Winner</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link eventKey="second">Reward Claimed</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link eventKey="third">Statistic Reward</Nav.Link>
                              </Nav.Item>
                            </Nav>
                            <Tab.Content id="slideInUp" className="animate__animated animate__slideInUp">
                              <Tab.Pane eventKey="first">
                                <Container>
                                  {
                                    isLastPrizeClaimed ? 
                                    <>
                                      <img className="image-claimed" src={claimed} alt="claimed Img"/>
                                    </>
                                    :
                                    <>
                                    </>
                                  }
                                  <Row className="mt-5">
                                    <Col lg={6} sm={12}>
                                      <p>Winner</p>
                                    </Col>
                                    <Col lg={6} sm={12}>
                                      <div className="new-lottery-bx">
                                        <h3>{shorterAddress(winnerAddress)}</h3>
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row className="mt-5">
                                    <Col lg={6} sm={12}>
                                      <p>Draw Time</p>
                                    </Col>
                                    <Col lg={6} sm={12}>
                                      <h3>{drawTime ? formatTime(drawTime) : "-"}</h3>
                                    </Col>
                                  </Row>
                                  <Row className="mt-5">
                                    <Col lg={6} sm={12}>
                                      <p>Reward</p>
                                    </Col>
                                    <Col lg={6} sm={12}>
                                      <h2>{readAbleNumber(lastPrize)} $AST</h2>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <h3 className="mt-5">CONGRATULATIONS!</h3>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <div className="new-lottery-bx mt-2">
                                        <button disabled={isLastPrizeClaimed} onClick={(e) => claimPrizeHandle(e)} className="d-flex justify-content-center w-50" type="submit">CLAIM YOUR REWARD!</button>
                                      </div>
                                    </Col>
                                  </Row>
                                </Container>
                              </Tab.Pane>
                              <Tab.Pane eventKey="second">
                                <Row>
                                  {
                                    winnerList.map(winner => {
                                      return (
                                        <Col size={3} className="myCard" key={winner.winnerId}>
                                          <Row className="mt-3">
                                            <Col lg={6} sm={12}>
                                              <p>Time</p>
                                            </Col>
                                            <Col lg={6} sm={12}>
                                              <h5>{formatTime(winner.winnerId)}</h5>
                                            </Col>
                                          </Row>
                                          <Row className="mt-5">
                                            <Col lg={6} sm={12}>
                                              <p>Address</p>
                                            </Col>
                                            <Col lg={6} sm={12}>
                                              <h5>{shorterAddress(winner.winnerAddress)}</h5>
                                            </Col>
                                          </Row>
                                          <Row className="mt-5">
                                            <Col lg={6} sm={12}>
                                              <p>Reward</p>
                                            </Col>
                                            <Col lg={6} sm={12}>
                                              <h5>{readAbleNumber(winner.winningAmount)} $AST</h5>
                                            </Col>
                                          </Row>
                                        </Col>
                                      )
                                    })
                                  }
                                </Row>
                              </Tab.Pane>
                              <Tab.Pane eventKey="third">
                                <Col size={12} className="myCard">
                                  <Row className="mt-3">
                                    <Col lg={6} sm={12}>
                                      <p>Last Winner</p>
                                    </Col>
                                    <Col lg={6} sm={12}>
                                      <h5>{shorterAddress(winnerAddress)}</h5>
                                    </Col>
                                  </Row>
                                  <Row className="mt-3">
                                    <Col lg={6} sm={12}>
                                      <p>Last Draw</p>
                                    </Col>
                                    <Col lg={6} sm={12}>
                                      <h5>{formatTime(drawTime)}</h5>
                                    </Col>
                                  </Row>
                                  <Row className="mt-3">
                                    <Col lg={6} sm={12}>
                                      <p>Last Reward Claimed</p>
                                    </Col>
                                    <Col lg={6} sm={12}>
                                      <h5>{readAbleNumber(lastPrizeClaimed)} $AST</h5>
                                    </Col>
                                  </Row>
                                  <Row className="mt-3">
                                    <Col lg={6} sm={12}>
                                      <p>Total Reward Claimed</p>
                                    </Col>
                                    <Col lg={6} sm={12}>
                                      <h5>{readAbleNumber(totalPrizeClaimed)} $AST</h5>
                                    </Col>
                                  </Row>
                                  <Row className="mt-3">
                                    <Col lg={6} sm={12}>
                                      <p>Total Reward Burned</p>
                                    </Col>
                                    <Col lg={6} sm={12}>
                                      <h5>{readAbleNumber(totalPrizeBurned)} $AST</h5>
                                    </Col>
                                  </Row>
                                </Col>
                              </Tab.Pane>
                            </Tab.Content>
                          </Tab.Container>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
    </>
  )
}
