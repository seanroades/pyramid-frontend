import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';

function navbar(props) {
  return (
    <div className="mainbg">
      { props.page == "home" ?
        <p className="item"><Link to='/' className="links currentPage">Home</Link></p>
      :
        <p className="item"><Link to='/' className="links">Home</Link></p>
      }
      { props.page == "howtojoin" ?
        <p className="item"><Link to='/how-to-join' className="links currentPage">How to join</Link></p>
      :
        <p className="item"><Link to='/how-to-join' className="links">How to join</Link></p>
      }
      { props.page == "howtobuy" ?
        <p className="item"><Link to='/how-to-buy' className="links currentPage">How to buy</Link></p>
      :
        <p className="item"><Link to='/how-to-buy' className="links">How to buy</Link></p>
      }
    </div>
  )
}

export default navbar