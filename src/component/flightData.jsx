import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FlightData = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetchFlights();

    const interval = setInterval(fetchFlights, 60000); // Refresh data every 60 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await fetch(
        "https://flight-status-mock.core.travelopia.cloud/flights"
      );
      let res = await response.json();
      setFlights(res);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

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
      <div className="w-100 table-responsive">
        <table className="table table-hover">
          <thead>
            <tr className="thead">
              <th>Flight Number</th>
              <th>Airline</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Departure Time</th>
              <th>Status</th>
            </tr>
          </thead>
          {flights &&
            flights.map((flight, index) => {
              getFormattedDate(flight);
              return (
                <tbody key={index}>
                  <tr
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/flightDetails/${flight.id}`)}
                  >
                    <td>{flight.flightNumber}</td>
                    <td>{flight.airline}</td>
                    <td>{flight.origin}</td>
                    <td>{flight.destination}</td>
                    <td>{`${flight.departureDate} ${flight.departureTime}`}</td>
                    <td>{flight.status}</td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
    </>
  );
};

export default FlightData;
