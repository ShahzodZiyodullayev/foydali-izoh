import React, { useEffect } from "react";
import Map, {
  NavigationControl,
  FullscreenControl,
  Marker,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { Button, Grid, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

function App() {
  const user = useSelector((store) => store.user);
  const [lat, setLat] = React.useState(41.311081);
  const [lon, setLon] = React.useState(69.240562);
  const [loc, setLoc] = React.useState([]);
  const [isOver, setIsOver] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [mark, setMark] = React.useState({});
  const [inputVal, setInputVal] = React.useState("");
  const [sideData, setSideData] = React.useState(null);
  const [password, setPassword] = React.useState("");
  const [login, setLogin] = React.useState("");

  console.log("user: ", login);

  const get = async () => {
    await axios
      .get("http://localhost:5000/ok")
      .then((d) => console.log("result: ", d));
  };

  const submitBtn = async () => {
    if (login !== "" && password !== "") {
      await axios
        .post("http://localhost:5000/hi", { password, login })
        .then((d) => console.log("post: ", d));
    }
  };

  // accessToken: "pk.eyJ1Ijoic3NoYWh6b2Q1IiwiYSI6ImNsMjRqb2V3NzBhMDIzY3F6N3p3c2MyZGsifQ.hhX6yDNbtjOrROsYkiue7g";

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((e) => {
        setLat(e.coords.latitude);
        setLon(e.coords.longitude);
        setLoc([
          {
            lat: e.coords.latitude,
            lng: e.coords.longitude,
            data: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore excepturi est error in quibusdam eius esse ratione facere dolor? Facere aiquid, dignissimos incidunt inventore nam minima quia cum quos?`,
          },
        ]);
      });
    } else {
      // console.log("Geolocation is not supported by this browser.");
    }
  };

  const add = () => {
    if (isOver) {
      setLoc((current) => [
        ...current,
        { lng: mark.lng, lat: mark.lat, data: inputVal },
      ]);
    }
  };

  useEffect(() => {
    getLocation();
    get();
  }, []);

  return (
    <>
      {user ? (
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
            onClick={(e) => {
              if (e.originalEvent.target.id === "marker") {
                setOpenPopup(false);
              } else {
                setOpenPopup(true);
                setMark({ lng: e.lngLat.lng, lat: e.lngLat.lat });
              }
            }}
            cursor="auto"
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
                  value={e.data}
                  onClick={() => setSideData(e.data)}
                >
                  <div
                    id="marker"
                    onMouseOver={() => setIsOver(false)}
                    onMouseOut={() => setIsOver(true)}
                    style={{
                      position: "relative",
                      width: "50px",
                      height: "30px",
                      background: "white",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-5px",
                        width: "10px",
                        height: "10px",
                        background: "white",
                        transform: "rotate(45deg)",
                        left: "40%",
                      }}
                    />
                  </div>
                </Marker>
              ))}
          </Map>
          <Grid
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "320px",
              height: "auto",
              background: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
              margin: "10px",
              padding: sideData === null ? 0 : "10px",
              transition: "height 1s",
            }}
          >
            {sideData}
          </Grid>
          {openPopup && (
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              top={0}
              left={0}
              position="absolute"
            >
              <Grid
                width="100vw"
                height="100vh"
                backgroundColor="rgba(0, 0, 0, 0.3)"
                onClick={() => setOpenPopup(false)}
              ></Grid>
              <Grid position="absolute" backgroundColor="white">
                <TextField
                  id="standard-basic"
                  label="Standard"
                  variant="standard"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                ></TextField>
                <Button variant="outlined" onClick={add}>
                  Outlined
                </Button>
              </Grid>
            </Grid>
          )}
        </>
      ) : (
        <Grid container height="100vh">
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            backgroundColor="#3A54AA"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img src={require("./assets/img/map.png")} width="500px" />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            backgroundColor="white"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <TextField
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              label="login"
              variant="outlined"
              size="small"
              sx={{ width: 300 }}
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="password"
              variant="outlined"
              size="small"
              sx={{ width: 300, m: 2 }}
            />
            <Button variant="contained" sx={{ width: 300 }} onClick={submitBtn}>
              Login
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default App;
