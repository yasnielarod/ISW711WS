const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const db = mongoose.connect("mongodb://127.0.0.1:27017/fifapp");
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/fifapi', () => {
  console.log("Connected to MongoDB");
});
const Player = require('./models/player.js');
const Team = require('./models/team.js');

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req,res)=>{
  res.send("Welcome to FifaApi")
})

//Get player
app.get('/players',(req,res)=>{
  Player.model.find((err,players)=>{
    if(err){
      res.status(422);
      console.log('Error al obtener los jugadors', err);
      res.json({
        error: 'Error al obtener los jugadores'
      });
    }else{
      console.log('Respuesta exitosa');
      res.status(201);
      res.json({data: players})
    }
  });
});

//POST Player
app.post('/player',  (req, res)=> {
  const player = new Player.model();
  player.first_name = req.body.first_name;
  player.last_name = req.body.last_name;
  player.age = req.body.age;
  //find the team
  console.log('team:', req.body.team);
  const modelTm = new Team.model();
   Team.model.findById(req.body.team, (error,teamFound) => {
    console.log('error:',error);
    console.log('team:', teamFound);
    if(error) {

    }
    if (teamFound) {
      player.team = teamFound;
    }
  });
  if (player.first_name && player.last_name) {
    player.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the player', err);
        res.json({
          error: 'There was an error saving the player'
        });
      }
      console.log("Hola" + player)
      res.status(201);//CREATED
      res.header({
        'location': `http://localhost:3000/player/?id=${player.id}`
      });
      res.json(player);
    });
  } else {
    res.status(422);
    console.log('error while saving the player')
    res.json({
      error: 'No valid data provided for player'
    });
  }
});
//Patch player
app.patch('/player/:id', (req,res)=>{
  const idPlayer = req.params.id;
  if(idPlayer){
    Player.model.findById(idPlayer,(err,player)=>{
      if(err){
        console.log("Error al leer el id");
        res.status(404);
        res.json({ error: "Jugador no existe" })
      }
      player.first_name = req.body.first_name ? req.body.first_name : player.first_name;
      player.last_name = req.body.last_name? req.body.last_name: player.last_name;
      player.age = req.body.age? req.body.age: player.age;
      player.team = req.body.team? req.body.team: player.team;
      player.save((err)=>{
        if(err){
          console.log('Error al editar los cambios');
          res.status(422);
          res.json({
            err: "error al editar"
          })
        }
        console.log('Se edito correctamente');
        res.status(201);
        res.json({
          message: "Se editaron los datos correctamente"
        });
      });

    })

  }else{
    console.log('Id del jugador no existe');
    res.status(404);
    res.json({ error: "Jugador no existe" });
  }
});

//DELETE Player
app.delete('/player/:id',(req,res) =>{
  const idPlayer = req.params.id;
  if(idPlayer){
    Player.model.findById(idPlayer, (err, player)=>{
      if(err){
        res.status(500);
        console.log("No se encuentra el jugador a consulta", err);
        res.json({error: "No existe el jugador"})
      }
      if(player){
        player.remove((err)=>{
          if(err){
            res.status(500);
            console.log('Problemas al borrar el equipo');
          }
          res.status(204);
          console.log("El jugador fue eliminado")
        })
      }else{
        res.status(404);
        console.log('No se consulto de forma correcta el jugador')
      }
    })
  }else{
    res.status(404);
    console.log('Error, id no encontrado')
  }
})



//-----------TEAM------------
//team get
app.get('/teams',(req,res)=>{
  Team.model.find((err,teams)=>{
    if(err){
      res.status(422);
      console.log('Error al obtener los equipos', err);
      res.json({
        error: 'Error al obtener los equipos'
      });
    }else{
      console.log('Respuesta exitosa');
      res.status(201);
      res.json({data: teams})
    }
  });
});
//Team post
app.post("/team", (req,res)=>{
  const team = new Team.model();
  team.name = req.body.name;
  team.description = req.body.description;
  if(team.name && team.description){
    team.save((err)=>{
      if(err){
        res.status(244);
        console.log("Error al registrar el equipo");
        res.json({
          error: "Error al guardar un equipo"
        })
      }
      //Se guarda
      res.status(201);
      console.log("El equipo se ha guardado correctamente");
      res.header({
        'location': `http://localhost:3000/team/?id=${team.id}`
      });
    });
  }else{
    res.status(404);
    console.log(res.status, "Error al guardar los datos")
  }
});


//TEAM PATCH
app.patch('/team/:id',(req,res) =>{
  const idTeam = req.params.id;
  if (idTeam) {
    console.log(Team.model)
    Team.model.findById(idTeam,(err, team)=> {
      if (err) {
        res.status(404);
        console.log('error al realizar la consula', err)
        res.json({ error: "Equipo no existe" })
      }
      //obtiene el obj y se actualiza
      team.name = req.body.name ? req.body.name : team.name;
      team.description = req.body.description? req.body.description : team.description;
      team.save(function (err) {
        if (err) {
          res.status(422);
          console.log('Error al guardar un equipo', err)
        }
        //Respuesta correcta
        res.status(200);
        res.json({team});
      });
    });
  } else {
    res.status(404);
    console.log('El equipo no existe')
  }
});
//TEAM Delete// 
app.delete('/team/:id',(req,res) =>{
  const idTeam = req.params.id;
  if(idTeam){
    Team.model.findById(idTeam, (err, team)=>{
      if(err){
        res.status(500);
        console.log("No se encuentra el equipo a consulta", err);
        res.json({error: "No existe el equipo"})
      }
      if(team){
        team.remove((err)=>{
          if(err){
            res.status(500);
            console.log('Problemas al borrar un equipo');
          }
          res.status(204);
          console.log("El equipo fue eliminado")
        })
      }else{
        res.status(404);
        console.log('No se consulto de forma correcta el equipo')
      }
    })
  }else{
    res.status(404);
    console.log('Error, id no encontrado')
  }
})

// embeded



const Puerto = 3000;
app.listen(Puerto, ()=> {
  console.log(`Server escuchando por el puerto:${Puerto}`)
})


