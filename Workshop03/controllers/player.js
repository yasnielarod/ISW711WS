import {playerModel} from "../models/player.js";


export const getAllPlayers = async()=> {
    try {
        const players = await playerModel.find({});
        if(!players) return null;
        return players;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getOnePlayers = async(id)=> {
    try {
        const player = await playerModel.findById(id);
        if(!player) return null;
        return player;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getPlayerByName = async(name, limit = 5)=> {
    try {
        const player = await playerModel.find({first_name: { $regex: '.*' + name + '.*' }}).limit(limit);
        if(!player) return null;
        return player;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const orderPlayer = async(order) => {
    try {
        const players = await playerModel.find({});
        if(!players) return null;
        if(order.toUpperCase() === "ASC"){ //a -z
            return players.sort((a,b) => a.first_name.localeCompare(b.first_name));
        }
        if(order.toUpperCase() === "DESC"){ //z-a
            return players.sort((a,b) => b.first_name.localeCompare(a.first_name));
        }
    } catch (error) {
        return null;
    }
}

