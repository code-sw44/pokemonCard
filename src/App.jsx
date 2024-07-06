import React, { useState, useEffect } from 'react';
import './components/pokemonCard.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const pokemonDataPromises = data.results.map(async (result) => {
          const pokemonResponse = await fetch(result.url);
          if (!pokemonResponse.ok) {
            throw new Error('Network response for Pokemon details was not ok');
          }
          return pokemonResponse.json();
        });

        const pokemonData = await Promise.all(pokemonDataPromises);
        setPokemonList(pokemonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPokemon();
  }, []);

  const showPokemonDetails = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const closePokemonDetails = () => {
    setSelectedPokemon(null);
  };

  return (
    <>
      <div className="box">
        {pokemonList.map((pokemon, index) => (
          <div className="contentBox" key={index} onClick={() => showPokemonDetails(pokemon)}>
            <div className="pokemonCard">
              <img className="imgPokemons" src={pokemon.sprites.front_default} alt={pokemon.name} />
              <p>{pokemon.name}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedPokemon && (
        <div className="modal">
          <div className="lol2"></div>
          <div className="modal-content">
            <span id='modalClose' className="close modalClose" onClick={closePokemonDetails}>][</span>
            <h2>{selectedPokemon.name}</h2>
            <img className='pokiSize' src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
            <div className="skillFactor">
              <p className='paragrph'>Weight: {selectedPokemon.weight}</p>
              <p className='paragrph'>Height: {selectedPokemon.height}</p>
              <p className='paragrph'>Abilities: {selectedPokemon.abilities.map((ability, index) => (
                  <a key={index}>{ability.ability.name}</a>
                ))}</p>
             
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
