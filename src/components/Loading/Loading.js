import React, { Component } from 'react';
import './Loading.css';
import axios from 'axios';
class Loading extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    componentWillMount() {
        setTimeout(this.myWaitTime, 1800);
    }


    myWaitTime() {
        axios.get('/auth/me').then(res => {
            console.log(res.data);


            if (res.data.is_admin) {

                window.location.assign('http://localhost:3000/#/admin')


            } else {
                if (res.data.new_user) {

                    window.location.assign('http://localhost:3000/#/profile')


                }
                else {

                    window.location.assign('http://localhost:3000/#/')


                }
            }
        })

    }
    render() {
        return (
            <div className='Loading'>
                <div class="loader"></div>
            </div>
        )
    }
}
export default Loading;