const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const db = mongoose.connect("mongodb://127.0.0.1:27017/fifapp");
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/fifapi', () => {
  console.log("Connected to MongoDB");
});

const TeamModel = require("./models/team");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// app.get('/tipocambio',  (req, res) => {
//   // generate a response
//   res.json({
//     "TipoCompraDolares" : "608",
//     "TipoVentaDolares" : "621",
//     "TipoCompraEuros" : "731.85",
//     "TipoVentaEuros" : "761.9"
//   });
// });
//GET
app.get("/", (req,res)=>{
  res.send("Welcome to FifaApi")
})
//POST
app.post('/team', function (req, res) {

  const team = new TeamModel();

  team.name = req.body.name;
  team.description = req.body.description;;
  if (team.name && team.description) {
    team.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the team', err);
        res.json({
          error: 'There was an error saving the team'
        });
      }
      res.status(201);//CREATED
      res.header({
        'location': `http://localhost:3000/team/?id=${team.id}`
      });
      res.json(team);
    });
  } else {
    res.status(422);
    console.log('error while saving the team')
    res.json({
      error: 'No valid data provided for team'
    });
  }
});

//PATCH
app.patch('/team/:id',(req,res) =>{
  const idTeam = req.params.id;
  console.log(idTeam)
  if (idTeam) {
    TeamModel.findById(idTeam,(err, team)=> {
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
        res.json(team);
      });
    });
  } else {
    res.status(404);
    console.log('El equipo no existe')
  }
});
//DELETE
app.delete('/team/:id',(req,res) =>{
  const team = new TeamModel();
  console.log(req.params.id)
  const idTeam = req.params.id;
  if(idTeam){
    TeamModel.findById(idTeam, (err, team)=>{
      if(err){
        res.status(500);
        console.log("No se encuentra el equipo a consulta", err);
        res.json({error: "No existe el equipo-"})
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
    console.log('Error, indique un id')
  }
})


const Puerto = 3000;
app.listen(Puerto, ()=> {
  console.log(`Server escuchando por el puerto:${Puerto}`)
})


