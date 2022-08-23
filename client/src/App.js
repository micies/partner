import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/homePage";
import Properties from "./components/properties";


function App() {
  return (
    <div className="App">
      <img src="https://www.partner.co.il/globalassets/global/partnerlogo.png" alt="Logo" />;
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/properties/:id" element={<Properties />} />
          Properties
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
