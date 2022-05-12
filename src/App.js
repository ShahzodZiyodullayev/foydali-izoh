import React, { useEffect } from "react";
// import axios from "axios";
import Map, {
  NavigationControl,
  FullscreenControl,
  Marker,
  Popup,
  Layer,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "maplibre-gl/dist/maplibre-gl.css";

function App() {
  const [lat, setLat] = React.useState(41.311081);
  const [lon, setLon] = React.useState(69.240562);
  const [loc, setLoc] = React.useState([]);

  useEffect(() => {
    getLocation();
  }, []);

  // accessToken: "pk.eyJ1Ijoic3NoYWh6b2Q1IiwiYSI6ImNsMjRqb2V3NzBhMDIzY3F6N3p3c2MyZGsifQ.hhX6yDNbtjOrROsYkiue7g";

  // const get = async () => {
  //   const result = await axios.get("http://localhost:2000/ok");
  //   console.log("res: ", result);
  // };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((e) => {
        setLat(e.coords.latitude);
        setLon(e.coords.longitude);
        setLoc([{ lat: e.coords.latitude, lng: e.coords.longitude }]);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const add = (e) => {
    setLoc((current) => [...current, { lng: e.lngLat.lng, lat: e.lngLat.lat }]);
  };

  const layers = {
    id: "clusters",
    type: "circle",
    source: "earthquakes",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#51bbd6",
        100,
        "#f1f075",
        750,
        "#f28cb1",
      ],
      "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
    },
  };

  return (
    <>
      <Map
        mapboxAccessToken="pk.eyJ1Ijoic3NoYWh6b2Q1IiwiYSI6ImNsMjRqb2V3NzBhMDIzY3F6N3p3c2MyZGsifQ.hhX6yDNbtjOrROsYkiue7g"
        initialViewState={{
          longitude: lon,
          latitude: lat,
          zoom: 11,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/sshahzod5/cl24o9adg000q14o5dedr87fg"
        projection="equirectangular"
        onClick={(e) => add(e)}
      >
        <NavigationControl position="top-left" />
        <FullscreenControl position="bottom-left" />
        {loc?.length > 0 &&
          loc.map((e) => (
            <Marker
              key={e.lng + e.lat}
              longitude={e.lng}
              latitude={e.lat}
              anchor="bottom"
            >
              <img src={require("./pin.png")} />
            </Marker>
          ))}
        {/* <Popup
          longitude={lon}
          latitude={lat}
          offset={[0, -30]}
          closeButton={false}
        >
          hello
        </Popup> */}
        <Layer {...layers} />
      </Map>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "320px",
          height: "100px",
          background: "#fff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
          margin: "10px",
        }}
      ></div>
    </>
  );
}

export default App;
