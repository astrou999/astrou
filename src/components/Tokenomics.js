import liquidity from "../assets/img/liquidity.png";
import burn from "../assets/img/burn.png";
import ecosystem from "../assets/img/ecosystem.png";
import privatePic from "../assets/img/private2.png";
import operational from "../assets/img/operational.png";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"

export const Tokenomics = ({network, contractAddress}) => {
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
    <section className="skill" id="tokenomics">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>Tokenomics</h2>
                        <div>Astrounaut Token is a BINANCE SMART CHAIN TOKEN deployed on Aug, 2022 The max supply is 1 Billion and one of its key functionalities is its decentralised finance protocol.
                          <br />
                          <br />
                          TOTAL SUPPLY: 1.000.000.000 $AST
                          <br />
                          BURN: 50% MANUALLY BEFORE LAUNCH
                          <br />
                          CIRCULATING SUPPLY: 500.000.000
                          <br />
                          LIQUIDITY: 450.000.000
                          <br />
                          GAMES REWARD: 20.000.000
                          <br />
                          DEVELOPMENT: 30.000.000
                          <br />
                          BUY TAX: 10%
                          <br />
                          REWARD FEE: 5%
                          <br />
                          LIQUIDITY FEE: 5%
                          <br /><br />
                        <span className="fw-bold d-flex flex-column align-items-center">Token Contract:
                          <div className="new-tokenomics-bx mt-3">
                            <button onClick={() => window.open(`${network === "MAINNET" ? "https://bscscan.com" : "https://testnet.bscscan.com"}/address/${contractAddress}`)}>Click Here!</button>
                          </div>
                        </span></div>
                        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider mt-5">
                            <div className="item">
                                <img src={liquidity} alt="Image" />
                                <h6>45%</h6>
                                <h5>Liquidity</h5>
                            </div>
                            <div className="item">
                                <img src={burn} alt="Image" />
                                <h6>50%</h6>
                                <h5>Burn</h5>
                            </div>
                            <div className="item">
                                <img src={privatePic} alt="Image" />
                                <h6>2%</h6>
                                <h5>GAMES</h5>
                            </div>
                            <div className="item">
                                <img src={operational} alt="Image" />
                                <h6>3%</h6>
                                <h5>Development</h5>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
