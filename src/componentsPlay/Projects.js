import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import coin3 from "../assets/img/fist2.png";
import headerImg from "../assets/img/astrotrans.gif";
import headerImg2 from "../assets/img/footergif2.gif";
import chartnew from "../assets/img/third2.png"
import website123 from "../assets/img/second2.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import readAbleNumber from "../helpers/stringReadable";

export const Project = ({minimumHold, minimumPrizeForDraw, minimumHolders}) => {

  const projects = [
    {
      title: "Buy Token",
      description: `You must hold minimum ${readAbleNumber(minimumHold)} AST as a requirement for the reward draw.`,
      imgUrl: coin3,
    },
    {
      title: "Wait for the Draw",
      description: `There is one draw every hour if the reward reach minimal ${readAbleNumber(minimumPrizeForDraw)} $AST and click "DRAW REWARD" Button`,
      imgUrl: website123,
    },
    {
      title: "Check for The Reward",
      description: "Once the round’s over, come back to the page and check to see if you’ve won! Click 'CLAIM YOUR REWARD' button.",
      imgUrl: chartnew,
    }
  ];

  return (
    <section className="project2">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2 id="projects">How to Play</h2>
                <p>System will draw the winner every reach the target. Hold as long as possible and win the REWARD!</p>
                {/* <p>If the digits on your tickets match the winning numbers in the correct order, you win a portion of the prize pool. Simple!</p> */}
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  {/* <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first" className="w-100">How to Play</Nav.Link>
                    </Nav.Item>
                  </Nav> */}
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
                <h2 className="mt-5 mb-5">Reward Draw Mechanism</h2>
                {/* <h3 className="d-flex justify-content-center">The longer and the more you hold, The greater your chances of getting the rewards</h3> */}
                <Row>
                  <Col xl={5} md={5} sm={12}>
                    <p>Holder requirement :</p>
                    <p>{readAbleNumber(minimumHold)} $AST</p>
                    <p>MinPrizeToDraw : </p>
                    <p>{readAbleNumber(minimumPrizeForDraw)} $AST</p>
                    <p style={{color: "white", fontSize: "20px"}}>Hold, Hold, and Hold !!! </p>
                    <p>Draw conditions:</p>
                    <div className="text-center mb-5">
                      <p>1. Total price reaches the MinPrizeToDraw</p>
                      <p>2. Maximum draw once an hour</p>
                      <p>3. minimum holder {minimumHolders}</p>
                    </div>
                  </Col>
                  <Col xl={2} md={2} sm={0}>
                    <img className="image-play" src={headerImg} alt="Header Img"/>
                  </Col>
                  <Col xl={5} md={5} sm={12}>
                    <p>If the three conditions are met then everyone can press the draw winner button on this page and pay a certain amount of gas fee</p>
                    <p>blockchain will generate random holder as winner, and then 50% from prize pool will be allocated as winner prize</p>
                    <p>The winner's wallet will be displayed on this page, if you are a winner, you can press the claim your reward button to get your prize</p>
                    <p>If the winner does not claim the prize until the next draw, the previous winner's prize will be burned</p>
                  </Col>
                </Row>
                {/* <h2>Prize Funds</h2>
                <p>The prizes for each lottery round come from three sources:</p>
                <Row>
                  <Col xl={6} md={6} sm={12}>
                    <img src={headerImg2} alt="Header Img"/>
                  </Col>
                  <Col xl={6} md={6} sm={12}>
                    <h3 className="text-center">Ticket Purchases</h3>
                    <p>100% of the CAKE paid by people buying tickets that round goes back into the prize pools.</p>
                    <h3 className="text-center">Rollover Prizes</h3>
                    <p>After every round, if nobody wins in one of the prize brackets, the unclaimed CAKE for that bracket rolls over into the next round and are redistributed among the prize pools.</p>
                    <h3 className="text-center">CAKE Injections</h3>
                    <p>An average total of 35,000 CAKE from the treasury is added to lottery rounds over the course of a week. This CAKE is of course also included in rollovers! Read more in our guide to CAKE Tokenomics</p>
                  </Col>
                </Row> */}
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
