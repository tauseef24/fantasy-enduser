import React, { useEffect, useState } from "react";
import CreateTeam from "./CreateTeam";
import ShowTeam from "./ShowTeam";
import { useSelector } from "react-redux";
import { getUserTeams } from "../../services/sports";

const MyTeams = ({ matchId, team }) => {

  const userId = useSelector((state) => state.auth.id);
  console.log(userId);


  return (
    <>
      {team.length == 0 ? (
        <CreateTeam matchId={matchId} />
      ) : (
        <ShowTeam userTeam={team} />
      )}
    </>
  );
};

export default MyTeams;
