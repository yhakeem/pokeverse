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

## Part 2: Pokemon Details Page
**GOAL**: By the end of this section, clicking on a single Pokemon should navigate to that pokemon’s Details page and display all of their stats!

![Part 2 Exemplar](https://user-images.githubusercontent.com/44912347/203079828-4daf67a2-d45b-4e7f-8fe3-9329aff9d2c4.gif)

1. Continue from your Pokeverse repo that you used in the last section and checkout a new branch:
    - To checkout a new branch, run the following command:
    ```sh
    git checkout -b adds-react-router
    ```
    - This will create a new branch named `”adds-react-router”` and then switch your local branch version to the new branch. When you’re done with this lesson feel free to merge your new branch into `main` or better yet - submit a Pull Request to your repo and review your code yourself and then merge it in! 🚀
2. Install React Router:
```sh
npm i react-router-dom@6
```
3. Create a new directory `src/routes/` and in it create a file called `Home.js`
```sh
mkdir src/routes/
touch src/routes/Home.js 
```
4. Move almost everything out of App.js into routes/Home.js EXCEPT:
    - The initial `useEffect` that fetches all of the pokemon
    - The `pokemonList` state
    - The container `div` and `<Navigation />`
5. `Home` should expect the `pokemonList` array as a prop - and will handle the searching and filtering of the `filteredPokemon` array.
6. Create a new file `src/routes/PokemonDetails.js`. This component will display all of the pokemon's stats! We'll come back to this component later.
7. In `App` set up a `BrowserRouter` that wraps everything that's left in the component.
8. Inside of the `<BrowserRouter>`, below `<Navigation />`, add a `<Routes>` component.
9. Inside of `Routes`, add 2 routes:
    - One with a path of `"/"` that renders the newly crated `Home` component and passes `pokemonList` to it
    - The other with a path of `"/:name"` that renders the newly created PokemonDetails component. Notice the `:` before name, this is a special syntax for URL params, we'll be able to access the value of name later!
10. Inside of the `PokemonDetails` component:
    - Add a new state of pokemon with initial value of `null`
    - Import and call `useParams`. This is how we'll access that `name` param we added earlier!
    ```javascript
    const params = useParams();
    ```
    - Inside of a `useEffect`, `fetch` all of the details about this pokemon using the name from the params and then `setPokemon` with the fetched data.
    ```plaintext
    https://pokeapi.co/api/v2/pokemon/${params.name}
    ```
    - Since we'll be waiting for data to be fetched, we can conditionally render the page! To do this we can add 2 separate `return statements`. The first will be wrapped in an if statement
    ```javascript
      if (!pokemon) {
        return <>loading...</>;
      }

    return (
      // ... the rest of the component here
    )
    ```
11. Now let's add all of the stats about the pokemon like such: 
```plaintext
height: {pokemon.height}
weight: {pokemon.weight}
abilities: iterate over pokemon.abilities, and for each ability render the ability.ability.name
types: iterate over pokemon.types and for each type render the type.type.name
stats: iterate over pokemon.stats and for each stat render the stat.stat.name and stat.base_stat
```
12. Finally, let's link to the newly created route and component! In `PokemonCard.js`, wrap the `{name}` of the Pokemon with a `<Link>` with a to value of `/${name}`
```jsx
<Link to={`/${name}`}>
  {name}
</Link>
```
13. **BONUS #1**: Right now `PokemonDetails` is probably just plain text, and pretty boring looking. Since we already have React Bootstrap installed, check out the `Components` section of [the React Bootstrap docs](https://react-bootstrap.github.io/getting-started/introduction/) and see how you can style the page! 
14. **BONUS #2**: Right now the All Pokemon link works like a normal anchor tag (when clicked the page loads/refreshes), but we want to use React Router, with no page refresh! Convert the `Nav.Link` to use the properties of the `Link` component by passing it the `as={Link}` prop, and switch out the `href` for a to prop. The [react-bootstrap docs](https://react-bootstrap.github.io/components/navs/) have examples of other components like `Nav.Item` using the `as` prop.

## Part 3: Add Context
We will be updating our existing Pokeverse application with the following:
- Each pokemon card should have an “Add to Favorites” button.
- The pokemon that have been added to favorites can be viewed navigating to the new route, `/favorites`. 
- The favorites will be stored in context, in addition to `setFavorite` and `removeFavorite` functions to update the favorites list.

![Part 3 Exemplar](https://user-images.githubusercontent.com/44912347/203085213-2b3bafb1-a22e-4437-b195-edc5812dd27e.gif)
1. Continue from your Pokeverse repo you already have and checkout a new branch:
    - `git checkout -b adds-context`
    - When you’ve finished, merge your new branch into `main` or better yet - submit a Pull Request!
2. In `FavoritesProvider.js` pass a value to the `Provider` giving access to `favorites`, `addFavorite`, and `removeFavorite`
3. In `App.js` wrap the returned component in the `FavoritesProvider` imported from `FavoritesProvider.js`
4. Create a new file in routes called `Favorites.js`. For now you can just export an empty React component. We’ll come back to this file later. 
5. Add a route to `/favorites`
    - Back in `App` add a new route with the path `’/favorites’` and the element of `<Favorites />` (of course, after importing Favorites). That’s it for `App.js`!
    - In `Navigation` add another `NavLink` to `’/favorites’` with the text of something like “My Favorites” or “My Deck”
6. Connect the addFavorite to PokemonCard!
    - First, import `FavoritesContext` from ’FavoritesProvider’ as well as `useContext` from ’react’.
    - Destructure `addFavorite` out of context
    ```javascript
    const { addFavorite } = useContext(FavoritesContext);
    ```
    - Import Button from Bootstrap
    - Beneath the  `<Card.Text>` section, add a `<Button>` with an `onClick` that when clicked calls `addFavorite` and pass the name to it.
    ```jsx
    <Button variant="primary" onClick={() => addFavorite(name)}>
      Add to Favorites
    </Button>
    ```
7. Back in `Favorites`, follow the same pattern from PokemonCard to pull out favorites from context.
    - Destructure favorites
    - Map over favorites and for each favorite render a `<PokemonCard>` passing the prop of `name={favorite}`
    - **TIP**: To get the styling similar to what we have on the main page, take a look at how you’re rendering all of the cards in `Home.js`. It should be structured something like this: `Container` > `Row` > `1 Col` for each PokemonCard
8. Try navigating to `/favorites` now - you should see any pokemon that you clicked “Add to Favorites” here! You also may notice that you can click “Add to Favorites” over and over and get the same pokemon duplicated over and over. Take a look at the first item of the Bonus to fix that!
9. **BONUS**: After someone clicks “Add to Favorites”, they shouldn’t be able to click that button again. We already have a `removeFavorite` function available in Context that can be helpful here!
    - If a pokemon is already in `favorites`, instead of rendering an Add to Favorites button on the PokemonCard let’s render a Remove from Favorites button!
    - Try using a ternary for this
    ```jsx
    {someExpression ? (
    <RenderThisThingIfSomeExpressionIsTruthy />
    ) : (
        <RenderThisThingIfSomeExpressionIsFalsey />
    )}

    // or, in plain english:
    {ifThis ? (
        then this
    ) : (
        else this
    )}
    ```
    - Try [utilizing includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) for this. If favorites includes name, then render an “Add to Favorites” button, else render a “Remove from Favorites” button.
    
---

> Made with ♥️ at [Multiverse](https://www.multiverse.io/en-US)
