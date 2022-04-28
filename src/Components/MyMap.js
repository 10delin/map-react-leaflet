import React, { useEffect, useState } from "react";
import L from "leaflet";
import { popupContent, popupHead, popupText, urlPopup } from "./popupStyles";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function GetIcon(iconSize, iconType) {
  return L.icon({
    iconUrl: require(`../Assets/Markers/marker-${iconType}.png`),
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
    name: "Instituto Cuisine",
    type: "Asociaciones",
    position: [36.68648698680206, -6.1408180751951],
    size: 25,
    link: "https://www.cuisine.digital/es/",
    img: "https://media-exp1.licdn.com/dms/image/C4E0BAQHheSY8MqEQ1g/company-logo_200_200/0/1610019399238?e=2147483647&v=beta&t=8PUR2dVMa41fu16eVp3aNPwdSeuFKD9iJQ6F1e0U4JA",
  },
  {
    key: 2,
    name: "Ayuntamiento Sevilla",
    type: "Ayuntamientos",
    position: [37.36670677992029, -5.96596917337107],
    size: 25,
  },
  {
    key: 3,
    name: "Colegio Sevilla",
    type: "Colegios",
    position: [37.45670677992029, -5.96596917337107],
    size: 25,
  },
  {
    key: 4,
    name: "Colegio Granada",
    type: "Colegios",
    position: [37.18640204329338, -3.650600468886968],
    size: 25,
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

  return (
    <>
      <div style={{align:"center",padding:"3% 5% 5%"}}>
        <MapContainer
          className="map"
          center={[37.22468458759511, -4.701167986858217]}
          zoom={8.3}
          minZoom={7}
          doubleClickZoom={false}
          maxBoundsViscosity={3.0}
          maxBounds={bounds}
          style={{ height: 750, width: "100%",borderRadius: "10px",border:"2px solid grey" }}
        >
          
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          />

          {activeLocations.map((location) => (
            <Marker
              key={location.key}
              position={location.position}
              icon={GetIcon(location.size, location.type.toLowerCase())}
            >
              <Popup>
                <div style={popupContent}>
                  <a href={location.link}>
                    <img
                      src={location.img}
                      width="150"
                      height="150"
                      alt="no img"
                    />
                  </a>
                  <div className="m-2" style={popupHead}>
                    {location.name}
                  </div>
                  <span style={popupText}>
                    <span style={{ color: "green" }}>EXPERIENCIAS: </span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </span>
                  <div className="m-2" style={urlPopup}>
                    <span>
                      <b>Web: </b>
                    </span>
                    <a href={location.link}>{location.link}</a>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      <div style={{display: "inline-block"}}>
        {filterItems.map((filter) => {
          return (
            <div key={filter}>
              <input
                type="checkbox"
                onChange={updateFilter}
                name={filter}
                defaultChecked
              />
              <label>{filter} </label>
              <div className={filter.toLowerCase()}></div>
            </div>
          );
        })}
      </div>
      </div>
    </>
  );
};

export default MyMap;
