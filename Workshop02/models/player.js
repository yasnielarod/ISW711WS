const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const team = require('../models/team');


const playerSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  age: { type: String },
  team: [team.schema]
});

const playerModel= mongoose.model('players', playerSchema);

module.exports = {
  "model": playerModel,
  "schema": playerSchema
}