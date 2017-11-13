import React, { Component } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

class Nav extends Component {
    constructor() {
        super();

        this.state = {
            Modal: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
toggleModal() {
    this.setState({
        Modal: !this.state.Modal
    },()=> console.log('Modal: ' + this.state.Modal))
}
closeModal() {
    this.setState({
        Modal: false
    })
}
    render() {
        return (
            <div className='Nav'>
            
                {/* left side of nav */}
                <div className='navGroup sideNav'>
                    <Link to='/destinations'> Destinations</Link>
                    <Link to='/shop'> Shop </Link>
                </div>
                <div className='mobileNav'></div>
                {/* center of nav */}
                <div className='logoNav centerNav' onClick={this.closeModal}>
                    <Link to='/'> PopUp Travel </Link>
                </div>
                {/* right side of nav */}
                <div className='navGroup sideNav'>
                    <Link to='/trailers'> Trailers </Link>
                    <Link to='/about'> About </Link>
                    <Link to='/contact'> Contact </Link>
                </div>
                {/* Mobile Hambuger menu */}
            <div className='mobileNav' onClick={this.toggleModal}>
                    <div className={this.state.Modal ? "bar1 menuIcon" : "menuIcon"}></div>
                    <div className={this.state.Modal ? "bar2 menuIcon" : "menuIcon"}></div>
                    <div className={this.state.Modal ? "bar3 menuIcon" : "menuIcon"}></div>
                
                </div>

                <div className={this.state.Modal ? 'modal' : ' modal hide'} onClick={this.toggleModal}>
                    <div className='modalItemsHolder'>
                    <Link to='/about'> About </Link>
                    <Link to='/contact'> Contact </Link>
                    <Link to='/destinations'> Destinations</Link>
                    <Link to='/shop'> Shop </Link>
                    <Link to='/trailers'> Trailers </Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default Nav;