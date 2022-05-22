import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { setUser } from "./../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { API } from "aws-amplify";

function Login() {
  const [password, setPassword] = React.useState("");
  const [login, setLogin] = React.useState("");

  const dispatch = useDispatch();

  const submitBtn = async () => {
    // let result;
    // if (login !== "" && password !== "") {
    //   result = await axios.post("http://localhost:5000/hi", {
    //     password,
    //     login,
    //   });
    // }
    // console.log("result: ", result);
    // if (result && result.data && result.data.data) {
    //   // dispatch(setUser("h"));
    //   dispatch(setUser(result.data.data));
    // }
    await API.get("izoh", "/comments", "1").then((e) => console.log(e));
  };

  return (
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
        <img src={require("./../assets/img/map.png")} width="500px" />
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
  );
}

export default Login;
