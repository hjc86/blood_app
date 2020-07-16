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

  /*
  
  need way to toggle selection of a timeslot with condtitions


  */
  
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
    clickableAppSlots:{pointerEvents:"none"},
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
     await this.selectedAppointmentsState.current.setState({selectedAppointments:{}, size:0});
  }

  selectButton = async () =>{
    await this.selectedAppointmentsState.current.setState({selectedAppointments:this.state.selectedAppointment, size:1});
 }
 
  setClickableAppSlots = async (bool) =>{
    if(bool){
      this.setState({clickableAppSlots:{pointerEvents:"auto"}})
    }
    else{
      this.setState({clickableAppSlots:{pointerEvents:"none"} })
  
    }
    
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
    if(this.props.slots.app_id===false){
      this.setClickableAppSlots(true)
    }
    else{
      this.setClickableAppSlots(false)
    }
    
    if(bool===false){
      this.setState({
        hasBooking: false,
        hasSelected: true,
        isChanging: false,
      })

    }
    await this.setState({showAppointments: bool})
    // await this.setClickableAppSlots(false)
    if(!bool){
      this.setState({hasSelected: false, isChanging: false})  
    }
  }

  render() {
    const { loading } = this.state;



    const bookingOptions = () =>{
      
      if(typeof(this.props.slots.app_id)==="number" && this.state.isChanging!==true){ // if app made
        return(<React.Fragment>
                  <button className='passwordButton btn btn-warning' type='button' 
                    // onClick={async () => {await this.changeBooking(this.props.slots.app_id, this.state.appointment); await this.populateAppointments(); await this.unselectButton();}}>
                    onClick={async () =>{ await this.setClickableAppSlots(true); await this.setState({isChanging:true}); await this.unselectButton();}}>
                    Change Appointment
                  </button> 
                  <button className='cancelButton btn btn-primary m-3' type='button' 
                    onClick={async () => {await this.deleteBooking(this.props.slots.app_id, this.state.selectedAppointment); await this.unselectButton();}}>
                    Cancel Appointment
                  </button>
                </React.Fragment>
        )
      }
      else if((this.state.isChanging===true || typeof(this.props.slots.app_id)!=="number") && (this.state.hasSelected ===true)) {
       
        return(<button className='passwordButton btn btn-success' type='button' 
          onClick={async () => {await this.submitBooking(this.state.clinicId, this.state.selectedAppointment); await this.populateAppointments(); await this.unselectButton();}}>
          Submit booking </button>
        ) 
      }

      else{
        return(null)
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
          onHide={() =>this.setShowAppointments(false) }
          backdrop="static"
          aria-labelledby="example-modal-sizes-title-lg"
        > 
          <Modal.Header closeButton>
            {this.state.clinicName}
            <br></br>  
            app is selected: {this.state.hasSelected ? "selected": "none selected"}
            <br></br>
            currently selected datetime slot: {this.state.selectedAppointment}
            <br></br>
           
          </Modal.Header>

          <Modal.Body style={this.state.clickableAppSlots}>
            <AppointmentPicker 
                addAppointmentCallback={this.addAppointmentCallback}
                removeAppointmentCallback={this.removeAppointmentCallback}
                initialDay={new Date(this.props.slots.min_time)}//{new Date('2020-07-16 09:00')} 
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
      
        {/* {this.props.appointments.map((appointment, index) => (
        <p>{appointment.time} {} <button className='followerButton btn btn-primary m-3' name='followerbutton' type='submit' 
            onClick={async()=>{await this.setState({clinicId: clinic.id, clinicName: clinic.clinic__name}); await this.populateAppointments(); await this.setShowAppointments(true)}}>
            Select</button></p>
        ))} */}

      </div>
      


    );
  }
}

const mapStateToProps = state => ({
  // ...state
  profile: state.login.profile,
  token: state.login.token,
  slots: state.createAppSlots.slots,
  clinics: state.searchClinic.clinics,
  donorAppointments: state.getAppointments
})

const mapDispatchToProps = dispatch => ({
  createAppSlots: (clinicId) => dispatch(createAppSlots(clinicId)),
  createAppointment: (clinicId, timeSlot) => dispatch(createAppointment(clinicId, timeSlot)),
  changeAppointment: (appId, timeSlot) => dispatch(changeAppointment(appId,timeSlot)),
  deleteAppointment: (appId, timeSlot) => dispatch(deleteAppointment(appId,timeSlot)),
  searchClinic: (clinicName) => dispatch(searchClinic(clinicName))
  // getAppointments: (donorId) => dispatch(getAppointments(donorId))
})


export default connect(mapStateToProps, mapDispatchToProps)(Scheduler);
//export default Scheduler;
