import React, { useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { act } from '@testing-library/react';

export default function RoomBooking() {

  const params = useParams();

  const [formData, setFormData] = useState({
    locationName: params.locationName,
    customerName: "",
    noOfPeople: "",
    visitDate: "",
    phoneNumber: "",
  });

  const [formErrors, setFormErrors] = useState({
    customerName: "",
    noOfPeople: "",
    visitDate: "",
    phoneNumber: "",
  });

  const [formValid, setFormValid] = useState({
    customerName: false,
    noOfPeople: false,
    visitDate: false,
    phoneNumber: false,
    isButtonActive: false
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /* Use the messages from the below messages object 
  to display all kinds of success, error and validation messages instead of hardcoding. */
  const messages = {
    REQUIRED_VALIDATION: "Field is required",
    INVALID_CUSTOMER_NAME_1: "Name should have at least 3 alphabets",
    INVALID_CUSTOMER_NAME_2: "Name should have only alphabets",
    INVALID_NO_OF_PEOPLE_1: "Number of people should be greater than 0",
    INVALID_NO_OF_PEOPLE_2: "Number of people should not be more than 4",
    INVALID_VISIT_DATE: "Date of visit should not be past date",
    INVALID_PHONE_NUMBER: "Phone number should be of 10 digits",
    BOOKING_ERROR: "Failed to book the visit",
    BOOKING_SAVED: "Your visit is successfully booked for "
  }

  const url1 = "http://localhost:4000/bookingsCollection/";

  /* To Be Modified. */
  /* This function will be invoked whenever any change happens in any of the input field. */
  const handleChange = (event) => {
    /*            
      1. Should use the name and value from the event object.    
    */
    const fieldName = 'event.target.name';
    const fieldValue = 'event.target.value';
    const newFormData = {...formData,[fieldName]:fieldValue
      /*        
        2. Assign the received value of each input field to proper newFormData state property.
      */
      

    };
    /* 3. Invoke validateField() function by passing name and value from the event object as parameters. */
    validateField(fieldName,fieldValue);

    act(() => {
      setFormData(newFormData);
    });
  };



  /* To Be Modified. */
  /* This method validates the input fields based on the mentioned conditions. */
  const validateField = (fieldName, fieldValue) => {
    let newFormError = { ...formErrors };
    let newFormValid = { ...formValid };
    /* 
      Common requirement for all the inputs as follows:
      1. If input is valid then 
        a. set the associated error message as empty string.
        b. set the associated formValid value as true, 
      2. Otherwise set associated formValid value as false.
    */
    switch (fieldName) {
      case "customerName":
        /*
          1. If the value of customerName is empty,
              set the associated error message as REQUIRED_VALIDATION.
          2. If the value contains less than 3 characters,
              set the associated error message as INVALID_CUSTOMER_NAME_1.
          3. If the value contains other than alphabet characters,
              set the associated error message as INVALID_CUSTOMER_NAME_2.
              Hint: Use RegEx pattern.          
          Note: One if block is given for your reference.
        */
        if (fieldValue === "") {
          newFormError.customerName = messages.REQUIRED_VALIDATION;
          newFormValid.customerName = false;
        }else if(fieldValue.length<3){
          newFormError.customerName = messages.INVALID_CUSTOMER_NAME_1;
          newFormValid.customerName = false;
        }else if(!/^[A-Za-z]+$/.test(fieldValue)){
          newFormError.customerName = messages.INVALID_CUSTOMER_NAME_2;
          newFormValid.customerName = false;
        }else{
          newFormError.customerName = "";
          newFormValid.customerName = true; 
        }

        break;

      case "noOfPeople":
        const noOfPeople = parseInt(fieldValue, 10);
        if (fieldValue === "") {
          newFormError.noOfPeople = messages.REQUIRED_VALIDATION;
          newFormValid.noOfPeople = false;
        }else if(noOfPeople <= 0){
          newFormError.noOfPeople = messages.INVALID_NO_OF_PEOPLE_1;
          newFormValid.noOfPeople = false;
        }else if(noOfPeople > 4){
          newFormError.noOfPeople = messages.INVALID_NO_OF_PEOPLE_2;
          newFormValid.noOfPeople = false;
        }else{
          newFormError.noOfPeople = "";
          newFormValid.noOfPeople = true;
        }
        /*
          1. If the value of noOfPeople is empty,
              set the associated error message as REQUIRED_VALIDATION.
          2. If the value is less than or equal to 0,
              set the associated error message as INVALID_NO_OF_PEOPLE_1.
          3. If the value is greater than 4,
              set the associated error message as INVALID_NO_OF_PEOPLE_2.          
        */
        
        break;

      case "visitDate":
        const visitDate = new Date(fieldValue);
        if (fieldValue === "") {
          newFormError.visitDate = messages.REQUIRED_VALIDATION;
          newFormValid.visitDate = false;
        }else if(visitDate<new Date()){
          newFormError.visitDate = messages.INVALID_VISIT_DATE;
          newFormValid.visitDate = false;
        }else{
          newFormError.visitDate = "";
          newFormValid.visitDate = true;
        }
        /*
          1. If the value of visitDate is empty,
              set the associated error message as REQUIRED_VALIDATION.
          2. If the value is not a today's date or future date,
              set the associated error message as INVALID_VISIT_DATE.
        */
        
        break;

      case "phoneNumber":
        /*
          1. If the value of phoneNumber is empty,
              set the associated error message as REQUIRED_VALIDATION.
          2. If the value is less than 10,
              set the associated error message as INVALID_PHONE_NUMBER.
        */
       if (fieldValue === "") {
        newFormError.phoneNumber = messages.REQUIRED_VALIDATION;
        newFormValid.phoneNumber = false;
       } else if (fieldValue.length < 10) {
        newFormError.phoneNumber = messages.INVALID_PHONE_NUMBER;
        newFormValid.phoneNumber = false;
        } else {
          newFormError.phoneNumber = "";
          newFormValid.phoneNumber = true;
        }
        break;

      default:
        break;
    }

    /* 
      1. Set isButtonActive to true when the associated formValid property of all four input fields are true.
    */
   newFormValid.isButtonActive = newFormValid.customerName && newFormValid.noOfPeople && newFormValid.visitDate && newFormValid.phoneNumber;
    

    act(() => {
      setFormValid(newFormValid);
    });
    act(() => {
      setFormErrors(newFormError);
    });
  };

  /* Implemented - No Changes Required. */
  const resetForm = () => {
    setFormData({
      customerName: "",
      noOfPeople: "",
      visitDate: "",
      phoneNumber: "",
    }
    );
    setFormValid({ ...formValid, isButtonActive: false });
  }

  /* Implemented - No Changes Required. */
  const clearMessage = () => {
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 4000);
  }

  /* To Be Implemented. */
  /* This function will save the booking form data in the backend. */
  const submitVisit = async (e) => {
    /*      
      1. Prevent the default behaviour of the form submit.        
      2. Save the booking data i.e. formData in the backend as follows:                      
          a. Send the formData state to the url1 using axios post method.
          b. If axios post method is successful, 
              Set the successMessage state as BOOKING_SAVED along with visitDate.
              Invoke the resetForm() function to clear the form fields.
          c. Otherwise,
              Set the errorMessage state as BOOKING_ERROR.
          Note: At a time either successMessage or errorMessage will have some value.
          Hint: Use try catch block to handle the error.
      3. Invoke clearMessage() function after try catch block that clears all messages after 4 seconds.            
    */
   e.preventDefault();
   try{
    await axios.put(url1, formData);
    setSuccessMessage(`${messages.BOOKING_SAVED} ${formData.visitDate}`);
    resetForm();
   }catch(error){
    setErrorMessage(messages.BOOKING_ERROR);
   }
   clearMessage(); 
  };


  /* To be modified. */
  /* The below code designs registration form. */
  return (
    <div className="row">
      <div className="col-md-5 offset-md-3">
        <br />
        <div className="card">
          <div className="card-header text-center bg-success">
            
            <h3>
              <label className="text-light mt-1" data-testid="regFormHeading">
              Registration Form - {formData.locationName}              
              
              </label>
            </h3>
          </div>
          <div className="card-body">
            <form onSubmit={submitVisit}>
              {/* 
                1. The common requirements for each input field for the following form are mentioned below:
                    a. There are four types of input elements with type as text, number, date, number respectively 
                    and one submit button.
                    b. All the form fields should be bound to the corresponding formData state property.
                    c. All the form fields should have proper name and id. It must match with formData state property.
                    d. handleChange() method should be invoked on the change of values of every input field.
                    e. All the form fields should have error message and display it in a <span> tag.
              */}
              <div className="form-group">
                <label >Customer Name</label>
                <input                  
                  type="text"
                  placeholder="Enter Name"
                  name="customerName"
                  id="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  data-testid="customerName-input"
                  className="form-control"
                               
                />
                <span name="customerNameError" id="customerNameError" className="text-danger" data-testid="customerNameError">
                  {formErrors.customerName}
                </span>
              </div>

              <div className="form-group">
                <label >Number of People</label>
                <input                  
                  type="number"
                  placeholder="Enter Number of People"
                  name="numberOfPeople"
                  id="numberOfPeople"
                  value={formData.numberOfPeople}
                  onChange={handleChange}
                  data-testid="noOfPeople-input"
                  className="form-control"
                             
                />
                <span name="noOfPeopleError" id="noOfPeopleError" className="text-danger" data-testid="noOfPeopleError">
                  {formErrors.noOfPeople}
                </span>
              </div>


              <div className="form-group">
                <label>Visit Date</label>
                <input
                  type="date"
                  name="visitDate"
                  id="visitDate"
                  value={formData.visitDate}
                  onChange={handleChange}
                  data-testid="visitDate-input"
                  className="form-control"
                             
                />
                <span name="visitDateError" id="visitDateError" className="text-danger" data-testid="visitDateError">
                  {formErrors.visitDate}
                </span>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="number"
                  placeholder="Enter Phone Number"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  data-testid="phoneNumber-input"
                  className="form-control"
                             
                />
                <span name="phoneNumberError" id="phoneNumberError" className="text-danger" data-testid="phoneNumberError">
                  
                </span>
              </div>

              {/* 
                1. Disable the Submit button until isButtonActive state property becomes true.
                2. Display the button text as "Book Visit".
              */}
              <button
                type="submit"
                disabled={!formValid.isButtonActive}
                data-testid="bookingBtn"
                className="btn btn-success btn-block mt-1"
                style={{ margin: 0, position: "relative", left: "50%", transform: "translate(-50%)" }}
                name="bookingBtn"
                id="bookingBtn"
                
              >
                Book Visit
              </button>
            </form>
            <div className="text-center">
              {/* 
                The below code will display either successMessage or errorMessage after form submission.
                1. If successMessage exists, display successMessage inside <span> with class name as "text-success".
                2. If errorMessage exists, display errorMessage inside <span> with class name as "text-danger".
                Note: Both errorMessage and successMessage should not appear together. 
              */}
              {
                
                <span name="successMessage" id="successMessage" data-testid="success-Message" >
                {successMessage}
                </span>
              }
              {
                
                <span name="errorMessage" id="errorMessage" data-testid="error-Message" >
                  {errorMessage}
                </span>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}