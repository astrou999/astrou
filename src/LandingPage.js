import React from 'react';
// import Web3 from 'web3'
// import env from "react-dotenv";

import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Roadmap } from "./components/Projects";
import { Buying } from "./components/Buying";
import { Tokenomics } from "./components/Tokenomics";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Blank } from "./components/Blank";

function LandingPage() {
  const network = process.env.REACT_APP_NETWORK
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS

  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Skills />
      <Roadmap />
      <Tokenomics network={network} contractAddress={contractAddress}/>
      <Buying contractAddress={contractAddress}/>
      <Blank />
      <Footer />
    </div>
  );
}

export default LandingPage;
