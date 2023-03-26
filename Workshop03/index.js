import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./modelsGraphql/graphql.js";
import { getAllPlayers, getOnePlayers, getPlayerByName, orderPlayer }from "./controllers/player.js";
import { getTeamByName, getTeams }from "./controllers/team.js";
import {dbConnect} from "./config/mongo.js";

//De donde se sacan los datos

const resolvers = {
  Query: {
    players: async () => {
      return await getAllPlayers();
    },
    player: async (parent, args, context, info) => {
        return await getOnePlayers(args.id);
      },
      playerByName: async (parent, args, context, info) => {
        return await getPlayerByName(args.name, args.limit)
      },
      playerOrder: async(parent, args, context, info) => {
        return await orderPlayer(args.order)
      },
      teams: async() => {
        return await getTeams();
      }, 
      teamsOrder: async()=> {
        return await getTeamByName();
      }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
dbConnect();
