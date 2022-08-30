import { Container, Row, Col, Image } from "react-bootstrap";
import colorSharp2 from "../assets/img/color-sharp2.png";
import astrounautgif from "../assets/img/astrounaut9090.gif"
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Buying = ({contractAddress}) => {
  return (
    <section className="buying" id="buy">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <Row>
                  <Col lg={6} sm={12} className="d-flex justify-content-center flex-column mb-5">
                    <h2 className="mt-5">Click here to Buy $AST!</h2>
                    {/* <p>SHIB and LEASH are best purchased and sold through ShibaSwap, but can also be found on Uniswap and an ever-growing list of CEXs. Please note that, outside of ShibaSwap, exchanges which support one may not support the other. SHIB is a decentralized experiment and, as such, we always incentivize the use of DEXs. If you choose to utilize a CEX instead, remember to research it first to ensure it is both safe and secure.</p> */}
                    <div className="new-tokenomics-bx mt-3">
                      <button onClick={() => window.open(`https://pancakeswap.finance/swap?outputCurrency=${contractAddress}`, '_blank')}>Buy On Pancakeswap</button>
                    </div>
                  </Col>
                  <Col lg={6} sm={12}>
                    <Image rounded="true" src={astrounautgif} />
                  </Col>
                </Row>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
