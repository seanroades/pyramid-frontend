import logo from './pyramidLogo.gif';
import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import { Typewriter } from 'react-typewriting-effect'
import 'react-typewriting-effect/dist/index.css'

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
      recongized: false,
      refFrom: '',
      level: ''
    };
    this.handleRefTo= this.handleRefTo.bind(this);
    this.handleTransTo= this.handleTransTo.bind(this);
    this.handleRefFrom= this.handleRefFrom.bind(this);
    this.refer = this.refer.bind(this)
    this.referred = this.referred.bind(this)
    this.claim = this.claim.bind(this)
    this.handleTest = this.handleTest.bind(this)
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
    }
    else {
      console.log('false')
    }
  }

  handleTest() {
    this.setState({ recongized: true })
    this.state.pyramidTokenContract.methods.sendEther('0x640B231a3946f778244afd83608192cF5D6C0268').send({from: this.state.account})
    .once('recept', (recipt) => {
      this.setState({ recongized: false })
      console.log(recipt)
    })
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

  claim() {
    this.setState({ loading: true })
    this.state.pyramidTokenContract.methods.claimTriangles().send({from: this.state.account})
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="pyramid">
            Welcome to the Pyramid! {this.state.loading}
          </p>
          {this.state.recongized ?
              <>
                <p>We don't recongize you as part of our network. You may only enter if someone has referred you.</p>
                <p className="tooltip">Please enter the wallet address of who referred you</p>
                <input value={this.state.refFrom} onChange={this.handleRefFrom} className="buttons"></input>
                <button className="buttons" onClick={this.referred}>Go through with referred request</button>
              </>
            :
            <>
              <Typewriter string={"Welcome to the network, " + this.state.account} delay={50} cursor='_'/>
              <>
                <p>We don't recongize you as part of our network. You may only enter if someone has referred you.</p>
                <p className="tooltip">Please enter the wallet address of who referred you</p>
                <input value={this.state.refFrom} onChange={this.handleRefFrom} className="buttons"></input>
                <button className="buttons" onClick={this.referred}>Go through with referred request</button>
              </>
              
              <p>Your current balance is:</p>
              <p className="blink_me">{this.state.balance}</p>
              <p>The total supply is: </p>
              <p className="blink_me">{this.state.totalSupply}</p>
              
              <p className="tooltip">You can refer a user via their wallet address below if you are part of the Pyramid network</p>
              <input value={this.state.refTo} onChange={this.handleRefTo} className="buttons"></input>
              <button onClick={this.refer} className="buttons">Recommend user</button>

              <p className="tooltip">You can send triangles to a user's wallet below if you are part of the Pyramid network</p>
              <input value={this.state.transTo} onChange={this.handleTransTo} className="buttons"></input>
              <button className="buttons">Send triangles</button>


              <p className="tooltip">testing button for wallet shiz</p>
              <button onClick={this.handleTest} className="buttons">test</button>

              <br></br>
              <Typewriter className= "tooltip" string={"The total supply of triangles is currently " + this.state.totalSupply + " triangles."} delay={50} cursor='_'/>
            
              <p>Claim triangles</p>
              <button onClick={this.claim} className="buttons">claim triangles</button>
            </>
          }
          </header>
      </div>
    );
  }
}

export default App;
