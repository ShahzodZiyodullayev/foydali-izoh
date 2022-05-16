import React from "react";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Maps from "./components/Maps";

function App() {
  const user = useSelector((store) => store.user);

  return <>{user && user.length > 0 ? <Maps /> : <Login />}</>;
}

export default App;
