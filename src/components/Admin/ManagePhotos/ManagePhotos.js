import React, { Component } from 'react';
import './ManagePhotos.css';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import { Tabs, Tab } from 'material-ui/Tabs';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import PlaceholderImg from '../../Assets/noProduct.png';
class ManagePhotos extends Component{ 
    constructor(){
        super();
 
        this.state = {
            photos: [],
            title: '',
            imgUrl: '',
            locationState: '',
            
            tab: 'a'
        }
        this.handleDrop = this.handleDrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // getting all images
        axios.get('/getallimages').then(images => {
            this.setState({
                photos: images.data
            },()=>console.log(this.state.photos))
        })
    }
    handleTabChange = (value) => {
        this.setState({
            tab: value,
        });
    };
    
    handleDrop = files => {
        const uploaders = files.map(file => {
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
    // handles the location selection for state
    handleLocationState = (event, index, value) => this.setState({ locationState: value });

    saveImage() {
        axios.post('/addimage', this.state);
    }

    // saveImage() {
    //     if (this.state.title && this.state.price && this.state.description) {
    //         axios.post('/addproduct', this.state).then(() => {
    //             axios.get('/getallproducts').then(products => {
    //                 this.setState({
    //                     products: products.data
    //                 })
    //             })
    //         })
    //     } else {
    //         alert('Please add a title, price, in stock, and description.')
    //     }

    // }
    render() {
        // styles for tab and addphoto / view photos holder
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
        // map of all products to be rendered below
        const allPhotos = this.state.photos.map((photo, i) => {
            return (
                <div key={i} className='manageProductItem'>
                    <div className='manageProductHeader'>
                        {/* remove product from db */}
                        {/* <i className="fa fa-trash" aria-hidden="true" onClick={() => this.removePhoto(photo.id)}></i> */}
                    </div>

                    <img src={photo.image} alt={photo.title} className='manageProductImg' />
                    <h2>{photo.title}</h2>

                </div>
            )
        })
        return (
            <div className='ManagePhotos'>
                Manage Photos
                <Tabs
                    value={this.state.tab}
                    onChange={this.handleTabChange}
                >


                    <Tab label="Manage Photos" value="a" onClick={() => this.getProducts()}
                    >
                        <Link to='/admin'><i className="fa fa-chevron-left" aria-hidden="true"></i></Link>
                        <div className='tabItemHolder'>

                            <h2 style={tabStyles.headline}>View all Photos</h2>
                            <div className='manageProductsHolder'>{allPhotos}</div>
                        </div>
                    </Tab>
                    <Tab label="Add a Photo" value="b" className='tabButton'>
                        <Link to='/admin'><i className="fa fa-chevron-left" aria-hidden="true"></i></Link>
                        <div className='tabItemHolder'>
                            {/*===| CLOUDINARY |======================*/}
                            <div className='cloudinary'>
                                <Dropzone
                                    onDrop={this.handleDrop}
                                    multiple
                                    accept="image/*"
                                    style={dropZoneStyles}>
                                    <img src={this.state.imgUrl ? this.state.imgUrl : PlaceholderImg} alt='profileimg' className='EditprofileImage' />
                                    <h2 className='dropZoneText'>{this.state.imgUrl ? 'Change Photo Image' : 'Upload Photo Image'}</h2>
                                </Dropzone>

                                
                            </div>
                            <TextField
                                hintText=''
                                floatingLabelText="Title"
                                value={this.state.title ? this.state.title : ''}
                                onChange={(e) => this.handleChange('title', e.target.value)}
                                style={{ width: '100%', maxWidth: '500px', minWidth: '100px' }}
                            /><br />
                            <SelectField
                                floatingLabelText="location"
                                value={this.state.locationState}
                                onChange={this.handleLocationState}
                                style={{ width: '100%', maxWidth: '500px', minWidth: '100px' }}
                            >
                                <MenuItem value={''} primaryText="" />
                                <MenuItem value={'alabama'} primaryText="Alabama" />
                                <MenuItem value={'arkansas'} primaryText="arkansas" />

                            </SelectField>
                            <button className='addProductBtn' onClick={() => this.saveImage()}>save</button>
                        </div>
                    </Tab>
                </Tabs>

            </div>
        )
    }
}
export default ManagePhotos;