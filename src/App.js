import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import ManageOrders from './components/ManageOrders/ManageOrders'
import TrackGoods from './components/TrackGoods/TrackGoods'
import Dashboard from './components/Dashboard/Dashboard'
import Navbar1 from './components/Dashboard/Navbar1.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setLoginUser] = useState();

  return (
    <div className="App">
      
      <Navbar1 />

      <Router>
        <Switch>

          <Route path='/' exact>
            <Dashboard />
          </Route>
          <Route path='/login'>
            <Login setLoginUser={setLoginUser} />
          </Route>

          <Route path='/register'>
            <Register />
          </Route>

          <Route path='/trackgoods'>
            <TrackGoods />
          </Route>
          
          <Route path='/manageorders'>
            <ManageOrders />
          </Route>

        </Switch>
      </Router>

    </div>
  );
}

export default App;
