import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMatches } from "../services/sports";

const teamLogoMap = {
  CSK: "https://scores.iplt20.com/ipl/teamlogos/CSK.png",
  MI: "https://scores.iplt20.com/ipl/teamlogos/MI.png",
  RCB: "https://scores.iplt20.com/ipl/teamlogos/RCB.png",
  SRH: "https://scores.iplt20.com/ipl/teamlogos/SRH.png",
  KKR: "https://scores.iplt20.com/ipl/teamlogos/KKR.png",
  GT: "https://scores.iplt20.com/ipl/teamlogos/GT.png",
  LSG: "https://scores.iplt20.com/ipl/teamlogos/LSG.png",
  PBKS: "https://scores.iplt20.com/ipl/teamlogos/PBKS.png",
  DC: "https://scores.iplt20.com/ipl/teamlogos/DC.png",
  RR: "https://scores.iplt20.com/ipl/teamlogos/RR.png",
};

const stadiumMap = {
  CSK: "Chepauk Stadium, Chennai",
  MI: "Wankhede Stadium, Mumbai",
  RCB: "Chinnaswamy Stadium, Bengaluru",
  SRH: "VDCA Cricket Stadium, Vishakapatnam",
  KKR: "Eden Gardens, Kolkata",
  GT: "Narendra Modi Stadium, Ahmedabad",
  LSG: "Ekana Sports City, Lucknow",
  PBKS: "Dharmshala CricketStadium, Dharmshala",
  DC: "Arun Jaitley Stadium, Delhi",
  RR: "Sawai Mansingh Stadium, Jaipur",
};

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const { sportId, leagueId } = useParams();
  const navigate = useNavigate();

  const fetchMatches = async () => {
    try {
      const response = await getMatches(leagueId);
      console.log(response.data);
      const sortedMatches = response.data.sort((a, b) => {
        const dateA = moment(a.date + " " + a.time, "YYYY-MM-DD HH:mm");
        const dateB = moment(b.date + " " + b.time, "YYYY-MM-DD HH:mm");
        return dateA - dateB;
      });
      setMatches(sortedMatches);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-[calc(100vh-4rem)] bg-gradient-to-tr from-violet-400 to-violet-200">
      <div className="w-full text-violet-950 flex items-center justify-start">
        <h1 className="text-3xl md:text-5xl my-4 ml-4 md:ml-[7%] font-bold font-BebasNeue">
          Matches
        </h1>
      </div>
      <div
        className="flex flex-col w-full md:w-[80%] justify-center items-center rounded-xl bg-gradient-to-tr from-blue-100 to-purple-50 text-violet-950 border-2 border-gray-400 mb-10"
        id="match-outer-card"
      >
        {matches.map((key, index) => (
          <div
            className="flex flex-col md:flex-row w-full border-b-2 border-gray-400"
            key={index}
          >
            <div className="flex flex-col basis-full md:basis-1/6 items-start pl-5 justify-center border-r-2 md:border-dotted border-red-600">
              <div className="flex flex-row items-center my-1">
                <div className="flex text-sm border-2 border-red-600 py-1 px-2">
                  MATCH {index + 1}
                </div>
                <div className="h-[2px] w-[80px] bg-red-600 hidden md:flex"></div>
              </div>
              <div className="my-5">
                <h1 className="font-bold text-xl md:text-xl">
                  {moment(key.date).format("MMM, ddd D")}
                </h1>
                <p className="text-base mt-2">
                  {moment(key.time, "HH:mm").format("h:mm a")} IST
                </p>
              </div>
            </div>
            <div className="flex basis-full md:basis-5/6 flex-col p-5">
              <div className="flex py-1 px-2">{stadiumMap[key.teamA.name]}</div>
              <div className="flex flex-col md:flex-row py-4 md:py-[30px]">
                <div className="text-lg md:text-xl font-bold flex gap-x-4 md:gap-x-5  basis-4/6">
                  <div className="flex items-center">
                    <img
                      src={teamLogoMap[key.teamA.name]}
                      width="60px"
                      alt=""
                    />{" "}
                    <span>{key.teamA.name}</span>{" "}
                  </div>
                  <div className="font-semibold flex items-center">VS</div>
                  <div className="flex items-center">
                    <img
                      src={teamLogoMap[key.teamB.name]}
                      width="60px"
                      alt=""
                    />{" "}
                    <span>{key.teamB.name}</span>{" "}
                  </div>
                </div>
                <div className="flex basis-1/6 h-[70%] items-center ml-40 sm:mt-4">
                  <Link
                    to={`/teamselect/${key._id}`}
                    className="bg-gradient-to-tr from-pink-500 to-orange-500 text-huckleberry-700  hover:bg-gradient-to-tr hover:from-white hover:to-white px-5 py-3 rounded-sm text-white -skew-x-[18deg] hover:border-2 hover:border-[#ef4123] hover:text-[#ef4123] transition-all duration-300 text-xs font-bold"
                  >
                    MATCH CENTRE
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;
