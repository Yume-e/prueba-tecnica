"use client";

import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import { FaX } from "react-icons/fa6";

export default function Home() {

  //aqui defino los tipos de datos de un poke
  type PokemonData = {
    name: string;
    id: number;
    height: number;
    weight: number;
    base_experience: number;
    sprites: {
      front_default: string;
      front_shiny: string;
    };
    types: string[];
  }

  const [pokemonData, setPokemonData] = useState<any[]>([]) //lista de pokemon
  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151'//Se define la URL base
  const [filtred, setFiltred] = useState(false);//busqueda de pokemon
  const [showModal, setShoModal] = useState(false);//muestra una pantalla al presionar un pokemon
  
  //paginacion de la pagina
  const [page, setPage] = useState(0);
  const pokesPerPage = 21; //21 pokemones por cada pagina

  const [currentPokemon, setCurrentPokemon] = useState<PokemonData>({
    //current: actual pokemon
    name: "",
    base_experience: 0,
    height: 0,
    id: 0,
      sprites: {
        front_default: "string",
        front_shiny: "",
      },
    weight: 10,
    types: []
  });

  /**
   * funcion para cargar los datos de la API
   */
  async function getPokes() {
    const response = await fetch(`${BASE_URL}`)//llama a la API
    const data = await response.json()

    let list: any[] = [];
    if (Array.isArray(data.results)) {

      data.results.forEach((e: any) => {
        list.push({
          name: e.name,
          url: e.url
        })
      })

    }
    setPokemonData(list);//lo guarda en el metodo "setPokemonData"
  }

  useEffect(() => {
    getPokes().then((e) => {
    })
  }, [])

  const [loadingPokemon, setLoadingPokemon] = useState(false);
  
  /**
   * funcion para mostrar los datos delp okemon
   * en el modal
   */
  async function showPokeModal(name: string) {
    setShoModal(true);
    setLoadingPokemon(true);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const data = await response.json()

    console.log(data)

    const tipos = data.types.map((t: any) => t.type.name);

    setCurrentPokemon({
      name: data.name,
      id: data.id,
      weight: 10,
      height: data.height,
      base_experience: data.base_experience,
      sprites: {
        front_default: data.sprites.front_default,
        front_shiny: data.sprites.front_shiny
      },
      types: tipos,
    })
    setLoadingPokemon(false);

    }

    const [query, setQuery] = useState("");
    //query: consulta
    useEffect(() => {
      if (query !== "") {//si la consulta es diferente devuelve true
        setFiltred(true);
      } else {
        setFiltred(false);//si la consulta no es diferente devuelve false
      }
    }, [query])

  return (
    <div className='bg-emerald-100 shadow-xl py-4 mb-8'>

      <div className='bg-teal-600 mx-4 my-6 py-8 px-6 rounded-lg'>
        <h1 className='text-3xl font-bold text-center text-white'>
          Pokedex de Kanto
        </h1>
      </div>

      <div className='m-8 flex flex-col max-w-lg mx-auto bg-teal-500 hover:bg-teal-600 text-white py-4 px-6 rounded-lg'>

        <form onSubmit={(e) => e.preventDefault()} className='border border-teal-100'>
          <input type="text" className='w-full max-w-xl border border-teal-300 p-3 rounded-md shadow-sm'
          
            onChange={(e) => {
              setQuery(e.currentTarget.value);
            }}
            
            placeholder='Buscar pokemon...'/>
        </form>

      </div>

      <div className='px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {pokemonData
          .slice(page * pokesPerPage,(page + 1) * pokesPerPage)
          .map((pokemon) => {

            if (!filtred) {
              return (
                // <PokemonCard key={index} pokemonData={pokemon} />
                <button className="border p-4 rounded" key={pokemon.name} onClick={async (e) => {
                  console.log("click");
                  await showPokeModal(pokemon.name)
                }}>
                  <label htmlFor="">{pokemon.name}</label>

                </button>
              )
            } else {

              if (String(pokemon.name).includes(query)) {
                return (
                  <button className="border p-4 rounded" key={pokemon.name} onClick={async (e) => {
                    console.log("click");
                    await showPokeModal(pokemon.name)
                  }}>
                    <label htmlFor="">{pokemon.name}</label>

                  </button>
                )
              }
            }
          })
          }
        </div>

        <div className="flex justify-center gap-4 my-8">
          <button className='bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg'
            onClick={() => setPage(page > 0 ? page - 1 : 0)}> Anterior   
          </button>

          <span> Página ({page + 1}) de 8</span>

          <button className='bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg'
            onClick={() => setPage(page + 1)}> Siguiente 
          </button>

        </div>

      </div>

      {
        showModal && (
          <div className="!fixed z-100 w-screen h-screen top-0 righ-0 flex items-center justify-center">
            <div className="w-100 h-fit bg-green-200 p-5 border-3">

              <div className="w-full flex justify-end items-center">
                <button className="border rounded-full cursor-pointer p-2 text-xl" onClick={(e) => setShoModal(false)}><FaX /></button>
              </div>

              {
                loadingPokemon ? (
                  <div>
                    Cargando...
                  </div>
                ) : (
                  <div>
                    <PokemonCard key={currentPokemon?.name ?? ""} pokemonData={currentPokemon} />
                  </div>
                )
              }

            </div>
          </div>
        )
      }
  </div>
  );
}