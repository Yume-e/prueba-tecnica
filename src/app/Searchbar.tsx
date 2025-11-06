"use client";

import { useState } from 'react' //va a manejar los resultados similares a la busqueda
import { AiOutlineSearch } from 'react-icons/ai'

interface PokemonListItem {
  id: number;
  name: string;
};

interface SearchbarProps {
  pokemonList: PokemonListItem[];
};

const Searchbar = ({ pokemonList }: SearchbarProps) => {
  const [activeSearch, setActiveSearch] = useState<PokemonListItem[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    /**
     * e.target.value aguarda el texto ingresado
     * toLowerCase devuelve el texto ingresado nen minusculas
     */
    const query = e.target.value.toLowerCase();

    /*
    * si el input esta vacio se estara
    * limpiando la lista de resultados
    */
    if (query === '') {
      setActiveSearch([]);
      return;
    }

    const filtered = pokemonList
      .filter(p => p.name.toLowerCase().includes(query))//busca coincidencias con los nombres
      .slice(0, 8);//muestra los primeros 8 resultados similares
    setActiveSearch(filtered);
  };

  return (
    <form className='w-[900px] relative'>
      <div className='relative'>

        <input
          type='search'
          placeholder='Buscar Pokémon...'
          className='w-full p-4 rounded-full bg-teal-800 text-white'
          onChange={handleSearch} /** cada vez que se escrive algo se llama al metodo */
        />

        <button className='absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-teal-400 rounded-full'>
          <AiOutlineSearch />
        </button>

      </div>

      {
        activeSearch.length > 0 && (
          <div className='absolute top-20 p-4 bg-teal-400 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2'>
            {
              activeSearch.map(p => ( /** recorre resultado y lo mostrara como span */
                <span key={p.id}>{p.name}</span>
              ))
            }
          </div>
        )
      }
    </form>
  );
};

export default Searchbar;