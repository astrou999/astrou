import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import { HashLink } from 'react-router-hash-link';
import shorterAddress from "../helpers/shorterAddress";

export const NavBar = ({ connectWallet, isConnected, accountAddress, setIsConnected }) => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
    // <Router>
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="#home" className="mt-3">
          <p className="mylogo">Astrounaut Token</p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/play#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Reward</Nav.Link>
            <Nav.Link href="/lottery#projects222" className={activeLink === 'projects222' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects222')}>Lottery</Nav.Link>
            <Nav.Link href="/pottery#projects222" className={activeLink === 'projects222' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects222')}>Pottery</Nav.Link>
            <Nav.Link href="/prediction#projects333" className={activeLink === 'projects333' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects333')}>Prediction</Nav.Link>
            <Nav.Link href="/" className={activeLink === 'landingpage' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('landingpage')}>Home</Nav.Link>
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a href="#"><img src={navIcon1} alt="" /></a>
              <a href="#"><img src={navIcon2} alt="" /></a>
              <a href="#"><img src={navIcon3} alt="" /></a>
            </div>
            {
              isConnected ?
                <>
                  <HashLink to='#connect'>
                    <button className="vvd" onClick={() => setIsConnected(false)}><span>{shorterAddress(accountAddress)}</span></button>
                  </HashLink>
                </>
                : <>
                  <HashLink to='#connect'>
                    <button className="vvd" onClick={connectWallet}><span>Connect Wallet</span></button>
                  </HashLink>
                </>
            }
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // </Router>
  )
}
