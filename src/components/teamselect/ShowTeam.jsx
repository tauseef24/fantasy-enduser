import React from "react";

const ShowTeam = ({ userTeam }) => {
  // Helper function to create a player display
  console.log(userTeam);
  const renderPlayer = (player, index) => (
    <div key={index} className="flex flex-col items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
      <img
        src={player.url}
        alt={`${player.playerName}`}
        className="w-24 h-24 md:w-36 md:h-36 lg:w-40 lg:h-40 object-cover rounded-full" />
      <div className="font-bold bg-gradient-to-tr from-blue-100 to-purple-50 text-violet-700 border-b px-5 py-2  rounded-sm w-full text-center">
        <p className="truncate">{player.playerName}</p>
      </div>
    </div>
  );
  
  // Assuming userTeam[0].team contains an array of player objects
  const rows = [
    userTeam[0].team.slice(0, 4), // First row with 4 players
    userTeam[0].team.slice(4, 7), // Second row with 3 players
    userTeam[0].team.slice(7), // Third row with the rest of the players
  ];
  
  return (
    <div className="flex flex-col w-full h-full bg-[url('src/assets/5205447.jpg')] bg-cover bg-center p-4 sm:p-8 text-center overflow-hidden">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex ${
            rowIndex === 1 ? "justify-around" : "justify-between"
          } flex-wrap md:flex-nowrap w-full px-2 sm:px-5`}
        >
          {row.map((player, playerIndex) => renderPlayer(player, playerIndex))}
        </div>
      ))}
    </div>
  );
};

export default ShowTeam;