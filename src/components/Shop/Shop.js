import React, { Component } from 'react';
import './Shop.css';
import axios from 'axios';


class Shop extends Component {
    constructor() {
        super();

        this.state = {
            products: []
        }
    }
    componentDidMount() {
        axios.get('/getallproducts').then(products => {
            this.setState({
                products: products.data
            })
        })
    }

    render() {


        const allProducts = this.state.products.map((product, i) => {
            return (
                <div key={i} className='featuredProduct'>

                    <img src={product.image} alt={product.title} className='featuredProductImg' />
                    {product.title}
                </div>
            )
        })

        return (
            <div className='Shop mainContent'>
                {allProducts}
            </div>
        )
    }
}
export default Shop;