"use client";

import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import Searchbar from "./Searchbar";

export default function Home() {

  const [pokemonData, setPokemonData] = useState<any[]>([])
  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'//Se define la URL base

  const fetchPokemons = async (id: number) => {
    try{
      const response = await fetch(`${BASE_URL}${id}`)//Esta es la respuesta que nos va a dar el servidor
      const data = await response.json()//Aqui se guarda la respuesta pero convertido en .json y nos permitira manipular la data como un objeto de javascript
      
      setPokemonData((prevPokemonData) => [...prevPokemonData, data])

      console.log(pokemonData)

    } catch (error) {
      console.error('ERROR CON EL FETCH DE POKEMONES')
    }
  }

  const fetchAllPokemons = () => {
    for(let i = 1; i<153; i++){
      fetchPokemons(i)
    }
  }

  useEffect(() => {
    fetchAllPokemons()
    console.log(pokemonData)
  },[])

  useEffect(() => {
    console.log(pokemonData)
  },[pokemonData])

  return (
    <div className='bg-emerald-100 shadow-xl py-4 mb-8'>

      <div className='bg-teal-600 mx-4 my-6 py-8 px-6 rounded-lg'>
        <h1 className='text-3xl font-bold text-center text-white'>
          Pokedex de Kanto
        </h1>
      </div>

      <div className='m-8 flex flex-col justify-center max-w-log'>
        <Searchbar pokemonList={pokemonData}/>
      </div>

      <div className='px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'> 
          {pokemonData.map((pokemon,index) => (
            <PokemonCard key={index} pokemonData={pokemon}/>
          ))
          }
        </div>
      </div>

    </div>
  );
}
