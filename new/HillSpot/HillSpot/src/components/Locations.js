import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("Loading...");

  const navigate = useNavigate();

  const NETWORK_ERROR = "Unable to fetch data";

  const url1 = "http://localhost:4000/locationsCollection";

  /* To Be Implemented. */
  /* This method fetches all the locations from url1 i.e. http://localhost:4000/locationsCollection. */
  const fetchAllLocations = async (e) => {
    /*      
      1. Send an AXIOS GET request to the url1 and handle the success and error cases appropriately.
      2. In case of success, assign received response's data to locations state.
      3. In case of error, set the errorMessage state as NETWORK_ERROR.      
    */
    try {
      const response = await axios.get(url1);
      setLocations(response.data);
    }
    catch (error) {
      setErrorMessage(NETWORK_ERROR);

    }

  }


  /* Implemented - No Changes Required. */
  useEffect(() => {
    fetchAllLocations();
  }, []);


  /* To Be Implemented. */
  /* This method navigates to RoomBooking component for the selected location. */
  const handleClick = (location) => {
    /*       
      1. Navigate to RoomBooking component with route params as "locationName" of the selected location.
      Note : Use the navigate method to navigate to the RoomBooking component.
    */
    navigate(`/roomBooking/${location.locationName}`);
  }

  /* To Be Modified. */
  /* This method iterates over the locations state to display all the location cards. */
  const displayLocations = () => {
    let counter = 1000;
    /* 
      Start iteration over the locations state. 
      Keep counter incrementation and below return() statement inside the iteration.
    */
    return locations.map((location)=>{
    counter++;
    return (
      <div className="col-md-3" key={counter} >
        <div className="card shadow">
          <h4 className="card-title card-header" name="locationName">
            {/* 1. Display the locationName of the location here. */}
            {location.locationName}
          </h4>
          <div className="card-body gradient-buttons text-center">
            {/* 
                2. Set image source as locationImagePath and alternate text as id of location.
                3. Use inline CSS to set height of image as '200px'.
                4. Set class name as 'card-img-top'. 
              */}
            <img src ={location.locationImagePath}
            alt={location.id}
              style = {{height:'200px'}}
              className="card-img-top"
              data-testid={`imageL${counter}`}
            />
          </div>
          <div className='card-footer'>
            {/* 
              5. Invoke handleClick method by passing proper location object when Book Visit button is clicked.
              6. Set the button text as "Book Visit".
            */}
            <button
              data-testid={`visitBtnL${counter}`}
              name="bookVisit"
              className="btn btn-success btn-block mt-1"
              style={{ margin: 0, position: "relative", left: "50%", transform: "translate(-50%)" }}
              onClick={()=>handleClick(location)}
            >
              {/* Book Visit */}
              Book Visit
            </button>
          </div>
        </div>
      </div>
    ) //End of return.
    /* 
      Iteration should be ended here.
    */
    });
  }

  return (
    <div className="container-fluid mt-5">
      <div className='text-white text-center'>
        <h1 className='h1'>Wanna enjoy your holiday trip to the fullest !!!</h1>
        <h3 className='h3'><b>Hillspot Palace</b> is your South India's one-stop solution to all lodging and boarding needs in hill stations!!!</h3>
        <h3 className='h3'>Choose any of the hill stations below you want to travel!!!</h3>
      </div>
      {/*       
        1. If locations has one or more location Objects then 
            invoke the displayLocations() method inside below <div> tag.
        2. Otherwise render the errorMessage inside below <h2> tag.
      */}

      {
        locations.length>0
          ?
          <div className="row mt-3">
            {displayLocations()}
          </div>
          :
          <h2 className="text-danger text-center" data-testid="loadingMsg">
            {errorMessage}
          </h2>
      }
    </div>
  )
}