import ReactDOM from 'react-dom';
//import '../../static/css/index.css';
import * as serviceWorker from './serviceWorker';

import React, { Component } from 'react';
import '../../static/css/App.css';
import { Route, BrowserRouter as Router,Switch} from 'react-router-dom'
import Header from './Header';
import NavBar from './NavBar';
import PlayTicket from './PlayTicket';
import Tickets from './Tickets';
import Transactions from './Transactions';
import AddMoney from './AddMoney';
import LogOut from './LogOut';
import MyProvider from './providers/MyProvider';


class App extends Component {

  render() { 
    return (
    <MyProvider>
      <Router>
        <div className="App">
          <Header/>
          <NavBar/>
          <Switch>
              <Route path='/' exact={true} component={PlayTicket}/>
              <Route path='/tickets' exact={true} component={Tickets}/>
              <Route path='/transactions' exact={true} component={Transactions}/>
              <Route path='/addMoney' exact={true} component={AddMoney} />
              <Route path='/logOut' exact={true} component={LogOut}/>
          </Switch>
        </div>
      </Router>
    </MyProvider>
     );
  }
}
 
export default App;

ReactDOM.render(<App />, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
