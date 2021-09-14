import { useEffect, useState } from "react";
import axios from "axios";
import PokemonThumbnail from "./components/PokemonThumbnail";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit-20"
  );

  const getAllPokemons = async () => {
    const data = await axios(loadMore);

    setLoadMore(data.data.next);

    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const data = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );

        setAllPokemons((currentList) => [...currentList, data.data]);
      });
    }
    createPokemonObject(data.data.results);
    await console.log(allPokemons, "allPokemons");
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div className="app-container">
      <h1>Pokedex!</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon, index) => (
            <PokemonThumbnail
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              key={index}
            />
          ))}
        </div>
        <button className="load-more" onClick={getAllPokemons}>
          Load more
        </button>
      </div>
    </div>
  );
}

export default App;
