import React from 'react';

import TimeslotCard from './timeslot_card';

class Timeslot extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {timeslots: this.props.timeslots}
    }
    
    render() {
        return (
            <div>
                {Object.keys(this.state.timeslots).map((item,index) =>
                (< TimeslotCard key={index} day={item} timeslots={this.state.timeslots[item]} timeSlotHandler = {this.props.timeSlotHandler}/>)
                )}
            </div>
            
        )
    }
}

export default Timeslot;