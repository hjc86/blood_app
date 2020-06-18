import React from 'react';
import { connect } from 'react-redux';

import image from "../img/user.png";
import { searchDonor, followDonor, unfollowDonor, getFollowing } from '../action-creators/follow';
import { login } from '../action-creators/login';
import { Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history';

class Followers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            followerUsername: null,
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
                this.props.searchDonor(state.followerUsername, this.props.token)
                console.log("search text",state.followerUsername)
                break;
        }
    }

    // componentDidMount = () => {
    //     this.getFollowing()

    // }
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
    // if (this.props.followers===(undefined)){
    //     this.props.getFollowing()

    // }
    // likeMe = () => {
    //     let newlike = this.state.like + 1
    //     this.setState({
    //       like: newlike
    //     })
    //     console.log(newlike)
    //   }

    search = async () =>{
       await this.props.searchDonor(this.state.followerUsername, this.props.token)
       await this.props.getFollowing() 
    }

    componentDidMount = async() =>{
       await  this.props.getFollowing()
    }

    // componentDidUpdate = async() =>{
    //    await this.props.getFollowing()
    // }



    // componentDidUpdate = async ()=>{
    //   await this.props.getFollowing()
    // }
    // if (this.props.followers===(undefined)){
    //     this.props.getFollowing()
    //  }

    render() {
        // if (this.props.followers===(undefined)){
        //     console.log("ajajajajj")
        //     this.props.getFollowing()
        // }

        return (
            <div className="container-fluid ">
                <div className="row">
                    
                    <div className="col">
                       
                        <h2>Find Friends</h2>
                        <p>Send them some love!</p>
                        
                    
                        <form>
                            <input
                                className="m-3 col-xs-4"
                                name="followerUsername" 
                                onChange={this.changeHandler}
                                type="text"
                                placeholder="search for a username" />
                        </form>
                   
                        {this.props.donors===(undefined)? 
                            "no search results"
                            :
                            this.props.donors.map((donor, index) => (
                                <p>{donor.username} <button className='followerButton btn btn-primary m-3' name='followerbutton' type='submit' onClick={async()=>{await this.props.followDonor(this.props.id, donor.id,this.props.token); await this.search();}}>Follow</button></p>
                            ))
                        }
                    </div>
       

                    <div className="col">
                    
                        {this.props.following===(undefined)? 
                                "loading"

                            :
                        this.props.following.map((followee, index) => (
                                <p>{followee.username} <button className='followerButton btn btn-dark m-3' name='followerbutton' type='submit' onClick={async ()=> {await this.props.unfollowDonor(this.props.id, followee.id,this.props.token); await this.search();}}>unfollow</button></p>
                            ))}
                    </div>


                    <div className="col">
                    
                        Feed will go here
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
    username: state.login.profile.followee_name,
    id: localStorage.getItem('id'),//state.login.profile.user_id
    following: state.follow.following
})

const mapDispatchToProps = dispatch => ({

    searchDonor: (donor,token) => dispatch(searchDonor(donor,token)),
    followDonor: (id,donor,token)=> dispatch(followDonor(id,donor,token)),
    unfollowDonor: (id,donor,token)=> dispatch(unfollowDonor(id,donor,token)),
    getFollowing: ()=> dispatch(getFollowing())
    
    // login: (credentials) => dispatch(login(credentials))


})


export default connect(mapStateToProps, mapDispatchToProps)(Followers);
