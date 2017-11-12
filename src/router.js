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
        
    </Switch>
)