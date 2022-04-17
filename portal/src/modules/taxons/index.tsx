import React from "react";
import { Route, Routes } from "react-router-dom";
import Search from "./modules/search";
import Taxon from "./modules/taxon";

function Taxons() {
  return (
    <Routes>
      <Route path="/:taxonId" element={<Taxon />} />
      <Route path="*" element={<Search />} />
    </Routes>
  );
}

export default Taxons;
