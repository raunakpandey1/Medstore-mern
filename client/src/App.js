import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppContext, AppContextProvider } from './context/appContext/AppContext';
import { AddContextProvider } from './context/storemapcontext/AddContext';

import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import Profile from './pages/profile/Profile';
import PrivateRoute from './components/routing/PrivateRoute';
import Createstore from './pages/createstore/Createstore';
import Product from './pages/addproduct/Product';
import Userdashboard from './pages/userdashboard/Userdashboard';
import Storedashboard from './pages/storedashboard/Storedashboard';
import Singleproduct from './pages/singleproduct/Singleproduct';
import Addtocartpage from './pages/addtocartpage/Addtocartpage';
import { CartContextProvider } from './context/cartContext/CartContext';
import Orderhistory from './pages/orderhistory/Orderhistory';
import { DrawerContextProvider } from './context/DrawerContext';
import Storesignup from './storePage/storesignup/Storesignup';
import Storelogin from './storePage/storelogin/Storelogin';
import StorePrivateRoute from './components/routing/StorePrivateRoute';
import { useContext } from 'react';



function App() {
  const { user, seller } = useContext(AppContext);
  return (
    <AppContextProvider>
      <AddContextProvider>
        <DrawerContextProvider>
          <CartContextProvider>
            <div className="App">
              <BrowserRouter>
                <Topbar />
                <div className="appWrapper">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signin" component={Signin} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/storesignin" component={Storelogin} />
                    <Route exact path="/storesignup" component={Storesignup} />

                    <Route exact path="/product/:productId" component={Singleproduct} />

                    <StorePrivateRoute exact path="/createstore/:userid" component={Createstore} />
                    <PrivateRoute exact path="/addproduct" component={Product} />

                    <PrivateRoute exact path="/userdashboard/:page" component={Userdashboard} />

                    <StorePrivateRoute exact path="/storedashboard/:page" component={Storedashboard} />

                    {/* <PrivateRoute exact path="/addtocart" component={Addtocartpage} /> */}

                  </Switch>
                </div>
              </BrowserRouter>
            </div>
          </CartContextProvider>
        </DrawerContextProvider>
      </AddContextProvider>
    </AppContextProvider>
  );
}

export default App;
