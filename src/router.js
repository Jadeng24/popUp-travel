import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Components
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Destinations from './components/Destinations/Destinations';
import Shop from './components/Shop/Shop';
import Details from './components/Details/Details';
import Trailers from './components/Trailers/Trailers';
import Loading from './components/Loading/Loading.js';
import Admin from './components/Admin/Admin.js';
import Profile from './components/Profile/Profile.js';
import EditProfile from './components/Profile/EditProfile.js';
import Cart from './components/Cart/Cart.js';
// Routes for url linking components(pages)
export default (

    <Switch>
        <Route component={Home} exact path='/' />
        <Route component={About} path='/about' />
        <Route component={Contact} path='/contact' />
        <Route component={Destinations} path='/destinations' />
        <Route component={Shop} path='/shop' />
        <Route component={Details} path='/details/:productid' />
        <Route component={Trailers} path='/trailers'/>
        <Route component={Loading} path='/loading'/>
        <Route component={Admin} path='/admin'/>
        <Route component={Profile} path='/profile'/>
        <Route component={EditProfile} path='/editprofile'/>
        <Route component={Cart} path='/cart'/>
        
    </Switch>
)