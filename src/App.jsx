import { BrowserRouter, Route, Routes } from "react-router-dom";
import FlightData from "./component/flightData";
import FlightDetails from "./component/flightDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="wrapper">
          <div className="content container-fluid">
            <Routes>
              <Route exact path="/" element={<FlightData />} />
              <Route
                exact
                path="/flightDetails/:id"
                element={<FlightDetails />}
              />
            </Routes>
          </div>
          {/* <div className="footer">
            <h1>Footer</h1>
          </div> */}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
