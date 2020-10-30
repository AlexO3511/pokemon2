const express = require('express');
const app = express ();
app.use(express.static("public"));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.use(express.urlencoded({ extended: true }));
app.use("/", require("./controllers/pokemonController.js"));
app.use("/players", require("./controllers/playersController.js"));



var port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("listening");
});