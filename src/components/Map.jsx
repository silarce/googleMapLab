import React, { useState, useMemo } from 'react'
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

import { markerArrayInit, centerInit } from 'data/mapData';


const containerStyle = {
  width: '1000px',
  height: '850px',
  margin: "auto"
};


function Map() {
  const [markerArr, setMarkerArr] = useState(markerArrayInit)
  // ===================================================
  const polylineData = useMemo(
    () => {
      return {
        options: {
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          clickable: false,
          draggable: false,
          editable: false,
          visible: true,
          radius: 30000,
          paths: markerArr.map(item => item.position),
          zIndex: 1
        }
      }
    },
    [markerArr])


  // ========================================================
  const onDragEnd = (e, index) => {
    setMarkerArr(state => {
      state[index].position = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      return [...state]
    })
  }
  // ========================================================
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyD-KeELeRZ3YKKXNDho5DNijMRf-GkgHzU"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerInit}
        zoom={8}
      >
        { /* Child components, such as markers, info windows, etc. */}
        <>

          {markerArr.map((item, index) => {
            const { position } = item
            return (
              <Marker key={index}
                position={position}
                draggable={true}
                onDragEnd={e => onDragEnd(e, index)}
              />
            )
          })}

          <Polyline
            path={polylineData.options.paths}
            options={polylineData.options}
          />
        </>
      </GoogleMap>
    </LoadScript>
  )
}
export default React.memo(Map)

// =====================================================================================


