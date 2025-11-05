"use client";

import React from 'react'
import {useState} from 'react'

/**
 * en esta interface se le da un tipo a cada propiedad
 */
interface PokemonData {
  name: string;
  id: number;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
}

interface PokemonCardProps {
  pokemonData: PokemonData;
}

export default function PokemonCard({pokemonData}: PokemonCardProps){

  const [isShiny,setIsShiny] = useState(false)
  if(!pokemonData){
    return <h1>Cargando pokemon...</h1>
  }

  return(
  <div className='bg-emerald-50 rounded-lg -p4 border border-emerald-600'>
    
    {/* DIV para el recuadro de cada pokemon */}
    <div className='bg-white mx-4 my-6 py-1 px-6'>
    <img src={isShiny ? pokemonData.sprites.front_shiny : pokemonData.sprites.front_default} 
    alt="pokemon image"
    className='w-full h-48 object-cover' ></img>

      <h2 className='text-black text-center font-semibold capitalize'> 
        {pokemonData.name}
      </h2>

      <p className='text-black text-center'> N.º {pokemonData.id}</p>

      <p className='text-black'> altura: {pokemonData.height} m</p>

      <p className='text-black'> peso: {pokemonData.weight} kg</p>

      <p className='text-black'> experiencia: {pokemonData.base_experience} XP</p>

      <div className='flex justify-center mt-4'> 
        <button className='bg-emerald-600 rounded-lg py-2 px-4 text-white font-semibold shadow-md hover:bg-emerald-700'
        onClick={() => setIsShiny(!isShiny)}> 
          Version Shiny
        </button>
      </div>

    </div>

  </div>
  )
}