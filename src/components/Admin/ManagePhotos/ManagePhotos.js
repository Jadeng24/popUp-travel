import React, { Component } from 'react';
import './ManagePhotos.css';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Tabs, Tab } from 'material-ui/Tabs';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import PlaceholderImg from '../../Assets/noProduct.png';
class ManageProducts extends Component {
    constructor() {
        super();

        this.state = {
            photos: [],
            title: '',
            imgUrl: '',
        }
        this.handleDrop = this.handleDrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.savePhoto = this.savePhoto.bind(this);
        this.removePhoto = this.removePhoto.bind(this);
        this.getPhotos = this.getPhotos.bind(this);
    }
    componentDidMount() {
        // getting all products
        axios.get('/getallphotos').then(photos => {
            this.setState({
                photos: photos.data
            })
        })
    }
    handleTabChange = (value) => {
        this.setState({
            tab: value,
        });
    };
    handleDrop = files => {
        const uploaders = files.map(file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tags", `codeinfuse, medium, gist`);
            formData.append("upload_preset", "kgjwyzim");
            formData.append("api_key", process.env.REACT_APP_CLOUDINARY_KEY);
            formData.append("timestamp", (Date.now() / 1000) | 0);

            return axios.post("https://api.cloudinary.com/v1_1/dfkw5isvi/image/upload", formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                const data = response.data;
                // const fileURL = data.secure_url // You should store this URL for future references in your app
                axios.get(data.secure_url).then(res => {
                    // console.log(res);
                    this.setState({
                        imgUrl: res.config.url
                    })
                })
            })
        })
        // Once all the files are uploaded 
        axios.all(uploaders).then(() => {
            // ... perform after upload is successful operation

        });
    }


    handleChange(prop, val) {
        this.setState({
            [prop]: val,

        })
    }
    savePhoto() {
        if (this.state.title && this.state.price && this.state.description) {
            axios.post('/addphoto', this.state).then(() => {
                axios.get('/getallphotos').then(photos => {
                    this.setState({
                        photos: photos.data
                    })
                })
            })
        } else {
            alert('Please add a title, price, in stock, and description.')
        }

    }

    removePhoto(id) {
        axios.delete(`/removephoto/${id}`).then(
            axios.get('/getallphotos').then(photos => {
                this.setState({
                    photos: photos.data
                })
            }))
    }
    getPhotos() {
        axios.get('/getallphotos').then(photos => {
            this.setState({
                photos: photos.data
            })
        })
    }
    render() {


        // styles for tab and addphoto / remove photos holder
        const tabStyles = {
            headline: {
                fontSize: 24,
                padding: 20,
                marginBottom: 12,
                fontWeight: 400,
            },
        };
        // dropzone styles
        const dropZoneStyles = {
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }
        const TextFieldsAddPhotos = () => (
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                    hintText=''
                    floatingLabelText="Title"
                    value={this.state.title ? this.state.title : ''}
                    onChange={(e) => this.handleChange('title', e.target.value)}
                    style={{ width: '100%', maxWidth: '500px', minWidth: '100px' }}
                /><br />
                <TextField
                    hintText=''
                    floatingLabelText="Description"
                    value={this.state.description ? this.state.description : ''}
                    onChange={(e) => this.handleChange('description', e.target.value)}
                    style={{ width: '100%', maxWidth: '500px', minWidth: '100px' }}
                /> <br />
                <TextField
                    floatingLabelText='Price'
                    label="Price"
                    value={this.state.price ? this.state.price : 0}
                    onChange={(e) => this.handleChange('price', e.target.value)}
                    type="number"
                    style={{ width: '100%', maxWidth: '500px', minWidth: '100px' }}
                /><br />
                <SelectField
                    floatingLabelText="In Stock"
                    value={this.state.in_stock}
                    onChange={this.handleInStock}
                    style={{ width: '100%', maxWidth: '500px', minWidth: '100px' }}
                >
                    <MenuItem value={null} primaryText="" />
                    <MenuItem value={true} primaryText="Yes" />
                    <MenuItem value={false} primaryText="No" />

                </SelectField>
            </div>
        )

        // map of all products to be rendered below
        const allPhotos = this.state.photos.map((photo, i) => {
            return (
                <div key={i} className='manageProductItem'>
                    <div className='manageProductHeader'>
                        <div className='manageInStock'>{photo.in_stock ? <h2 className='inStock manageInStock'>In Stock</h2> : <h2 className='outOfStock manageInStock'>Out of Stock</h2>}</div>
                        <i className="fa fa-trash" aria-hidden="true" onClick={() => this.removePhoto(photo.id)}></i>
                    </div>

                    <img src={photo.image} alt={photo.title} className='manageProductImg' />
                    <h2>{photo.title}</h2>

                </div>
            )
        })



        //=====| RETURN |==================================
        return (
            <div className='ManageProducts'>
                <div>
                    <Tabs
                        value={this.state.tab}
                        onChange={this.handleTabChange}
                    >
                        <Tab label="Add a Photo" value="a">
                            <div className='tabItemHolder'>
                                {/*===| CLOUDINARY |======================*/}
                                <Dropzone
                                    onDrop={this.handleDrop}
                                    multiple
                                    accept="image/*"
                                    style={dropZoneStyles}>
                                    <img src={this.state.imgUrl ? this.state.imgUrl : PlaceholderImg} alt='profileimg' className='EditprofileImage' />
                                    <h2 className='dropZoneText'>Upload Photo</h2>
                                </Dropzone>
                                {TextFieldsAddPhotos()}
                                <button className='addProductBtn' onClick={() => this.saveProduct()}>Save</button>
                            </div>
                        </Tab>
                        <Tab label="Remove A Photo" value="b" onClick={() => this.getProducts()}>
                            <div className='tabItemHolder'>
                                <h2 style={tabStyles.headline}>View all Products</h2>
                                <div className='manageProductsHolder'>{allPhotos}</div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>

            </div>
        )
    }
}
export default ManageProducts;