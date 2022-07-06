import React, { useState, useEffect } from "react";

import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

import IconCar from "../../../../assets/icons/car.png";

import { FetchGarageAll } from "../../../../services";


function Map() {
  const [selectPark, setSelectPark] = useState(null);
  const [dataGet, setDataGet] = useState([]);

  useEffect(() => {
    const getAllgarage = async () => {
      await FetchGarageAll().then((response) => {
        if (response) {
          setDataGet(response.data);
          // console.log("data", response.data);
        }
      });
    };
    getAllgarage();
  }, []);

  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 15.118524429823255, lng: 104.9075726928711 }}
    >
      {dataGet.length !== 0 ? (
        <>
          {dataGet.map((park, index) => (
            <Marker
              key={index}
              position={{
                lat: JSON.parse(park.address_map)[0],
                lng: JSON.parse(park.address_map)[1],
              }}
              onClick={() => {
                setSelectPark(park);
              }}
              icon={{
                url: IconCar,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              //   icon={IconCar}
            />
          ))}
        </>
      ) : null}

      {selectPark && (
        <InfoWindow
          position={{
            lat: JSON.parse(selectPark.address_map)[0],
            lng: JSON.parse(selectPark.address_map)[1],
          }}
          onCloseClick={() => {
            setSelectPark(null);
          }}
        >
          <div>
            <h4>
              <b>{selectPark.garage_name}</b>
            </h4>
            <p>{JSON.parse(selectPark.garage_type).join(",  ")}</p>
            <p>เปิด {selectPark.on_time} - {selectPark.off_time}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <>
      <WrappedMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBKBdBAnDzrOkcfHq9InQFfYM7Inig-Zeg&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "600px" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </>
  );
}
