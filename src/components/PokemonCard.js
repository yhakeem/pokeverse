import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'



function PokemonCard({ url, name }) {
  const [images,setImages] = useState('');
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    fetch(url)
    .then((res) => res.json())
    .then((pokemon) => {
      setImages(pokemon.sprites.front_default);
      setAbilities(pokemon.abilities);
    });
  }, [url]);

  // console.log(images);
  // console.log(abilities);


  return (
    
      <Card style={{ width: '16rem'}}>
        <Card.Img src={images}></Card.Img>
        <Card.Title>{name}</Card.Title>
        <Card.Text as="div">
          <ul>
            {abilities.map(pokemonAbility => 
              <li key={pokemonAbility.ability.name}> {pokemonAbility.ability.name}</li>
            )}
          </ul>
        </Card.Text>
      </Card>
  );
}

export { PokemonCard };
