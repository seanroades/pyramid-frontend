import logo from './pyramidLogo.gif';
import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import { Typewriter } from 'react-typewriting-effect';
import 'react-typewriting-effect/dist/index.css';

import { PYRAMIDTOKEN_ADDRESS, PYRAMIDTOKEN_ABI } from './config.js'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      connectedAcc: false,
      account: '',
      pyramidTokenContract: '',
      totalSupply: 'not iniatied',
      balance: 'not aval',
      refTo: '',
      transTo: '',
      loading: '',
      refFrom: '',
      level: '',
      numTrans: 0,
      isUser: false
    };
    this.handleRefTo= this.handleRefTo.bind(this);
    this.handleTransTo= this.handleTransTo.bind(this);
    this.handleRefFrom= this.handleRefFrom.bind(this);
    this.handleNumTrans= this.handleNumTrans.bind(this);
    this.refer = this.refer.bind(this)
    this.referred = this.referred.bind(this)
    this.transfer = this.transfer.bind(this)
  }

  componentDidMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    var ethereum = window.ethereum
    ethereum.request({ method: 'eth_requestAccounts' });
    console.log(ethereum)

    if (ethereum) {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
      const accounts = await web3.eth.getAccounts()
      this.setState({account: accounts[0]})
      const pyramidToken = new web3.eth.Contract(PYRAMIDTOKEN_ABI, PYRAMIDTOKEN_ADDRESS)
      console.log(pyramidToken)
      this.setState({pyramidTokenContract: pyramidToken})

      const totalSupply = await pyramidToken.methods.totalSupply().call()
      console.log("totalsupply: ", totalSupply)
      this.setState({ totalSupply })

      const balance = await pyramidToken.methods.balanceOf(this.state.account).call()
      console.log("balance: ", balance)
      this.setState({ balance })

      const level = await pyramidToken.methods.levelOf(this.state.account).call()
      console.log("level: ", level)
      this.setState({ level })

      const isUser = await pyramidToken.methods.isUser(this.state.account).call()
      console.log("isUser:", isUser)
      this.setState({ isUser })
    }
    else {
      console.log('false')
    }
  }

  referred() {
    this.setState({ loading: true })
    this.state.pyramidTokenContract.methods.acceptReferral(this.state.refFrom).send({from: this.state.account})
    .once('recept', (recipt) => {
      this.setState({ loading: false })
      console.log(recipt)
    })
  }

  refer() {
    this.setState({ loading: true })
    this.state.pyramidTokenContract.methods.extendReferral(this.state.refTo).send({from: this.state.account})
    .once('recept', (recipt) => {
      this.setState({ loading: false })
      console.log(recipt)
    })
  }

  transfer() {
    this.setState({ loading: true })
    this.state.pyramidTokenContract.methods.transfer(this.state.transTo, this.state.numTrans).send({from: this.state.account})
    .once('recept', (recipt) => {
      this.setState({ loading: false })
      console.log(recipt)
    })
  }

  // Handle search inputs, could probably be refactored later
  handleRefTo(event) {
    this.setState({refTo: event.target.value});
  }

  handleRefFrom(event) {
    this.setState({refFrom: event.target.value});
  }

  handleTransTo(event) {
    this.setState({transTo: event.target.value});
  }

  handleNumTrans(event) {
    this.setState({numTrans: event.target.value })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="pyramid">
            Welcome to the Pyramid! {this.state.loading}
          </p>
          {!this.state.isUser ?
              <>
                <p className="heading">We don't recongize you as part of our network. You may only enter if someone has referred you.</p>
                <input value={this.state.refFrom} onChange={this.handleRefFrom} className="buttons inputs"></input>
                <button className="buttons" onClick={this.referred}>Go through with referred request</button>
                <p className="tooltip">Please enter the wallet address of who referred you above</p>
              </>
            :
            <>
              <Typewriter string={"Welcome to the network, " + this.state.account} delay={50} cursor='_'/>
              
              <div className="dataContainer">
                <p className="dataText">Your current balance:</p>
                <p className="blink_me">{this.state.balance / 1000000000000000000}</p>

                <p className="dataText">The total supply: </p>
                <p className="blink_me">{this.state.totalSupply / 1000000000000000000}</p>
              </div>
              
              <p className="tooltip">You can refer a user via their wallet address below if you are part of the Pyramid network</p>
              <input value={this.state.refTo} onChange={this.handleRefTo} className="buttons inputs"></input>
              <button onClick={this.refer} className="buttons">Recommend user</button>

              <p className="tooltip">You can send triangles to a user's wallet below if you are part of the Pyramid network (please note this is sent in 18 decimal values, e.g., YOUR_AMOUNT / 10^18; it may be easier to just trade via your metamask or other wallet)</p>
              <input value={this.state.transTo} onChange={this.handleTransTo} className="buttons inputs"></input>
              <input value={this.state.numTrans} onChange={this.handleNumTrans} className="buttons"></input>
              <button onClick={this.transfer} className="buttons">Send triangles</button>
              <br></br>
              <a href="https://github.com/seanroades/pyramid">Source code and more info</a>
            </>
          }
          <br></br>
          </header>
      </div>
    );
  }
}

export default App;
