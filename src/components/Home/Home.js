import React, { Component } from 'react';
import './Home.css';
import { Carousel } from 'react-responsive-carousel';
import pic1 from '../Assets/pic1.jpg';
import pic2 from '../Assets/pic2.jpg';
import pic3 from '../Assets/pic3.jpg';
class Home extends Component{ 
    constructor(){
        super();
 
        this.state = {
            
        }
    }
 
    render(){
        return (
            <div className='Home mainContent'>
                <div className='CarouselHolder'>
                    <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} interval={6000} showStatus={false}>
                    <div>
                        <img src={pic1} alt='scenery'/>
                        <p className="legend">Legend 1</p>
                    </div>
                    <div>
                        <img src={pic2} alt='scenery'/>
                        <p className="legend">Legend 2</p>
                    </div>
                    <div>
                        <img src={pic3} alt='scenery'/>
                        <p className="legend">Legend 3</p>
                        </div>
                        <div>
                            <img src={pic1} alt='scenery' />
                            <p className="legend">Legend 1</p>
                        </div>
                        <div>
                            <img src={pic2} alt='scenery' />
                            <p className="legend">Legend 2</p>
                        </div>
                        <div>
                            <img src={pic3} alt='scenery' />
                            <p className="legend">Legend 3</p>
                        </div>
                    </Carousel>
                </div>    
                {/* end of carousel holder */}
            <div className='seperatorDiv'><h2>FEATURED PRODUCTS</h2></div>
            </div>
        )
    }
}
export default Home;