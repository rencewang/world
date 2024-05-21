import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import AirportService from '../service/airportService';
import FlightService from '../service/flightService';

const Map = () => {
  const [flights, setFlights] = useState([]);
  const [airportCoordinates, setAirportCoordinates] = useState({});

  // Get flights and pre-fetch airport coordinates for each flight
  useEffect(() => {
    const fetchData = async () => {
      try {
        // get flights data
        const flightsData = await FlightService.getFlights();
        setFlights(flightsData);

        // get coordinates for airports in flights
        const coordinates = {};
        for (const flight of flights) {
          if (!airportCoordinates[flight.departureAirport]) {
            coordinates[flight.departureAirport] =
              await AirportService.getAirportCoordinates(flight.From);
          }
          if (!airportCoordinates[flight.arrivalAirport]) {
            coordinates[flight.arrivalAirport] =
              await AirportService.getAirportCoordinates(flight.To);
          }
        }
        setAirportCoordinates(coordinates);
      } catch (error) {
        console.error('Error fetching airport coordinates:', error);
      }
    };

    fetchData();
    console.log(airportCoordinates, flights);
  }, []);

  return (
    <section>
      <MapContainer center={[51.505, -0.09]} zoom={13} className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        {flights.map((flight, index) => {
          const departureAirport = airportCoordinates[flight.departureAirport];
          const arrivalAirport = airportCoordinates[flight.arrivalAirport];

          if (departureAirport && arrivalAirport) {
            return (
              <Polyline
                key={index}
                positions={[
                  [departureAirport.latitude, departureAirport.longitude],
                  [arrivalAirport.latitude, arrivalAirport.longitude],
                ]}
                color="blue"
              >
                <Popup>
                  Flight {flight.FlightNumber}: {flight.From} to {flight.To}
                </Popup>
              </Polyline>
            );
          }
          return null;
        })}
      </MapContainer>
    </section>
  );
};

export default Map;
