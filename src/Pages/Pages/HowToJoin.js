import React from 'react';
import './HowToJoin.css';
import Navbar from '../Components/Navbar.js';


function HowToJoin() {
  return (
    <div className="bg">
      <Navbar page="howtojoin"/>
      <p className="headingText">How to join the pyramid network</p>
      <p className="para">In order to join the pyramid network, you need a referal from someone who is currently part of the network. They can invite you from the homepage once they are logged in.</p>
      <p className="para">Joining is free, but you should be aware of gas fees, e.g., the fee paid to miners who are part of the ethereum network. For each transaction on the ethereum network, the transaction must be verified by miners who are paid in compensation for their work. Thus, extending a referral to a friend is free on the pyramid's end but does cost a small amount of gas (the same goes for accepting referrals)</p>
      <p className="para">You can accept referrals by going to the homepage and entering the wallet address of the person who invited you. Don't worry about entering the wrong address--it won't let you enter it if it's wrong.</p>
      <p className="para" style={{fontWeight: 'bold'}}>One important thing to note is that transactions take time--you can watch your transaction here <a className="lineLinks" href="https://etherscan.io/address/0xd26520d752f9766d3531589c08a0131cda6d0135">on etherscan.</a> Once it is done, it will no longer say pending.</p>
      <p className="para">Upon joining the reward, you are rewarded 5 triangles, as is the person who referred you, the person who referred them, etc recursively for 16 levels.</p>
      <p className="para">Once joining, if you wish to sell your triangles, you can via uniswap. Check out the "How to buy" page for more information.</p>
      <p className="para" style={{fontWeight: 'bold'}}>If you're interested in reading the source code, etc. It is verified on etherscan <a href="https://etherscan.io/address/0xd26520d752f9766d3531589c08a0131cda6d0135" className="lineLinks">here</a>. You can also see exactly what's going on on the website here: <a href="https://github.com/seanroades" className="lineLinks">here</a>.</p>
    </div>
  )
}

export default HowToJoin;