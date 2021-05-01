import React from 'react';
import './HowToBuy.css';
import Navbar from '../Components/Navbar.js';
import metamaskImage from './images/metamask.png'
import ethToMetamask from './images/ethToMetamask.png'
import addTriangles from './images/addTriangles.png'
import buyTriangles from './images/buyTriangles.png'


function HowToBuy() {
  return (
    <div className="bg">
      <Navbar page="howtobuy"/>
      <p className="headingText">How to buy triangle coin</p>
      <p className="para">1. First, you are going to need a metamask wallet.</p>
      <img className="images" src={metamaskImage}></img>
      <p className="para">2. You can then buy ETH through on of metamasks partners or buy through other means, e.g., from coinbase and then transfer funds to your metamask wallet address.</p>
      <img className="images" src={ethToMetamask}></img>
      <p className="para">3. You can visit the <a className="lineLinks" href="https://app.uniswap.org/#/swap">uniswap exchange</a> to exchange ETH for triangles. You will first need to add this contract address <a className="lineLinks" href="https://etherscan.io/address/0xD26520d752f9766d3531589C08a0131CDA6d0135">0xD26520d752f9766d3531589C08a0131CDA6d0135</a> into the token you wish to trade your eth for. At the time of writing this, there are 49 triangles available.</p>
      <img className="images" src={addTriangles}></img>
      <p className="para">4. Now you can buy triangles by simply inputting the triangles you would like to buy. You can also sell them by entering them into the pool.</p>
      <img className="images" src={buyTriangles}></img>
      <p className="para">5. And that's it! You can now add these tokens to your metamask wallet so you can track them by clicking add token, going to custom token and entering the contract address of the token, as mentioned above. From there, you can transfer, sell, and buy triangle through metamask (transfers) and uniswap (buying and selling)</p>
    </div>
  )
}

export default HowToBuy;