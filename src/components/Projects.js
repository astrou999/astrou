import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import coin3 from "../assets/img/coin3.png";
import chartnew from "../assets/img/chartnew.png";
import whitepaper from "../assets/img/whitepaper3.png";
import joystick from "../assets/img/joystick.png";
import website123 from "../assets/img/website123.png";
import community from "../assets/img/community.png";
import development from "../assets/img/development.png";
import roadmap123 from "../assets/img/roadmap123.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Roadmap = () => {

  const projects = [
    {
      title: "Create Token",
      description: "Contract Development & Liquidity Lock",
      imgUrl: coin3,
    },
    {
      title: "Development",
      description: "Design & Web Development",
      imgUrl: website123,
    },
    {
      title: "Advertising",
      description: "Advertising, Public Sale Starting, and First Marketing",
      imgUrl: chartnew,
    },
    {
      title: "Members",
      description: "300 Members Reached",
      imgUrl: development,
    },
    {
      title: "Community",
      description: "Telegram Community",
      imgUrl: community,
    },
    {
      title: "Game",
      description: "REWARD (Hold to Win) Launch",
      imgUrl: joystick,
    }
  ];

  const projects2 = [
    {
      title: "Development",
      description: "V2 Design & Web Development",
      imgUrl: website123,
    },
    {
      title: "Marketing",
      description: "Big Marketing Begins",
      imgUrl: chartnew,
    },
    {
      title: "Members",
      description: "800 Members Reached",
      imgUrl: development,
    },
    {
      title: "Whitepaper",
      description: "Whitepaper Release",
      imgUrl: whitepaper,
    },
    {
      title: "Community",
      description: "Strengthen Community",
      imgUrl: community,
    },
    {
      title: "Game",
      description: "Lottery & Stake to WIN Launch",
      imgUrl: joystick,
    }
  ];

  const projects3 = [
    {
      title: "Roadmap",
      description: "Roadmap V2",
      imgUrl: roadmap123,
    },
    {
      title: "Development",
      description: "V3 Design & Web Development",
      imgUrl: website123,
    },
    {
      title: "Marketing",
      description: "Big Marketing",
      imgUrl: chartnew,
    },
    {
      title: "Holders",
      description: "5000 Holders",
      imgUrl: development,
    },
    {
      title: "Community",
      description: "Strengthen Community",
      imgUrl: community,
    },
    {
      title: "Game",
      description: "Prediction Launch",
      imgUrl: joystick,
    }
  ];

  return (
    <section className="project">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2 id="projects">Roadmap</h2>
                <p>Astrounaut Token decentralized global network not only provides a safe and credible environment for players and operators but also democratises the experience by making it available to people regardless of border or economic status.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Phase 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Phase 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Phase 3</Nav.Link>
                    </Nav.Item>
                  </Nav>
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
                    <Tab.Pane eventKey="second">
                      <Row>
                        {
                          projects2.map((project, index) => {
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
                    <Tab.Pane eventKey="third">
                      <Row>
                        {
                          projects3.map((project, index) => {
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
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
