import React, { Component } from 'react';
import './Home.css';
import { Carousel } from 'react-responsive-carousel';
import pic1 from '../Assets/pic1.jpg';
import pic2 from '../Assets/pic2.jpg';
import pic3 from '../Assets/pic3.jpg';

import axios from 'axios';

class Home extends Component {
    constructor() {
        super();

        this.state = {
            products: [],
            photos: [],
        }
    }
    componentDidMount() {
        
        axios.get('/getallproducts').then(res => {
            
            this.setState({
                products: res.data
            })
        })
        axios.get('/auth/me')
            .then(res => {
                console.log(res.data);
            })
        // getting all images
        axios.get('/getallimages').then(images => {
            this.setState({
                photos: images.data
            }, () => console.log(this.state.photos))
        })
        
    }
    render() {
        // mapping over products and setting them on a variable
        const allProducts = this.state.products.map((product, i) => {
            return (
                <div key={i} className='featuredProduct'>
                    
                    <img src={product.image} alt={product.title} className='featuredProductImg' />
                    {product.title}
                </div>
            )
        })
        // map of all products to be rendered below
        const allPhotos = this.state.photos.map((photo, i) => {
            return (
                <div key={i}>
                    
                    <img src={photo.image} alt={photo.title}/>
                    <p className="legend">{photo.title}</p>
                </div>
            )
        })
        return (
            <div className='Home mainContent'>
                <div className='CarouselHolder'>
                    <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} interval={6000} showStatus={false}>
                        {allPhotos}
                        
                        {/* <div>
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
                        </div> */}
                    </Carousel>
                </div>
                {/* end of carousel holder */}
                <div className='seperatorDiv'><h2>FEATURED PRODUCTS</h2></div>

                <div className='allProductsHolder'>{allProducts}</div>
            </div>
        )
    }
}
export default Home;