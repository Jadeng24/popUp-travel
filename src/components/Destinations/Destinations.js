import React, { Component } from 'react';
import './Destinations.css';
import USAMap from 'react-usa-map';
import axios from 'axios';

class Destinations extends Component{ 
    constructor(){
        super();
 
        this.state = {
            selectedST: '',
            photos: []
        }
        this.mapHandler = this.mapHandler.bind(this);
    }

    componentDidMount() {
        axios.get('/getallimages').then(images => {
            this.setState({
                photos: images.data
            }, () => console.log(this.state.photos))
        })
    }
    mapHandler = (event) => {
        var selected = event.target.dataset.name
        // console.log(selected);
        this.setState({
            selectedST: selected
        })
    }
    statesFilling = () => {
        return {
            [this.state.selectedST]: {
                fill: "#ddd",

                // clickHandler: () => alert("Custom callback for the UT state")
            },
            
        };
    };
    render() {
        const myImagesByState = this.state.photos.map((photo, i) => {
            if (photo.location_state === this.state.selectedST) {
                return (
                    <div key={i} className='destinationImageHolder'>
                        
                        <img src={photo.image} alt={photo.title} className='destinationImage' />
                        <h2 className='destinationTitle'>{photo.title}</h2>

                    </div>
                )
            }

        })
        return (
            <div className='Destinations mainContent'>
                <h1>View images by State</h1> 
                <div className='myMap'>
                       
                    <USAMap customize={this.statesFilling()} onClick={this.mapHandler} defaultFill='black' width={400} />
                </div>
                
                <div className='destinationsImagesHolder'>
                    {myImagesByState}
                </div>
            </div>
        )
    }
}
export default Destinations;