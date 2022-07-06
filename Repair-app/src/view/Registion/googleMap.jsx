import { Col,   } from 'antd'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from 'react-google-maps'
  
  let newLatLng = [{ lat: 15.118524429823255, lng: 104.9075726928711 }]

  const onMarkerDragEnd = (event) => {
    newLatLng[0].lat = event.latLng.lat()
    newLatLng[0].lng = event.latLng.lng()
    // console.log('newLat', newLatLng[0].lat, 'newLng', newLatLng[0].lng)
  }

  const MapWithAMarker = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap defaultZoom={8} defaultCenter={newLatLng[0]}>
        <Marker
          draggable={true}
          position={newLatLng[0]}
          onDragEnd={(e) => onMarkerDragEnd(e)}
          
        />
      </GoogleMap>
    ))
  )

  export default function App() {
      return (
        <Col  span={24}>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBYQsoMGSxKVOe6vilIiEedgPhRDjcPbC8&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '400px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </Col>
      )
  }