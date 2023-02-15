const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamShema = new Schema({
  name: { type: String },
  description: { type: String }
});
const TeamModel = mongoose.model('teams', TeamShema);

module.exports = {
  "model": TeamModel,
  "schema": TeamShema
}


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const teamSchema = new Schema({
//   name: { type: String },
//   description: { type: String }
// });

// module.exports = {
//   "model" : mongoose.model('teams', teamSchema),
//   "schema": teamSchema
// }