import React from "react";
import { Route } from "react-router-dom";
import Homepage from "./pages/Homepage"

export default function Routes() {
  return (
    <Routes>
      <Route exact path="/">
        <Homepage />
      </Route>
    </Routes>
  );
}