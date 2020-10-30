const express = require('express');
const router = express.Router();

//Adds Pokemon Model 
//const pokemon = require("../pokemon.js");
const Pokemon = require('../models').Pokemon;
const Player = require('../models').Player
const Team = require('../models').Team


//GET ==> This is our homepage
//Add index route
// router.get("/", (req,res) => {
//     res.render("index.ejs",{
//         pokemon: pokemon,
//     });
// });
router.get("/", (req, res) => {
  Pokemon.findAll().then((pokemons) => {
    res.render("index.ejs", {
      pokemons: pokemons,
    });
  });
});

  //GET ==> show form to user
  router.get('/new', (req, res)=>{
    res.render('new.ejs');
    });

// GET ==> show
//   router.get('/:index' , (req, res) =>{
//     res.render('show.ejs',{
//         pokemon:pokemon[req.params.index]
// });
//   });
  router.get("/:id", (req, res) => {
    Pokemon.findByPk(req.params.id).then((pokemons) => {
      res.render("show.ejs", {
        pokemons: pokemons,
      });
    });
  });
// Post==> Create New Pokemon
//   router.post('/',(req, res)=>{
//     pokemon.push(req.body);
//     res.redirect('/pokemon');
// });
router.post("/", (req, res) => {
  Pokemon.create(req.body).then((newPokemon) => {
    res.redirect("/pokemon");
  });
});
//Delete
  // router.delete('/:index', (req, res) => {
  //   pokemon.splice(req.params.index, 1); //remove the item from the array
  //   res.redirect('/pokemon');  //redirect back to index route
  // });

  router.delete("/:id", (req, res) => {
    Pokemon.destroy({ where: { id: req.params.id } }).then(() => {
      res.redirect("/pokemon");
    });
  });

 //Edit
// router.get('/:index/edit', function(req, res){
// 	res.render(
// 		'edit.ejs', //render views/edit.ejs
// 		{ //pass in an object that contains
// 			pokemon: pokemon[req.params.index], //the pokemon object
// 			index: req.params.index //... and its index in the array
// 		}
// 	);
// });


// router.put('/:index', (req, res)=> {
//     pokemon[req.params.index] = req.body; //in our pokemon array, find the index that is specified in the url (:index).  Set that element to the value of req.body (the input data)
//     res.redirect('/pokemon'); //redirect to the index page
// });

router.get("/:id/edit", function (req, res) {
  Pokemon.findByPk(req.params.id).then((pokemons) => {
    res.render("edit.ejs", {
      pokemons: pokemons,
    });
  });
});

router.put("/:id", (req, res) => {
  Pokemon.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  }).then((pokemons) => {
    res.redirect("/pokemon");
  });
});
module.exports = router;