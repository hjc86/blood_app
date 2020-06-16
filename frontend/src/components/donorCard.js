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


    // searchDonor = (event) =>{
    //     event.preventDefault()
    //     searchDonor(this.state.followerUsername)
    // }

    // followDonor= (event) => {
    //     event.preventDefault()
    //     this.props.followDonor()

        // alert("This username doesnt exist")
        // adds the user on the list followers
        // let currentFollow = this.state.followerUsername
        // let newFollow = currentFollow.concat(this.state.followers);
        // this.setState({followers : newFollow})
        // console.log(this.state.followers)
        
    //}
    
    // likeMe = () => {
    //     let newlike = this.state.like + 1
    //     this.setState({
    //       like: newlike
    //     })
    //     console.log(newlike)
    //   }


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
{/*                     
                    <div className="col-5  m-5 p-5 justify-content-center">
                        <div className="m-3 text-center col justify-content-center">
                            <h2>Followers</h2>
                            <p>Send them some love!</p>
                        </div>
                     */}
{/*                     
                        <div className="row mt-3 justify-content-center">
                            <form>
                                <input
                                    className="m-3 col-xs-4"
                                    name="followerUsername" 
                                    onChange={this.changeHandler}
                                    type="text"
                                    placeholder="search for a username" />
                                <button className='followerButton btn btn-primary m-3' name='followerbutton' type='submit' onClick={this.addFollow}>Follow</button>
                            </form>
                        </div> */}

                        <div className="row mt-3 justify-content-center">
                            <div className="card col-7 m-3 p-2">
                        
                                {this.props.donors.map((donor, index) => (
                                        <p>{donor.username}</p>
                                    ))}

                                {/* <p>{this.state.followers} 
                                    <button 
                                    className="btn"
                                    value="❤️" 
                                    name="like" 
                                    type="button"
                                    onClick={this.likeMe}>❤️</button>
                                </p> */}
                            </div>
                        </div>
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
