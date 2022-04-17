import React from "react";
import { Route, Routes } from "react-router-dom";
import Collection from "../modules/collection";
import Species from "../modules/taxons";
import HomePage from "../modules/homePage";
import RegisterSighting from "../modules/registerSighting";

export default function Navigation() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="collection/*" element={<Collection />} />
      <Route path="register-sighting/*" element={<RegisterSighting />} />
      <Route path="species/*" element={<Species />} />
    </Routes>
  );
}
