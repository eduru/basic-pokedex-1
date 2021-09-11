import { useEffect, useState } from "react";
import axios from "axios";

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
    await console.log(allPokemons);
  };

  // an empty array means just load once.
  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div className="app-container">
      <h1>Pokedex!</h1>
      <div className="pokemon-container">
        <div className="all-container"></div>
        <button className="load-more">Load more</button>
      </div>
    </div>
  );
}

export default App;
