import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Store from "./components/Store";
import LayOut from "./components/item/LayOut";
import ShoppingCartProvider from "./context/ShoppingCartContext";
import "./App.css";

interface IAppProp {}

const App: React.FC<IAppProp> = () => {
  return (
    <div className="App">
      <div className="container">
        <ShoppingCartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LayOut />}>
                <Route path="store" element={<Store />} />
              </Route>
            </Routes>
          </Router>
        </ShoppingCartProvider>
      </div>
    </div>
  );
};

export default App;
