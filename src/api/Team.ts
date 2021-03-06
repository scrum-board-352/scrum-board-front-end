import EmailModel from "models/Email";
import ResultOutput from "models/ResultOutput";
import TeamModel from "models/Team";
import client from "./base/client";
import TeamMutation from "./mutation/TeamMutation";
import TeamQuery from "./query/TeamQuery";

export async function createTeam(teamInfo: TeamModel.CreateInfo): Promise<TeamModel.Info> {
  const data: any = await client.request(TeamMutation.createTeamMutation, teamInfo);
  return data.createTeam;
}

export async function sendEmailToInviteReceiverJoinTeam(
  teamInfo: EmailModel.TeamInfo
): Promise<ResultOutput> {
  const data: any = await client.request(TeamQuery.sendEmailQuery, teamInfo);
  return data.sendEmailToInviteReceiverJoinTeam;
}

export async function updateTeam(teamInfo: TeamModel.Info): Promise<TeamModel.Info> {
  const date: any = await client.request(TeamMutation.updateTeam, teamInfo);
  return date.updateTeam;
}

export async function removeTeam(teamId: { teamId: string }): Promise<ResultOutput> {
  const date: any = await client.request(TeamMutation.removeTeam, teamId);
  return date.removeTeam;
}

export async function selectTeamByUsername(username: {
  username: string;
}): Promise<Array<TeamModel.Info>> {
  const date: any = await client.request(TeamQuery.selectTeamByUser, username);
  return date.selectTeamByUsername;
}
