import React, { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { PokemonCard } from './components/PokemonCard';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Container, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([])

  useEffect( () => {
    fetch(pokeApi)
    .then((res) => res.json())
    .then((data) => {
      setPokemonList(data.results);
      setFilteredPokemon(data.results)
    });
  }, []); 

  function handleChange(e) {
    // grab input value
    const value = e.target.value;
    // regex to match input value
    const regex = new RegExp(value, 'gi');
    // filter matches from placesRaw
    const filtered = pokemonList.filter((pokemon) => {
      return pokemon.name.match(regex);
    });

    // set filteredPlaces to matches
    setFilteredPokemon(filtered);
  }


  return (
    <Container>
      <Navigation />

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
        <Form.Control
          onChange = {handleChange}
          placeholder="Pokemon Name"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
     
      <h1>Pokemon should appear here</h1>
      
      <Row md="auto" className="justify-content-md-center">
      {filteredPokemon.map((pokemon, index) => (
        <Col sm={4} class='p-2'>
          <PokemonCard  key={index} name={pokemon.name} url={pokemon.url}/> 
        </Col>
      )
      )};
      </Row>

    </Container>
  );
}

export { App };