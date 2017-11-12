import React, { Component } from 'react';
import './Destinations.css';
import USAMap from 'react-usa-map';
class Destinations extends Component{ 
    constructor(){
        super();
 
        this.state = {
            selectedST: ''
        }
        this.mapHandler = this.mapHandler.bind(this);
    }
    mapHandler = (event) => {
        var selected = event.target.dataset.name
        // console.log(selected);
        this.setState({
            selectedST: selected
        },()=> alert('Chosen State: '+ this.state.selectedST))// alert(event.target.dataset.name);
    };
    statesFilling = () => {
        return {
            "UT": {
                fill: "#ddd",

                clickHandler: () => alert("Custom callback for the UT state")
            },
            "CA": {
                fill: '#ddd'
            }
        };
    };
    render(){
        return (
            <div className='Destinations'>
                <h1>View images by State</h1> 
                <div className='myMap'>
                       
                    <USAMap customize={this.statesFilling()} onClick={this.mapHandler} defaultFill='black' width={400} /></div>
            </div>
        )
    }
}
export default Destinations;