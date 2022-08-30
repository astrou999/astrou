import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import astrounautgif from "../assets/img/astrounautgif.gif"
import { Container, Row, Col, Image } from "react-bootstrap";

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>About Astrounaut Token</h2>
                        <p>Astrounaut Token Is A Binance Smart Chain Based Utility Token That Has Real Projects Running In The Future. Astrounaut Token is a token which created for communities that aim to play an active role in the crypto ecosystem in order to make Web3 more widespread all over the world. It is a project dedicated to the formation of a decentralized internet and financial model of its infrastructure by taking place in the Web3 ecosystem.</p>
                        <Container>
                          <Row>
                            <Col lg={6} sm={12}>
                              <Image rounded="true" src={astrounautgif} />
                            </Col>
                            <Col lg={6} sm={12}>
                              <h3>Why Choose Us?</h3>
                              <p>Devs and the team behind Astrounaut Token come from other successful projects . We have a track record and have come together to get rid of untrustworthy projects, tapestry pulls and honeypots. A safe space for investers to get passive income without worry..</p>
                              <h3>Why Was Astrounaut Token Invented?</h3>
                              <p>It was created by the developer community on BNB Chain which one of the world's largest blockchain-based operating systems, on Aug, 2022. When Astrounaut Token was created, the first step was taken to ensure that the contract and liquidity access were thrown into the dead wallet and fully in line with the Web3 vision. Aiming to be one of the cornerstones of decentralized finance, Astrounaut Token is a community project that aims to provide decentralized applications and solutions.</p>
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
