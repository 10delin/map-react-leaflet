import React, { useEffect, useState, useCallback, useMemo,  useRef} from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
 // useMap,
 // useMapEvents
} from "react-leaflet";
//import { latLng } from "leaflet";

function GetIcon(iconSize, iconColor) {
  return L.icon({
    iconUrl: require("../Static/Markers/marker-" + iconColor + ".png"),
    iconSize: [iconSize],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
}

//variables to limit the map
const corner1 = L.latLng(35.290051301069006, -7.629485689021285);
const corner2 = L.latLng(39.027321651363565, -0.8509217840822761);
const bounds = L.latLngBounds(corner1, corner2);

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
    name: "Colegio Sevilla",
    type: "Colegios",
    position: [37.45670677992029, -5.96596917337107],
    size: 25,
    iconColor: "red",
  },
  {
    key: 4,
    name: "Colegio Granada",
    type: "Enitdades",
    position: [37.18640204329338, -3.650600468886968],
    size: 25,
    iconColor: "orange",
  },
];

const getUniqueFilterItems = (locations) => {
  const uniqueFilters = [];

  locations.map((location) => {
    if (!uniqueFilters.includes(location.type)) {
      uniqueFilters.push(location.type);
    }
  });

  return uniqueFilters;
};

// function MyComponent() {
//   const map = useMap()
//   useMapEvents({
//     // click: (e) => {
//     //   const clicked = map.mouseEventToLatLng(e.originalEvent)
//     //   L.marker([clicked.lat,clicked.lng]).addTo(map)
//     // }
//   })
//   return null
// }

const MyMap = () => {
  const [locations, setLocations] = useState([]);
  const [activeLocations, setActiveLocations] = useState([]);
  const [filterItems, setFilterItems] = useState(() =>
    getUniqueFilterItems(locations)
  );

  const updateFilter = (e) => {
    if (!e.currentTarget.checked) {
      const locationsCopy = [...activeLocations];
      const newLocations = locationsCopy.filter(
        (location) => location.type !== e.currentTarget.name
      );
      setActiveLocations(newLocations);
    } else {
      const locationsCopy = [...locations];
      const newLocations = locationsCopy.filter(
        (location) => location.type === e.currentTarget.name
      );
      setActiveLocations([...activeLocations, ...newLocations]);
    }
  };

  useEffect(() => {
    setLocations(data);
    setActiveLocations(data);
  }, []);

  useEffect(() => {
    setFilterItems(getUniqueFilterItems(locations));
  }, [locations]);

  const center = [37.22468458759511, -4.701167986858217]

  function GetIcon(iconSize, iconColor) {

    return L.icon({
  
      iconUrl: require("../Static/Markers/marker-" + iconColor + ".png"),
  
      iconSize: [iconSize],
  
      iconAnchor: [12, 41],
  
      popupAnchor: [1, -34],
  
    });
  
  }


  function DraggableMarker() {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    console.log(position)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])
  
    return (
      <Marker
        draggable={toggleDraggable}
        eventHandlers={eventHandlers}
        position={position}
        icon = {GetIcon(25,"red")}       
        ref={markerRef}>
        {/* <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
          </span>
        </Popup> */}
      </Marker>
    )
  }


  



  return (
    <>
      <MapContainer
        className="map"
        center={[37.22468458759511, -4.701167986858217]}
        zoom={8.3}
        minZoom={7}
        doubleClickZoom={false}
        maxBoundsViscosity={3.0}
        maxBounds={bounds}
        style={{ height: 800, width: "100%" }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />
        {/* <MyComponent /> */}
        <DraggableMarker />
        ))

      </MapContainer>
      <div>
        {filterItems.map((filter) => {
          return (
            <div key={filter}>
              <input
                type="checkbox"
                onChange={updateFilter}
                name={filter}
                defaultChecked
              />
              <label className={filter.toLowerCase()}>{filter}</label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyMap;
