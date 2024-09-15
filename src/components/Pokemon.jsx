import { useEffect, useState } from "react"
import PokemonCard from "./PokemonCard"

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true) 
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
const API = 'https://pokeapi.co/api/v2/pokemon?limit=50'
const fetchPokemonData = async () => {
  try {
    const res = await fetch(API)
    const data = await res.json()
    setLoading(false)

    const fetchUrlName = data.results.map( async(item)=>{
      const res = await fetch(item.url)
      const data = await res.json()
      return data
    })
    const detailedResponse = await Promise.all(fetchUrlName)
    console.log(detailedResponse)
    setPokemon(detailedResponse)

  } catch (error) {
    console.log(error) 
    setLoading(false)
    setError(error)
  }

}
useEffect(() =>{
  fetchPokemonData()
},[])
const handleSearchInput = (event) =>{
  setSearch(event.target.value)
}
const searchData = pokemon.filter((pokemonItem) => pokemonItem.name.toLowerCase().includes(search.toLowerCase()))
if(loading)
  return(
<div>
  <h1>...Loading</h1>
</div>
  )
  if(error)
    return(
  <div>
    <h1>404 Not Found</h1>
  </div>
    )
  return (
    <>
    <section className="container">
      <header>
        <h1>Let's Catch Pokemon</h1>
      </header>
      <div className="pokemon-search">
        <input type="text" placeholder="Search Pokemon" value={search} onChange={handleSearchInput}/>
      </div>
      <div>
        <ul className="cards">
          {searchData.map((curPokemon) =>{
          return  <PokemonCard key={curPokemon.id} pokemonData={curPokemon}/>  
          })}
        </ul>
      </div>
    </section>
    </>
  )
}

export default Pokemon

