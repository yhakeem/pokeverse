![logo](https://user-images.githubusercontent.com/44912347/203076292-5dfc6571-420c-4366-9dda-a0410df82b62.jpg)

# Pokeverse

Over the next few weeks we’ll be building a digital Pokemon (simplified) card game. Complete with features like:
- Viewing and searching Pokemon “cards”
- Viewing and comparing stats
- Adding Pokemon cards to a deck
- Opportunities for you to expand functionality like dueling 2 Pokemon against each other. 

## Setup

- Fork this repo, clone to your desktop, and install dependencies:
  ```sh
  npm install
  ```
- Start the server, and navigate to `localhost:1234`
  ```sh
  npm run start
  ```
- Lint `.js` and `.jsx` files
  ```sh
  npm run lint
  ```

## Part 1: Fetch and Search
**GOAL**: Using the React Bootstrap CSS Framework and the pokeapi:
- Fetch and render a list of 150 Pokemon cards - each with limited information (picture, name, abilities).
- Add a search feature to find a specific Pokemon.

![Pokeverse Week 1 finished project](https://user-images.githubusercontent.com/44912347/203077513-485464b8-607f-429a-8e12-033b566f2abd.gif)

Use the following instructions to guide your coding:
1. Get the Pokemon!
    - Fetch using the provided `pokeApi` url and set the returned data on state. 
    - **NOTE**: The API returns a `data.results` array of objects, each one containing just an ID, a Name, and a URL. That returned URL will be used to fetch the rest of the data about the Pokemon. [Here is an example](https://gist.github.com/CalamityAdam/06b998539c45f4fb8c5c5afab7a97154#httpspokeapicoapiv2pokemonlimit5) `response` from the API.
2. Iterate over the `pokemonList` array and for each pokemon render a single PokemonCard passing the name and url to the card.
3. Inside `PokemonCard` fetch the provided URL and set the returned data from this URL on state
    - Note the return of this URL is vastly different from the return of the above `pokeApi` URL. This URL will return all the data about a specific Pokemon.
    - For now, we’ll specifically want to pay attention to `sprites` and `abilities`.
    - [Here is an example](https://gist.github.com/CalamityAdam/06b998539c45f4fb8c5c5afab7a97154#httpspokeapicoapiv2pokemon1-abbreviated) of the response from this URL    
4. Import a `Card` component from [react-bootstrap](https://react-bootstrap.github.io/components/cards/), and render it, including the following pieces:
    - `Card.Img` - use `pokemon.sprites.front_default` as the img’s src
    - `Card.Title` with the `name` of the pokemon
    - `Card.Text` with a `ul` of all of that pokemon’s abilities
    - At this point, we should see a list of all the pokemon cards in the UI, though it may be ugly and/or unstyled
5. In `App.js` add an `InputGroup` with a `FormControl` to allow user to enter pokemon name (see [react-bootstrap InputGroup docs](https://react-bootstrap.github.io/forms/input-group/))
6. Connect an `onChange` that will filter the list of pokemon
    - There’s a few ways to handle this, refer to previous exercises for inspiration or come up with another way on your own!
    - At this point the list should be searchable
7. Style the page a little bit more, try to center things and render the whole page in a `Container` and many `Row`/`Col`
8. Save and push your changes back to your GitHub repository!

---

> Made with ♥️ at [Multiverse](https://www.multiverse.io/en-US)
