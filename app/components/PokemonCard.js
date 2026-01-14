
'use client'; 

import { useState } from 'react';

export default function PokemonCard({ pokemon }) {
  const [showStats, setShowStats] = useState(false);
  const [showAbilities, setShowAbilities] = useState(false);

  const typeNames = pokemon.types.map(t => t.type.name).join(', ');

  return (
    <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-3 shadow-md bg-white dark:bg-gray-800 flex flex-col items-center hover:scale-105 transition-transform hover:shadow-lg">
      {/* Image */}
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-24 h-24 object-contain mb-2 drop-shadow-md"
      />

      {/* Name */}
      <h2 className="text-lg font-bold capitalize text-gray-900 dark:text-white mb-1">
        {pokemon.name}
      </h2>

      {/* Type */}
      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">Type: {typeNames}</p>

      {/* Stats Button */}
      <button
        onClick={() => setShowStats(!showStats)}
        className="w-full py-1.5 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition text-xs mb-1"
      >
        {showStats ? 'Hide Stats' : 'Show Stats'}
      </button>

      {/* Stats Panel */}
      {showStats && (
        <div className="mt-2 w-full p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs text-gray-800 dark:text-white">
          <strong>Stats:</strong>
          <ul className="space-y-1 mt-1">
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                <strong className="capitalize">{stat.stat.name}:</strong> {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Abilities Button */}
      <button
        onClick={() => setShowAbilities(!showAbilities)}
        className="w-full py-1.5 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition text-xs"
      >
        {showAbilities ? 'Hide Abilities' : 'Show Abilities'}
      </button>

      {/* Abilities Panel */}
      {showAbilities && (
        <div className="mt-2 w-full p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs text-gray-800 dark:text-white">
          <strong>Abilities:</strong>
          <ul className="space-y-1 mt-1">
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name} className="capitalize">
                <strong>{ability.ability.name}</strong>
                {ability.is_hidden && ' (Hidden)'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}