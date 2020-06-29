import React, { Component } from "react";
import AppointmentPicker from "react-appointment-picker";
import {createAppSlots} from '../action-creators/createAppSlots'
import {createAppointment} from '../action-creators/createAppointment'
import {changeAppointment} from '../action-creators/changeAppointment'
import {deleteAppointment} from '../action-creators/deleteAppointment'
import {searchClinic} from '../action-creators/searchClinic';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal'

class Scheduler extends Component {
  
  constructor(props){
    super(props);
    this.selectedAppointmentsState = React.createRef();
  }
 
  state = {
    loading: false,
    selectedAppointment: false,
    hasBooking: false,
    hasSelected: true,
    isChanging: false,
    clinicName: null,
    clinicId: null,
    showAppointments: false,
  };

  addAppointmentCallback = ({ day, number, time, id }, addCb) => {
    this.setState(
      {
        loading: true
      },
      async () => {
        //await new Promise(resolve => setTimeout(resolve));
        console.log(
          `Added =======> appointment ${number}, day ${day}, time ${time}, id ${id}`
        );
       
        await addCb(day, number, time, id);
        await this.setState({ loading: false, selectedAppointment: id, hasSelected: true});
      }
    );
  };

  removeAppointmentCallback = ({ day, number, time, id }, removeCb) => {
    this.setState(
      {
        loading: true
      },
      async () => {
        //await new Promise(resolve => setTimeout(resolve));
        console.log(
          `Removed appointment ${number}, day ${day}, time ${time}, id ${id}`
        );
        await removeCb(day, number);
        await this.setState({ loading: false, selectedAppointment: false , hasSelected: false});
      }
    );
  };

  submitBooking = async (clinicId,timeSlot) =>{
    await this.props.createAppointment(clinicId,timeSlot)
  }

  changeBooking = async (appId,timeSlot) =>{
    await this.props.changeAppointment(appId,timeSlot)
  }

  deleteBooking = async (appId,timeSlot) =>{
    await this.props.deleteAppointment(appId,timeSlot)
  }

  populateAppointments = async () => {
    await this.props.createAppSlots(this.state.clinicId, this.state.clinicName)
  }

  unselectButton = async () =>{
    // if(this.selectedAppointmentsState.current !== null){
     await this.selectedAppointmentsState.current.setState({selectedAppointments:{}, size:0});
     await this.setState({hasSelected:false})
   //}

  }

  searchChangeHandler = (event) =>  {
    let state = this.state 
    switch (event.target.name) {
        case "clinicName": 
            event.preventDefault()
            state.clinicName = event.target.value
            this.setState(state);
            this.props.searchClinic(state.clinicName)
            console.log("search text",state.clinicName)
            break;
    }
  }

  setShowAppointments = async (bool) =>{
    await this.setState({showAppointments: bool})
    if(!bool){
      this.setState({hasSelected: false, isChanging: false,})  
    }
  }





  // if we have an appointment: show cancel or change, higlight app slot green 
  // on click change: set isChanging to true,  show submit button
  // on click cancel: http to sever to delete app, pop to show appointment canceld
  // on close of modal: reset all the states
  
  render() {
    const { loading } = this.state;

    const isClickable=()=>{
        return(this.state.isChanging? {pointerEvents:"auto"} : {pointerEvents:"none"} )
    }
  
    const bookingOptions = () =>{
      


      if((this.state.hasSelected === true && this.props.slots.app_id ===false) || (this.state.isChanging === true && this.state.hasSelected === true)){
        return(<button className='passwordButton btn btn-success' type='button' 
          onClick={async () => {await this.submitBooking(this.state.clinicId, this.state.selectedAppointment); await this.populateAppointments(); await this.unselectButton();}}>
          Submit booking </button>
        ) 
      }
      else if(this.props.slots.app_id !== false ){ //if there is app id means alread have an apointment
        return(
          <React.Fragment>
            <button className='cancelButton btn btn-primary m-3' type='button' 
              onClick={async () => {await this.deleteBooking(this.props.slots.app_id, this.state.selectedAppointment); await this.populateAppointments(); await this.unselectButton();}}>
              Cancel Appointment
            </button>
            <button className='passwordButton btn btn-warning' type='button' 
              // onClick={async () => {await this.changeBooking(this.props.slots.app_id, this.state.appointment); await this.populateAppointments(); await this.unselectButton();}}>
              onClick={async () =>{ await this.setState({isChanging: true}); await this.unselectButton()}}>
              Change Appointment
            </button>       
          </React.Fragment>  
        )
      }
      else{
        return(
          null
        )
      }
    
    }


    const searchResults =() => { 
      return(
        this.props.clinics===(undefined)? 
        null
        :
        this.props.clinics.map((clinic, index) => (
        <p>{clinic.clinic__name} <button className='followerButton btn btn-primary m-3' name='followerbutton' type='submit' 
            onClick={async()=>{await this.setState({clinicId: clinic.id, clinicName: clinic.clinic__name}); await this.populateAppointments(); await this.setShowAppointments(true)}}>
            Select</button></p>
      ))
      )
    }

    return (
      <div className="container-fluid text-center">
        <h1>Booking</h1>
        
        <div className="container-fluid ">
          <div className="row">
            <div className="col">
                <h2>Search Clinics</h2>

                <form>
                    <input
                        className="m-3 col-xs-4"
                        name="clinicName"
                        onChange={this.searchChangeHandler}
                        type="text"
                        placeholder="search for a clinic" />
                </form>

                {searchResults()}

            </div>
          </div>
        </div>

        <Modal
          size="lg"
          show={this.state.showAppointments}
          onHide={() =>this.setShowAppointments(false)}
          backdrop="static"
          aria-labelledby="example-modal-sizes-title-lg"
        > 
          <Modal.Header closeButton>
            {this.state.clinicName}
            <br></br>  
            app is selected: {this.state.hasSelected ? "selected": "none selected"}
            <br></br>
            currently sleetcd datetime slot: {this.state.selectedAppointment}
            <br></br>
           
          </Modal.Header>

          <Modal.Body style={isClickable()}>
            <AppointmentPicker 
                addAppointmentCallback={this.addAppointmentCallback}
                removeAppointmentCallback={this.removeAppointmentCallback}
                initialDay={new Date(this.props.slots.min_time)}//{new Date('2020-06-27 09:00')}
                days={this.props.slots.appointments}
                maxReservableAppointments={1}
                // alpha={true}
                unitTime= {36000_0_0}
                visible= {true}
                ref = {this.selectedAppointmentsState}
                selectedByDefault
                loading={loading}
            />
          </Modal.Body>
       
          <Modal.Footer>

            {bookingOptions()}

          </Modal.Footer>  
        </Modal>
      
      </div>
      
    );
  }
}

const mapStateToProps = state => ({
  // ...state
  profile: state.login.profile,
  token: state.login.token,
  slots: state.createAppSlots.slots,
  clinics: state.searchClinic.clinics
})

const mapDispatchToProps = dispatch => ({
  createAppSlots: (clinicId) => dispatch(createAppSlots(clinicId)),
  createAppointment: (clinicId, timeSlot) => dispatch(createAppointment(clinicId, timeSlot)),
  changeAppointment: (appId, timeSlot) => dispatch(changeAppointment(appId,timeSlot)),
  deleteAppointment: (appId, timeSlot) => dispatch(deleteAppointment(appId,timeSlot)),
  searchClinic: (clinicName) => dispatch(searchClinic(clinicName)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Scheduler);
//export default Scheduler;
