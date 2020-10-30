const express = require("express");
const router = express.Router();
//const players = require("../players");
const Player = require('../models').Player;
const Team = require('../models').Team
const Pokemon = require('../models').Pokemon
const PlayerPokemon = require('../models').playerpokemon

// GET Homepage
router.get("/", (req, res)=> {
    res.render("players/index.ejs")
})

//GET Signup Page
router.get('/signup', function(req, res){
	res.render('players/signup.ejs');
});

//GET Login 
router.get('/login', (req,res) =>{
    res.render('players/login.ejs');
});

//Post Login with if statement if username/password is wrong
// router.post('/login',(req,res)=> {
//     let index = players.findIndex(
//         (player)=> 
//         player.username === req.body.username && player.password === req.body.password
//     );
//     if (index){
//         res.send("User Name or password is incorrect");
//     } else{
//     res.redirect(`/players/profile/${index}`);
//     }
// });

router.post("/login", (req, res) => {
  Player.findOne({
    where: {
      username: req.body.username,
      password: req.body.password,
    },
  }).then((foundUser) => {
    if(foundUser == null){
      res.send("User Name or password is incorrect");
    }else{
    res.redirect(`/players/profile/${foundUser.id}`);
    }
  });
});

// POST Signup Form
// router.post("/", (req, res) => {
//     console.log(req.body);
//     players.push(req.body);
//     res.redirect(`/players/profile/${players.length - 1}`);
//   });

  router.post("/", (req, res) => {
    Player.create(req.body).then((newPlayer) => {
      res.redirect(`/players/profile/${newPlayer.id}`);
    });
  });

  // Get User Profile
// router.get("/profile/:index", (req, res) => {
//     res.render("players/profile.ejs", {
//       player: players[req.params.index],
//       index: req.params.index,
//     });
//   });

  // router.get("/profile/:id", (req, res) => {
  //   Player.findByPk(req.params.id).then((playerProfile) => {
  //     res.render("players/profile.ejs", {
  //       player: playerProfile,
  //     });
  //   });
  // });

  // router.get("/profile/:id", (req, res) => {
  //   Player.findByPk(req.params.id,{
  //     include:[
  //       {
  //         model: Team,
  //         attributes: ["id","name"]
  //       }
  //     ]
  //   }).then((playerProfile) => {
  //     res.render("players/profile.ejs", {
  //       player: playerProfile,
  //     });
  //   });
  // });

  // router.get("/profile/:id", function (req, res) {
  //   Player.findByPk(req.params.id).then((playerProfile) => {
  //     Team.findAll().then((allTeams) => {
  //       res.render("players/profile.ejs", {
  //         player: playerProfile,
  //         teams: allTeams,
  //       });
  //     });
  //   });
  // });
  // router.get("/profile/:id", (req, res) => {
  //   Player.findByPk(req.params.id, {
  //     include: [{ model: Team }, { model: Pokemon }],
  //   }).then((playerProfile) => {
  //     Team.findAll().then((allTeams) => {
  //       console.log(playerProfile);
  //       res.render("players/profile.ejs", {
  //   player: playerProfile,
  //   teams: allTeams,
  //       });
  //     });
  //   });
  // });

  router.get("/profile/:id", function (req, res) {
    Player.findByPk(req.params.id,{include: [{model: Team}, {model: Pokemon}]}).then((playerProfile) => {
      Team.findAll().then((allTeams) => {
        Pokemon.findAll().then((allPokemon)=>{
          console.log(playerProfile);
        res.render("players/profile.ejs", {
    player: playerProfile,
    teams: allTeams,
    pokemons: allPokemon,
        });
      });
    });
  });
});

  // Edit Profile 
// router.put("/profile/:index", (req, res) => {
//     console.log(req)
//     players[req.params.index] = req.body;
//     res.redirect(`/players/profile/${req.params.index}`);
//   });

  
  
  router.put("/profile/:id", (req, res) => {
    console.log('Body',req.body)
    //PlayerPokemon.update(req.body,{ where: {playerid: req.params.id},}),
    Player.update(req.body, {
      where: { 
        id: req.params.id, 
      },
      returning: true,
    }).then((updatedPlayer) => {
      res.redirect(`/players/profile/${req.params.id}`)
    //   Team.findByPk(req.body.team).then((foundTeam) => {
    //     Player.findByPk(req.params.id).then((foundPlayer) => {
    //       Pokemon.findByPk(req.params.pokemons).then((foundPokemon)=>{
    //         foundPlayer.addTeam(foundTeam);
    //         foundPlayer.addPokemon(foundPokemon)
    //         res.redirect(`/players/profile/${req.params.id}`);
    //         console.log('Body'.res.body)
    //       });
    //     });
    //   });
     });
  });

// Delete
// router.delete("/:index", (req, res) => {
//     players.splice(req.params.index, 1); 
//     res.redirect("/players"); 
//   });

  router.delete("/:id", (req, res) => {
    Player.destroy({where: {id: req.params.id} }).then(() =>{
      res.redirect("/players");
    });
    });

module.exports = router;