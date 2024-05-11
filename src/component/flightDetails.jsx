import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FlightDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [flightData, setFlightData] = useState({});

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await fetch(
          `https://flight-status-mock.core.travelopia.cloud/flights/${id}`
        );
        let res = await response.json();
        getFormattedDate(res);
        setFlightData(res);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlightDetails();
  }, [id]);

  const getFormattedDate = (res) => {
    const dateTime = new Date(res.departureTime);

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[dateTime.getUTCDay()];

    // Get the month
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[dateTime.getUTCMonth()];

    const date = dateTime.getUTCDate();

    const formattedDate = `${dayOfWeek}, ${month} ${date}`;

    let hours = dateTime.getUTCHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const minutes = dateTime.getUTCMinutes();

    const formattedTime = `${hours}:${minutes} ${ampm}`;
    res.departureDate = formattedDate;
    res.departureTime = formattedTime;

    return res;
  };

  return (
    <>
      <div>
        <div className="goBack" onClick={() => navigate(-1)}>
          {/* navigate.goBack() */}
          <i className="fa-solid fa-circle-chevron-left"></i>
          <h2>Go Back</h2>
        </div>
        {flightData && (
          <>
            <div className="flight-card">
              <div className="flight-details">
                <h1>Flight Details</h1>
                <div className="flight-title">
                  <h2>{flightData.airline}</h2>
                  <h2>{flightData.flightNumber}</h2>
                  <h2>{flightData.status}</h2>
                </div>
              </div>
              <div className="flight-data">
                <h2>{flightData.origin}</h2>
                <div className="separator">
                  <span className="horizontal-line"></span>
                  <i className="fa-solid fa-plane"></i>
                  <span className="horizontal-line"></span>
                </div>
                <h2>{flightData.destination}</h2>
              </div>
              <div className="flight-dates">
                <h2>{flightData.departureDate}</h2>
                <h2>{flightData.departureTime}</h2>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FlightDetails;
