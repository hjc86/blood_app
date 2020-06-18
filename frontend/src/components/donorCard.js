import React from 'react';
import { connect } from 'react-redux';

import image from "../img/user.png";
import { searchDonor } from '../action-creators/follow';
import { login } from '../action-creators/login';
import { Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history';

class DonorCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            followerUsername: null
            //token: this.props.loginResponse.token.tokenData
            // "followers": [],
            // "like" : 400
        }
    }

    changeHandler = (event) =>  {
        let state = this.state 
        switch (event.target.name) {
            case "followerUsername": 
                event.preventDefault()
                state.followerUsername = event.target.value
                this.setState(state);
                this.props.searchDonor(event.target.value, this.props.token)
                console.log(state)
                break;
        }
    }



    render() {
        return (
            <div className="container-fluid ">
                <div className="col m-2 justify-content-center">
                    <div className="m-5 justify-content-center text-center row">
                        <div className="col  m-5 p-5 justify-content-center">
                            <img src={image} alt="profile picture" style={{width: "90px"}}/>
                            <br/>
                            <label className="display-4">{this.props.username}</label>
                            <br />
                            <label className="display-5">Likes ❤️ : {this.state.like}</label>
                            <p>"I'm a blood donor and I love it!"</p>
                            <p>Last time Donated : 03-01-2020</p>
                        </div>
                    <div/>
                </div>
            </div>      
            </div>    
        )
     
    }
}

const mapStateToProps = state => ({

    token: state.login.token,
    loginResponse: state.login,
    donors: state.follow.donors,
    username: state.login.profile.followee_name
    // followersResponse: state.followers
})

const mapDispatchToProps = dispatch => ({

    searchDonor: (donor,token) => dispatch(searchDonor(donor,token))
    // createAccount: (create) => dispatch(createAccount(create)),
    // login: (credentials) => dispatch(login(credentials))


})


export default connect(mapStateToProps, mapDispatchToProps)(DonorCard);
