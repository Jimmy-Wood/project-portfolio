import { useEffect, useState } from "react";
import { getPokedexNumber, getFullPokedexNumber } from "../utils";
import Typecard from "./TypeCard";
import Modal from "./Modal";

export default function PokeCard(props) {
  const { selectedPokemon } = props;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [skill, setSkill] = useState(null);
  const [loadingSkill, setLoadingSkill] = useState(false);

  //Deconstruct all data into each attribute
  const { name, stats, types, moves, sprites } = data || {};

  //Filter out missing sprites or alternate versions
  const imgList = Object.keys(sprites || {}).filter((val) => {
    if (!sprites[val]) {
      return false;
    }
    if (["versions", "other"].includes(val)) {
      return false;
    }
    return true;
  });

  async function fetchMoveData(move, moveUrl) {
    //If loading, not in local storage or no move URL, exit function
    if (loadingSkill || !localStorage || !moveUrl) {
      return;
    }

    //Check chache for move
    let cache = {};
    if (localStorage.getItem("pokemon-moves")) {
      cache = JSON.parse(localStorage.getItem("pokemon-moves"));
    }

    //If move in cache, set the skill to the current move from cache
    if (move in cache) {
      setSkill(cache[move]);
      console.log("Found move in cache");
      return;
    }

    try {
      //Set loading to true
      setLoadingSkill(true);
      //Fetch the data from API via move URL
      const res = await fetch(moveUrl);
      const moveData = await res.json();
      console.log("Fetched move from API", moveData);

      //Filter out any other game versions, to just the original 2
      const description = moveData?.flavor_text_entries.filter((val) => {
        return (val.version_group.name = "firered-leafgreen");
      })[0]?.flavor_text;

      //Create object for skill data
      const skillData = {
        name: move,
        description,
      };
      setSkill(skillData);

      //Cache that skill for future requests
      cache[move] = skillData;
      localStorage.setItem("pokemon-moves", JSON.stringify(cache));
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingSkill(false);
    }
  }

  useEffect(() => {
    // If loading, exit logic, not ready to check
    if (loading || !localStorage) {
      return;
    }

    // Check cache for selected pokemon
    let cache = {};
    //If returned cache must exist so set cache to items in there
    if (localStorage.getItem("pokedex")) {
      cache = JSON.parse(localStorage.getItem("pokedex"));
    }

    // Check if selected pokemon in cache, otherwise fetch from API
    if (selectedPokemon in cache) {
      //Read from cache
      setData(cache[selectedPokemon]);
      console.log("Found pokemon in cache");
      return;
    }

    //Cache is checked, no result, now fetch from API
    async function fetchPokemonData() {
      setLoading(true);
      try {
        const baseUrl = "https://pokeapi.co/api/v2/";
        const suffix = "pokemon/" + getPokedexNumber(selectedPokemon);
        const finalUrl = baseUrl + suffix;
        const res = await fetch(finalUrl);
        const pokemonData = await res.json();
        setData(pokemonData);
        console.log(pokemonData);
        // Save new result in cache for future
        cache[selectedPokemon] = pokemonData;
        localStorage.setItem("pokedex", JSON.stringify(cache));
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonData();
  }, [selectedPokemon]);

  //Load screen displayed if waiting
  if (loading || !data) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="poke-card">
      {/* Conditionally render modal when skill is 'true' */}
      {skill && (
        <Modal
          handleCloseModal={() => {
            setSkill(null);
          }}
        >
          <div>
            <h6>Name</h6>
            <h2 className="skill-name">{skill.name.replaceAll("-", " ")}</h2>
          </div>
          <div>
            <h6>Description</h6>
            <p>{skill.description} of skill</p>
          </div>
        </Modal>
      )}
      {/* Number and name */}
      <div>
        <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
        <h2>{name}</h2>
      </div>
      {/* Map for each type assigned against pokemon */}
      <div className="type-container">
        {types.map((typeObj, typeIndex) => {
          return <Typecard key={typeIndex} type={typeObj?.type?.name} />;
        })}
      </div>
      {/* Higher quality img for each pokemon from public folder */}
      <img
        className="default-img"
        src={"/pokemon/" + getFullPokedexNumber(selectedPokemon) + ".png"}
        alt={`${name}-large-img}`}
      />
      {/* Map of each img from API */}
      <div className="image-container">
        {imgList.map((spriteKey, spriteIndex) => {
          const imgUrl = sprites[spriteKey];
          return (
            <img
              key={spriteIndex}
              src={imgUrl}
              alt={`${name}-img-${spriteKey}`}
            />
          );
        })}
      </div>
      {/* Stats section */}
      <h3>Stats</h3>
      <div className="stats-card">
        {stats.map((statObj, statIndex) => {
          const { stat, base_stat } = statObj;
          return (
            <div key={statIndex} className="stat-item">
              {/* Replace "-" with a space */}
              <p>{stat?.name.replaceAll("-", " ")}</p>
              <h4>{base_stat}</h4>
            </div>
          );
        })}
      </div>
      {/* Moves section */}
      <h3>Moves</h3>
      <div className="pokemon-move-grid">
        {moves.map((moveObj, moveIndex) => {
          return (
            <button
              className="button-card pokemon-move"
              key={moveIndex}
              onClick={() => {
                fetchMoveData(moveObj?.move?.name, moveObj?.move?.url);
              }}
            >
              <p>{moveObj?.move?.name.replaceAll("-", " ")}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
