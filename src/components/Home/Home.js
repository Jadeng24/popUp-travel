import React, { Component } from 'react';
import './Home.css';
 
class Home extends Component{ 
    constructor(){
        super();
 
        this.state = {
            
        }
    }
 
    render(){
        return (
            <div className='Home'>
                <h1 className="content">Home component</h1>
            </div>
        )
    }
}
export default Home;