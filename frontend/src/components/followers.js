import React from 'react';
import { connect } from 'react-redux';

import image from "../img/user.png";


class DonorCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "followerUsername": null,
            "followers": [],
            "like" : 400
        }
    }

    changeHandler = (event) =>  {
        let state = this.state 
        switch (event.target.name) {
            case "followerUsername": 
                state.followerUsername = event.target.value
                this.setState(state);
                console.log(state)
                break;
        }
    }

    addFollow = (event) => {
        event.preventDefault()
        // alert("This username doesnt exist")
        // adds the user on the list followers
        let currentFollow = this.state.followerUsername
        let newFollow = currentFollow.concat(this.state.followers);
        this.setState({followers : newFollow})
        console.log(this.state.followers)
        
    }
    
    likeMe = () => {
        let newlike = this.state.like + 1
        this.setState({
          like: newlike
        })
        console.log(newlike)
      }


    render() {
        return (
            <div className="container-fluid ">
                <div className="col m-2 justify-content-center">
                    <div className="m-5 justify-content-center text-center row">
                        <div className="col  m-5 p-5 justify-content-center">
                        <img src={image} alt="profile picture" style={{width: "90px"}}/>
                        <br/>
                        <label className="display-4">kimK12</label>
                        <br />
                        <label className="display-5">Likes ❤️ : {this.state.like}</label>
                        <p>"I'm a blood donor and I love it!"</p>
                        <p>Last time Donated : 03-01-2020</p>
                        </div>
                    <div className="col-5  m-5 p-5 justify-content-center">
                        <div className="m-3 text-center col justify-content-center">
                        <h2>Followers</h2>
                        <p>Send them some love!</p>
                        </div>
                    <div className="row mt-3 justify-content-center">
                        <form>
                        <input
                            className="m-3 col-xs-4"
                            name="followerUsername" 
                            onChange={this.changeHandler}
                            type="text"
                            placeholder="eg. SusanMiss"
                        />
                        <button className='followerButton btn btn-primary m-3' name='followerbutton' type='submit' onClick={this.addFollow}>Follow</button>
                        </form>
                    </div>

                    <div className="row mt-3 justify-content-center">
                        <div className="card col-7 m-3 p-2">
                        <p>{this.state.followers} <button 
                        className="btn"
                        value="❤️" 
                        name="like" 
                        type="button"
                        onClick={this.likeMe}>❤️</button></p>
                        </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        )
    }
}

// export default connect() (DonorCard);


export default DonorCard
