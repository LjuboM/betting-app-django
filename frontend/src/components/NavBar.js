import React, { Component } from 'react';

import { NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';

class NavBar extends Component {
    state = {  }
    render() {
        return (
              <ul>
                <li><NavLink exact activeClassName="active" to="/">Play Ticket</NavLink></li>
                <li><NavLink activeClassName="active" to="/tickets">Tickets</NavLink></li>
                <li><NavLink activeClassName="active" to="/transactions">Transactions</NavLink></li>
                <li><NavLink activeClassName="active" to="/addMoney">Add money</NavLink></li>
                <li style={{float:"right"}}><NavLink  activeClassName="active" to="/logOut">Log out</NavLink></li>
              </ul>
         );
    }
}
 
export default NavBar;
