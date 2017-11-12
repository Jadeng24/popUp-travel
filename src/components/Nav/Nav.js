import React, { Component } from 'react';
import './Nav.scss';
import { Link } from 'react-router-dom';

class Nav extends Component{ 
    constructor(){
        super();
 
        this.state = {
            
        }
    }
 
    render(){
        return (
            <div className='Nav'>
                <Link to='/'> Home </Link>
                <Link to='/destinations'> Destinations</Link>
                <Link to='/shop'> Shop </Link>
                <Link to='/trailers'> Trailers </Link>
                <Link to='/about'> About </Link>
                <Link to='/contact'> Contact </Link>
            </div>
        )
    }
}
export default Nav;