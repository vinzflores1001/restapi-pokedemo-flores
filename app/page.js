// app/page.js
'use client';

import { useState, useEffect } from 'react';
import PokemonCard from "./components/PokemonCard";

async function fetchPokemon(limit = 151) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const list = await res.json();

  const detailed = await Promise.all(
    list.results.map(async (p) => {
      const res = await fetch(p.url);
      return res.json();
    })
  );

  return detailed;
}

export default function Page() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const itemsPerPage = 12;

  useEffect(() => {
    async function loadPokemon() {
      const data = await fetchPokemon(151); // Gen 1 Pokémon
      setPokemonData(data);
    }
    loadPokemon();
  }, []);

  // Filter Pokémon by name
  const filteredPokemon = pokemonData.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPokemon.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <main className="min-h-screen p-4 font-[family-name:var(--font-press-start)] transition-colors duration-300">
      {/* Header */}
      <header className="bg-red-600 text-white p-3 mb-4 rounded flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* Pokéball Icon */}
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
            alt="Pokéball"
            className="w-8 h-8"
          />
          <h1 className="text-xl font-bold">Pokémon Dashboard</h1>
        </div>

        {/* Dark Mode Toggle - Pokéball / Ultra Ball */}
        <button
          onClick={toggleDarkMode}
          className="p-1 rounded-full hover:bg-gray-800 transition"
        >
          <img
            src={
              isDarkMode
                ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png"
                : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
            }
            alt={isDarkMode ? "Ultra Ball" : "Pokéball"}
            className="w-8 h-8 transition-transform duration-300 hover:scale-110"
          />
        </button>
      </header>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white text-black"
        />
      </div>

      {/* Grid of Pokémon Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentItems.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600 transition"
        >
          Previous
        </button>
        <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600 transition"
        >
          Next
        </button>
      </div>
    </main>
  );
}