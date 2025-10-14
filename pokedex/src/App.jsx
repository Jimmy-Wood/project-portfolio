import Header from "./components/Header";
import SideNav from "./components/SideNav";
import PokeCard from "./components/PokeCard";

import { useState } from "react";

function App() {
  //Selected pokemon
  const [selectedPokemon, setSelectedPokemon] = useState(0);

  //Toggle menu for mobile
  const [showSideMenu, setShowSideMenu] = useState(false);

  //Switches value
  function handleToggleMenu() {
    setShowSideMenu(!showSideMenu);
  }

  //Closes menu on selection
  function handleCloseMenu() {
    setShowSideMenu(false);
  }

  return (
    <>
      <Header handleToggleMenu={handleToggleMenu} />
      <SideNav
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
        showSideMenu={showSideMenu}
        handleCloseMenu={handleCloseMenu}
      />
      <PokeCard selectedPokemon={selectedPokemon} />
    </>
  );
}

export default App;
