import './App.css';
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import ManageOrders from './components/ManageOrders/ManageOrders'
import CartList from './components/Cart/CartList'
import TrackGoods from './components/TrackGoods/TrackGoods'
import Home from './components/Home/Home'
import AddProduct from './components/AddProduct/AddProduct';
import AddStock from './components/AddStock/AddStock';
import Navbar1 from './components/Home/Navbar1.js';
import Footer from './Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';


export const UserContext = React.createContext();

function App() {
  const [user, setLoginUser] = useState();



  return (
    <div className="App">


      <UserContext.Provider value={user}>
        <Router>
          <Switch>

            <Route path='/' exact>
            <Navbar1 />
              <Home />
            </Route>
            <Route path='/login'>
            <Navbar1 />
              <Login setLoginUser={setLoginUser} />
            </Route>

            <Route path='/register'>
            <Navbar1 />
              <Register />
            </Route>

            <Route path='/trackgoods'>
            <Navbar1 />
              <TrackGoods />
            </Route>

            <Route path='/manageorders'>
            <Navbar1 />
              <ManageOrders />
            </Route>

            <Route path='/cartlist'>
            <Navbar1 />
              <CartList />
            </Route>

            <Route path='/addpdt'>
            <Navbar1 />
              <AddProduct />
            </Route>

            <Route path='/addstock'>
            <Navbar1 />
              <AddStock />
            </Route>

          </Switch>
          <Footer />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
