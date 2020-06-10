import React from 'react';
import { connect } from 'react-redux';

import image from "../img/user.png";

class DonorCard extends React.Component {

    render() {
        return (
            <div className="container-fluid">
                <div className="text-center">
                    <img src={image} alt="profile picture" style={{width: "90px"}}/>
                    < br/>
                    <label className="display-4">UserName</label>
                    <p>Blood Type?</p>
                    <p>Last time Donated</p>
                </div>
            </div>
        )
    }
}

export default connect() (DonorCard);
