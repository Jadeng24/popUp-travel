import React, { Component } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

class Nav extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return (
            <div className='Nav'>
                <div className='navGroup sideNav'>

                    <Link to='/destinations'> Destinations</Link>
                    <Link to='/shop'> Shop </Link>
                </div>
                <div className='logoNav centerNav'>
                    <Link to='/'> PopUp Travel </Link>
                </div>
                <div className='navGroup sideNav'>
                    <Link to='/trailers'> Trailers </Link>
                    <Link to='/about'> About </Link>
                    <Link to='/contact'> Contact </Link>
                </div>
            </div>
        )
    }
}
export default Nav;