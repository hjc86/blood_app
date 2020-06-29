import React from 'react';

import TimeslotCard from './timeslot_card';


class Timeslot extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {timeslots: this.props.timeslots}
    }
    
    render() {
        return (
            <div style={{display: "flex", flexDirection: "column"}}>
                {Object.keys(this.state.timeslots).map((item,index) =>
                (< TimeslotCard key={index} day={item} timeslots={this.state.timeslots[item]} changeHandler = {this.props.changeHandler}/>)
                )}
            </div>
            
        )
    }
}

export default Timeslot;