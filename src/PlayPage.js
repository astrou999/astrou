import React, { useState, useEffect } from 'react';
import Web3 from 'web3'
// import env from "react-dotenv";
import Swal from 'sweetalert2'
import readAbleNumber from "./helpers/stringReadable";

import ASTROUNAUT from './truffle_abis/ASTROUNAUT.json'
import TREASURY from './truffle_abis/Treasury.json'

import { NavBar } from "./componentsPlay/NavBar";
import { Banner } from "./componentsPlay/Banner";
import { Project } from "./componentsPlay/Projects";
import { Footer } from "./componentsPlay/Footer";



function PlayPage() {
  const [astToken, setAST] = useState({})
  const [tokenAddress, setTokenAddress] = useState('')
  const [treasuryContract, setTreasuryContract] = useState({})
  const [isNetworkOK, setIsNetworkOK] = useState(false)


  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('0');
  const [isAccountHolder, setIsAccountHolder] = useState('0');

  const [prizeBalance, setPrizeBalance] = useState(0)
  const [winnerAddress, setWinnerAddress] = useState('0x0')
  const [lastPrize, setLastPrize] = useState(0)
  const [isLastPrizeClaimed, setIsLastPrizeClaimed] = useState(false)
  const [lastPrizeClaimed, setLastPrizeClaimed] = useState(0)
  const [totalHolders, setTotalHolders] = useState(0)
  const [minimumHold, setMinimumHold] = useState(0)
  const [minimumHolders, setMinimumHolders] = useState(0)
  const [minimumPrizeForDraw, setminimumPrizeForDraw] = useState(0)
  const [lastDrawTime, setLastDrawTime] = useState(0)

  const [totalPrizeClaimed, setTotalPrizeClaimed] = useState(0)
  const [totalPrizeBurned, setTotalPrizeBurned] = useState(0)

  const [winnerList, setWinnerList]= useState([])


  // !metamask
  const network = process.env.REACT_APP_NETWORK
  const networkId = network === "MAINNET" ? 56 : 80001

  const [web3, setWeb3] = useState(null)
  const [isConnected, setIsConnected] = useState(false);


  useEffect(() => {
    if(window.ethereum){
      const web3 = new Web3(window.ethereum)
      setWeb3(web3)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Download Metamask first',
      })
    }
  }, []);

  useEffect(() =>{
    if(web3){
      getNetworkData()
    }
  },[web3])

  useEffect(() => {
    if(accountAddress !== '' && Object.keys(astToken).length !== 0){
      getAddressBalance()
    }
  },[accountAddress, astToken])

  useEffect(() => {
    if(isNetworkOK){
      setInterval(() => {
        LoadTokenInfo()
      }, 10000)
    }
  },[isNetworkOK])

  async function checkActiveAccount() {
    let activeAccount = await web3.eth.getAccounts()
    if(activeAccount[0]){
      setAccountAddress(activeAccount[0]);
      setIsConnected(true)
    }
  }

  async function getAddressBalance() {
    let tBalance = await astToken.methods.balanceOf(accountAddress).call()
    setAccountBalance(Number(web3.utils.fromWei(tBalance, 'shannon')).toFixed());

    let isHolders = await astToken.methods.isHolder(accountAddress).call()
    setIsAccountHolder(isHolders)
  }

  async function getNetworkData () {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(networkId) }]
      }).then(() => {
        checkActiveAccount()
        setIsNetworkOK(true)
      })
    } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            network === "MAINNET" ? {
              "chainName": "BNB Smart Chain Mainnet",
              "chainId": web3.utils.toHex(56),
              "nativeCurrency": { 
                  "name": "BSC", 
                  "decimals": 18, 
                  "symbol": "BSC"
              },
              "rpcUrls": ["https://bsc-dataseed.binance.org"]
          } : {
              "chainName": "MATIC TestNet",
              "chainId": web3.utils.toHex(80001),
              "nativeCurrency": { 
                  "name": "MATIC TEST", 
                  "decimals": 18, 
                  "symbol": "MATIC"
              },
              "rpcUrls": ["https://rpc-mumbai.maticvigil.com/"]
          }
          ]
        }).then(() => {
          checkActiveAccount()
          setIsNetworkOK(true)
        }).catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You must added bsc network on metamask',
          })
        })
      }
    }
  }

  const connectWallet = async () => {
    try {
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      }).then(data => {
        setAccountAddress(data[0]);
        setIsConnected(true)
      })
      setIsConnected(true);
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You are not connected',
      })
    }
  };


  async function LoadTokenInfo() {

      try {
        const astrounaut = ASTROUNAUT.networks[networkId]

        if (astrounaut) {
          const astrounautContract = new web3.eth.Contract(ASTROUNAUT.abi, ASTROUNAUT.networks[networkId].address)
          setTokenAddress(ASTROUNAUT.networks[networkId].address)
          setAST(astrounautContract)
  
          let mHold = await astrounautContract.methods.minimumHold().call()
          setMinimumHold(Number(web3.utils.fromWei(mHold, 'shannon')).toFixed())
  
          let holders = await astrounautContract.methods.totalHolders().call()
          setTotalHolders(holders)
  
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Astrounaut Contract not deployed to detect network',
          })
        }
  
        const treasury = TREASURY.networks[networkId]
  
        if (treasury) {
          const tContract = new web3.eth.Contract(TREASURY.abi, TREASURY.networks[networkId].address,)
          setTreasuryContract(tContract)
  
          let pzBalance = await tContract.methods.getBalance().call()
          setPrizeBalance(Number(web3.utils.fromWei(pzBalance, 'shannon')).toFixed())
  
          let winnerAddr = await tContract.methods.lastWinnerAddress().call()
          setWinnerAddress(winnerAddr)
  
          let mBDraw = await tContract.methods.minimumBalanceToDraw().call()
          setminimumPrizeForDraw(Number(web3.utils.fromWei(mBDraw, 'shannon')).toFixed())
  
          let timeDraw = await tContract.methods.lastWinnerId().call()
          setLastDrawTime(timeDraw)
  
          let mHolders = await tContract.methods.minimumHolders().call()
          setMinimumHolders(mHolders)
  
          let lastPrize = await tContract.methods.getWinnerAmount(timeDraw).call()
          setLastPrize(Number(web3.utils.fromWei(lastPrize, 'shannon')).toFixed())
          setIsLastPrizeClaimed(lastPrize.isClaimed)
  
          let lpClaimed = await tContract.methods.lastPrizeClaimed().call()
          setLastPrizeClaimed(Number(web3.utils.fromWei(lpClaimed, 'shannon')).toFixed())
  
          let tPClaimed = await tContract.methods.totalPrizeClaimed().call()
          setTotalPrizeClaimed(Number(web3.utils.fromWei(tPClaimed, 'shannon')).toFixed())
  
          let tPBurned = await tContract.methods.totalPrizeBurned().call()
          setTotalPrizeBurned(Number(web3.utils.fromWei(tPBurned, 'shannon')).toFixed())
  
          let listIDClaimed = await tContract.methods.getListIdClaimed().call()
  
          let dataWinner = await Promise.all(listIDClaimed.map(async (winnerId) => {
            let winnerAddress = await tContract.methods.getWinnerAddress(winnerId).call()
            let winnerAmount = await tContract.methods.getWinnerAmount(winnerId).call()
            let winnerStatus = await tContract.methods.getWinnerStatus(winnerId).call()
            let winnerDetail = {
              winnerId: winnerId,
              isClaimed: winnerStatus,
              winningAmount: Number(web3.utils.fromWei(winnerAmount, 'shannon')).toFixed(),
              winnerAddress: winnerAddress
            }
            return winnerDetail
          }))
          setWinnerList(dataWinner)
  
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Astrounaut Contract not deployed to detect network',
          })
        }
      } catch (error) {
        console.log(error);
        alert(error)
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: 'There is problem with your connection, Use VPN and try again!!',
        // })
      }
      
  }

  const drawWinner = async () => {
    try {
      await treasuryContract.methods.drawWinner().call({ from: accountAddress })
      let data = await treasuryContract.methods.drawWinner().send({ from: accountAddress })
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Success Draw the Winner!',
        footer: `<a href="${network === "MAINNET" ? "https://bscscan.com" : "https://testnet.bscscan.com"}/tx/${data.transactionHash}">Click here to check the transaction!</a>`
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Minimum one hour from the last draw / wait the reward until ${readAbleNumber(minimumPrizeForDraw)}`,
      })
    }
  }

  const claimPrize = async () => {
    try {
      await treasuryContract.methods.claimPrize().call({ from: accountAddress })
      let data = await treasuryContract.methods.claimPrize().send({ from: accountAddress })
      Swal.fire({
        icon: 'success',
        title: 'CONGRATULATIONS!',
        text: 'Success Claim your Reward!',
        footer: `<a href="${network === "MAINNET" ? "https://bscscan.com" : "https://testnet.bscscan.com"}/tx/${data.transactionHash}">Click here to check the transaction!</a>`
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You are not the winner. Wait for the next draw and goodluck!',
      })

    }
  }

  return (
    <div>
      <NavBar 
        connectWallet={connectWallet}
        isConnected={isConnected}
        accountAddress={accountAddress}
        setIsConnected={setIsConnected}
      />
      <Banner
        isConnected={isConnected}
        tokenAddress={tokenAddress}
        accountBalance={accountBalance}
        isAccountHolder={isAccountHolder}
        drawWinner={drawWinner} 
        prizeBalance={prizeBalance} 
        winnerAddress={winnerAddress} 
        lastPrize={lastPrize} 
        lastPrizeClaimed={lastPrizeClaimed}
        totalHolders={totalHolders} 
        minimumPrizeForDraw={minimumPrizeForDraw} 
        drawTime={lastDrawTime} 
        isLastPrizeClaimed={isLastPrizeClaimed} 
        claimPrize={claimPrize} 
        totalPrizeBurned={totalPrizeBurned}
        totalPrizeClaimed={totalPrizeClaimed}
        winnerList={winnerList}
        minimumHold={minimumHold}
      />
      <Project 
        minimumHold={minimumHold} 
        minimumHolders={minimumHolders}
        minimumPrizeForDraw={minimumPrizeForDraw}
      />
      <Footer />
    </div>
  );
}

export default PlayPage;