'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Pokemons",
      [
        {
          name: "Bulbasaur",
          img: "http://img.pokemondb.net/artwork/bulbasaur.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 1
        },
        {
          name: "Ivysaur",
          img: "http://img.pokemondb.net/artwork/ivysaur.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 1
        },
        {
          name: "Venusaur",
          img: "http://img.pokemondb.net/artwork/venusaur.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 1
        },
        {
          name: "Charmander",
          img: "http://img.pokemondb.net/artwork/charmander.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 1
        },
        {
          name: "Charizard",
          img: "http://img.pokemondb.net/artwork/charizard.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 1
        },
        {
          name: "Squirtle",
          img: "http://img.pokemondb.net/artwork/squirtle.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 1
        },
        {
          name: "Wartortle",
          img: "http://img.pokemondb.net/artwork/wartortle.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 1
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
