import React, { useState } from "react";
import RandomGif from "./components/RandomGif";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import SingleGif from "./components/SingleGif";

const App = () => {
  const [searchVal, setSearchVal] = useState("");

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Giphy Search</h1>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <RandomGif searchVal={searchVal} setSearchVal={setSearchVal} />
            }
          />
          <Route path="/gif/:id" element={<SingleGif />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
