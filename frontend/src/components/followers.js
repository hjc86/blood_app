import React from 'react';
import { connect } from 'react-redux';

import image from "../img/user.png";


class DonorCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "followerUsername": null,
            "followers": [],
            "like" : 0
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
        let newFollow = this.state.followerUsername
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
            <div className="container-fluid">
                <div className="justify-content-center">
                    <div className="text-center">
                        <img src={image} alt="profile picture" style={{width: "90px"}}/>
                        <br/>
                        <label className="display-4">UserName</label>
                        <br />
                        <label className="display-5">Likes ❤️ : {this.state.like}</label>
                        <p>I like being a vampire</p>
                        <p>Last time Donated</p>
                    </div>
                </div>

                <div className="col-4">
                    <div className="text-center ">
                        <h2>Followers</h2>
                        <p>like them!</p>
                    </div>
                        <form>
                        <input
                            className="form-control"
                            name="followerUsername" 
                            onChange={this.changeHandler}
                            type="text"
                            placeholder="eg. SusanMiss"
                        />
                        <button className='followerButton btn btn-primary' name='followerbutton' type='submit' onClick={this.addFollow}>Follow</button>
                        </form>
                    </div>

                    <div className="card m-2">
                        <div className="col-2">
                        <p>{this.state.followers}</p>
                       
                        <input 
                        value="❤️" 
                        name="like" 
                        type="button"
                        onClick={this.likeMe} 
                        />
                        </div>
                    </div>
            </div>
        )
    }
}

export default connect() (DonorCard);
