import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonFlashCards from "./components/PokemonFlashCards";
import Debug from "./components/Debug";

const basename = process.env.PUBLIC_URL || "/pokemon-flash-cards";

const App = () => {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<PokemonFlashCards />} />
        <Route path="/debug" element={<Debug />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
