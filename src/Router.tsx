import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Catalogue from "./page/Catalogue";
import BookDetails from "./page/BookDetails";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Catalogue />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
