import React, { useEffect, useState } from "react";
import L from "leaflet";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

function GetIcon(iconSize, iconColor) {
  return L.icon({
    iconUrl: require("../Static/Markers/marker-" + iconColor + ".png"),
    iconSize: [iconSize],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
}
const data = [
  {
    key: 1,
    name: "Digital Cuisine",
    type: "Trabajo",
    position: [36.68648698680206, -6.1408180751951],
    size: 25,
    iconColor: "blue",
  },
  {
    key: 2,
    name: "Colegio Sevilla",
    type: "Colegios",
    position: [37.36670677992029, -5.96596917337107],
    size: 25,
    iconColor: "red",
  },
  {
    key: 3,
    name: "Colegio Granada",
    type: "Enitdades",
    position: [37.18640204329338, -3.650600468886968],
    size: 25,
    iconColor: "orange",
  },
];

const getUniqueFilterItems = (locations) => {
  const uniqueFilters = []

  locations.map(location => {
    if(!uniqueFilters.includes(location.type)) {
      uniqueFilters.push(location.type)
    }
  })

  return uniqueFilters
}

const MyMap = () => {
  const [locations, setLocations] = useState(data)
  const [activeLocations, setActiveLocations] = useState(data)
  const [filterItems, setFilterItems] = useState(() => getUniqueFilterItems(locations))

  console.log('locations', locations)
  const updateFilter = (e) => {
    console.log('e', e.currentTarget.name)
    console.log('checked', e.currentTarget.checked)
    const locationsCopy = [...locations]
    console.log('loc copy', locationsCopy)

    if (e.currentTarget.checked) {

    } else {

    }

     const newLocations = locationsCopy.filter(location => location.type !== e.currentTarget.name)
     console.log('newlocations', newLocations)
     setActiveLocations(newLocations)
 
  }

  useEffect(() => {
    setFilterItems(getUniqueFilterItems(locations))
  },[locations])

  return (
    <>
      <MapContainer
        className="map"
        center={[37.22468458759511, -4.701167986858217]}
        zoom={8}
        style={{ height: 800, width: "100%" }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />

        <LayersControl collapsed={false} position="bottomright">
          <LayersControl.Overlay checked name="Colegios">
            {activeLocations.map((location) => (
              <Marker
                key={location.key}
                position={location.position}
                icon={GetIcon(location.size, location.iconColor)}
              >
                <Popup>{location.name}</Popup>
              </Marker>
            ))}
        </LayersControl.Overlay>  
        </LayersControl>
      </MapContainer>
      <div>
        {
          filterItems.map((filter) => {
            return (
              <div key={filter}>
                <input type="checkbox" onChange={updateFilter} name={filter} defaultChecked/>
                <label>{filter}</label>
              </div>
            )
          })
        }
      </div>
    </>
  );
}

export default MyMap;
