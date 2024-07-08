import React from "react";
import backgroundImage from "../assets/5205447.jpg";
import { IoCloseSharp } from "react-icons/io5";

const ShowTeamPoints = ({ team, setModal }) => {
  console.log(team);

  const PlayerDetails = ({ player }) => {
    return (
      <div className="flex flex-col items-center">
        <img
          src={player.url}
          alt=""
          className="md:w-32 md:h-32 h-24 w-24 rounded-full object-cover"
        />
        <div className="text-white text-center">
          <p className="font-bold">{player.playerName}</p>
          <p className="font-bold">{player?.playerPoints}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed top-[5%] left-[10%] z-10 inset-0 flex items-center justify-center w-[80%] h-[100%]">
      <div className="bg-slate-200 relative bg-opacity-75 p-2 rounded-md">
        {/* <i
          onClick={() => setModal(false)}
          className="bx absolute top-5 right-5 hover:bg-slate-100 p-0 m-0 bx-window-close bx-md bg-slate-500"
        ></i> */}
        <IoCloseSharp onClick={() => setModal(false)} className="absolute text-white top-5 right-5 hover:text-violet-500 transition-all duration-[50]" size={30}/>
        <div
          className="flex flex-wrap justify-center gap-4 py-2 rounded-md "
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <div className="w-full flex justify-evenly">
            {team.slice(0, 4).map((player, index) => (
              <div key={index} className="mx-4">
                <PlayerDetails player={player} />
              </div>
            ))}
          </div>
          <div className="w-full flex justify-evenly">
            {team.slice(4, 7).map((player, index) => (
              <div key={index} className="mx-4">
                <PlayerDetails player={player} />
              </div>
            ))}
          </div>
          <div className="w-full flex justify-evenly">
            {team.slice(7).map((player, index) => (
              <div key={index} className="mx-4">
                <PlayerDetails player={player} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowTeamPoints;
