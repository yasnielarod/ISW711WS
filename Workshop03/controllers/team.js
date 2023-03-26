import { teamModel } from "../models/team.js";

export const getTeams = async () => {
  try {
    const team = await teamModel.find({});
    if (!team) return null;
    return team;
  } catch (error) {
    return null;
  }
};

export const getTeamByName = async() => {
    try {
        const teams = await teamModel.find({});
        if(!teams) return null;
        return teams.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        return null
    }
}
