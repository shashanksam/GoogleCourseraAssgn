import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
 
  const [state, setState] = useState({
    name: "",
    address: "",
    phoneNo: "",
    email: "",
    password: "",
  });
  
  const [formErrors, setFormErrors] = useState({
    name: "",
    address: "",
    phoneNo: "",
    email: "",
    password: "",
  });
  
  const [valid, setValid] = useState(false);
  const [mandatory, setMandatory] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    
    setState({...state,[event.target.name]:event.target.value})
    
      // set the condition as The length of the name should be minimum 3 character.
      if(event.target.name === "name"){
        if(event.target.value.length < 3){
          setFormErrors({...formErrors,name:"The length of the name should be minimum 3 character"})
      }
    
      // set the condition as required field.
   
      // set the condition as the Phone number should have 10 digits.
    
      // set the condition as the Email should match the basic email format.
    
      // set the condition as The length of the password should be between 8 and 12 characters
  };
  const handleSubmit = (event) => {
    // 1. This method will be invoked when user clicks on 'Register' button.
    // 2. You should prevent page reload on submit
    // 3. check whether all the form fields are entered. If any of the form fields is not entered set the mandatory state variable to true.
    // 4.  If all the form fields values are entered then make axios call to
    // "http://localhost:4000/users/" and pass the appropriate state as data to the axios call
    // 5. If the axios call is successful, assign the below string to successMessage state:
    //    "User registered successfully with the id "+ <id>
    // 6. If the axios call is not successful, assign the error message to "Error while registering user"
  };
  return (
    <>
      <div>
        <div
          className="container mt-3 text-start p-5"
          style={{ width: "60%", fontSize: "14px" }}
        >
          <div className="row p-3">
            <div className="col-lg-6 "></div>
            <div className="col-lg-6" style={{ backgroundColor: "#ebe7e7" }}>
              <form>
                {/*
                1. Display successMessage or errorMessage after submission of form
                2. Form should be controlled
                3. Event handling methods should be binded appropriately
                4. Invoke the appropriate method on form submission
                */}
                <div className="mb-2 mt-2">
                  <label className="form-label">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    
                  />
                  {/* check whether name error is set,if set display the corresponding error message using conditional rendering */}
                </div>
                <div className="mb-2 mt-2">
                  <label className="form-label">Address:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    
                  />
                  {/* check whether address error is set,if set display the corresponding error message using conditional rendering */}
                </div>
                <div className="mb-2 mt-2">
                  <label className="form-label">PhoneNo:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phoneNo"
                    
                  />
                  {/* check whether phoneNo error is set,if set display the corresponding error message using conditional rendering */}
                </div>
                <div className="mb-2 mt-2">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    
                  />
                  {/* check whether email error is set,if set display the corresponding error message using conditional rendering */}
                </div>
                <div className="mb-2">
                  <label className="form-label">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    
                  />
                  {/* check whether password error is set,if set display the corresponding error message using conditional rendering */}
                </div>
                {/* bind the disabled attribute to the button to the valid state variable */}
                <button
                  type="submit"
                  className="btn mb-2 d-block text-white"
                  style={{ backgroundColor: "#88685e" }}
                >
                  Register
                </button>
                <br />
                {/*Using the concept of conditional rendering,display success message, error messages related to required fields and axios calls */}
                {/* {if the form fields are not entered then set the message as 'Enter all the form fields'} */}
                <div data-testid="mandatory" className="text-danger"></div>
                <div data-testid="successMessage" className="text-danger"></div>
                {/* create a link for Login page */}
                Login with your existing account
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
