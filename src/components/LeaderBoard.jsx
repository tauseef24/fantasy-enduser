import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  joinedFantasyTeams,
  leaderBoard,
  getMatchData,
  getWallet
} from "../services/sports";
import ShowTeamPoints from "./ShowTeamPoints";
import { getCurrentScore } from "../services/sports";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setWallet } from "../redux/authSlice";

const LeaderBoard = () => {
  const { matchId, contestId } = useParams();
  const [data, setData] = useState([]);
  const [myRank, setMyRank] = useState(0);
  const [userDetails, setUserDetails] = useState({});
  const [joinedTeams, setJoinedTeams] = useState([]);
  const [modal, setModal] = useState(false);
  const [currTeam, setCurrTeam] = useState(null);
  const [prize, setPrize] = useState(0);
  const [matchComp, setMatchComp] = useState(false);
  const [socket, setSocket] = useState(null);
  const [currentScore, setCurrentScore] = useState(null);
  const [matchOngoing, setMatchOngoing] = useState(false);
  const [ib, setIb] = useState(false);
  const [showSummaryButton, setShowSummaryButton] = useState(false);

  const [disp, setDisp] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.id);
  // const userName = useSelector((state) => state.auth.name);
  // const userWallet = useSelector((state) => state.auth.wallet);
  // console.log(userDetails);

  const fetchJoinedTeams = async () => {
    joinedFantasyTeams(matchId, contestId, userId)
      .then((res) => {
        setJoinedTeams(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchLeaderBoard = async () => {
    leaderBoard(matchId, contestId, userId)
      .then((res) => {
        setData(res.leaderboard);
        console.log(data);
        setMyRank(res.userRank);
        setUserDetails({ ...res.userDetails });
        setPrize(res.userDetails.prize);
      })
      .catch((err) => console.log(err));
  };

  const fetchMatchScore = () => {
    getCurrentScore(matchId)
      .then((res) => {
        console.log(res.isOngoing);
        if (res.isOngoing) setCurrentScore(res);
        setMatchOngoing(res.isOngoing);
      })
      .catch((err) => console.log(err));
  };

  const updateWallet = async () => {
    try{
      const res = await getWallet(userId);
      console.log("Wallet Update");
      dispatch(setWallet(res.data.money));
    }
    catch(err) {
      console.log("Catch Block");
      console.log(err);
    }
  }

  const fetchData = async () => {
    fetchLeaderBoard();
    fetchJoinedTeams();
    try {
      const res = await getMatchData(matchId);
      console.log(res);
      const matchData = res;
      setMatchComp(matchData.completed);
      if (matchData.completed) {
        alert("Match is completed");
        setMatchOngoing(false);
        setShowSummaryButton(true);
        updateWallet();
      } else {
        setMatchOngoing(matchData.isOngoing);
        if (matchData.isOngoing) {
          setDisp(true);
          if (matchData.inningsBreak) setIb(true);
        } else {
          alert("Match has not yet started, please wait!");
          navigate(`/teamselect/${matchId}`);
        }
      }
    } catch (error) {
      console.error("Error fetching match data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchMatchScore();
    const socket = io("http://localhost:8000");
    setSocket(socket);

    if (disp) {
      socket.on("liveScoreUpdated", (res) => {
        console.log(res);
        if (res?.matchCompleted) {
          alert("match completed");
        } else if (res?.inningsBreak) {
          setDisp(false);
          setInitData(true);
          setIb(true);
          console.log(ib);
        } else setCurrentScore(res);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      {modal && currTeam && (
        <ShowTeamPoints team={currTeam} setModal={setModal} />
      )}

      <div className="py-10">
        {matchOngoing && !ib ? (
          <div className="flex mb-10 items-center justify-center max-md:scale-75">
            <div>
              <div className="flex item bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 p-5 rounded-md justify-between ">
                <div className="text-violet-950 flex items-baseline">
                  {/*<p className="text-sm">{currentScore.name}, 1st inning</p>*/}
                  <div>
                    <p className="text-5xl font-bold">
                      {currentScore?.scoreDetails?.score}-
                      {currentScore?.scoreDetails?.wickets}
                    </p>
                  </div>
                  <div>
                    <span className="text-lg text font-medium">
                      ({currentScore?.scoreDetails?.overs})
                    </span>
                  </div>
                </div>

                <div className="mx-7">
                  <div className="col-span-2  text-violet-950">
                    {currentScore?.striker?.name}*
                  </div>
                  <div className="col-span-2  text-violet-950">
                    {currentScore?.nonstriker?.name}
                  </div>
                </div>

                <div className="mr-10">
                  <div className="flex items-baseline">
                    <div className="text-violet-950  mx-1">
                      {currentScore?.striker?.batting?.runs}
                    </div>
                    <div className="text-violet-950 text-sm">
                      {"(" + currentScore?.striker?.batting?.balls + ")"}
                    </div>
                  </div>
                  <div className="flex items-baseline">
                    <div className="text-violet-950 w-25% mx-1">
                      {currentScore?.nonstriker?.batting?.runs}
                    </div>
                    <div className="text-violet-950 text-sm w-25%">
                      {"(" + currentScore?.nonstriker?.batting?.balls + ")"}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex">
                    <div className="col-span-2 text-violet-950 mr-7">
                      {currentScore?.bowler?.name}
                    </div>
                    <div className="text-violet-950 flex">
                      {currentScore?.bowler?.bowler?.wickets}-
                      {currentScore?.bowler?.bowler?.balls}
                    </div>
                  </div>
                  <div className="flex">
                    <p className="font-bold mr-3">CRR</p>
                    <p>{currentScore?.scoreDetails?.crr}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xl text-violet-950 font-extrabold text-center">
            Innings break!
          </div>
        )}

        <div className="flex justify-between w-full max-md:flex-wrap items-center">
          <div className="flex flex-col items-center w-full px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-violet-950 ">
              Leaderboard
            </h2>
            {/* Added a wrapper with a fixed height and overflow-y-auto */}
            <div className="w-full max-w-4xl lg:max-w-6xl shadow-lg rounded-lg overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full table-fixed">
                  <thead className="bg-violet-950 text-white sticky top-0">
                    <tr>
                      <th className="w-1/5 px-2 py-2 md:px-4 md:py-2 text-sm md:text-base lg:text-lg text-center">
                        Rank
                      </th>
                      <th className="w-2/5 px-2 py-2 md:px-4 md:py-2 text-sm md:text-base lg:text-lg text-left">
                        User
                      </th>
                      <th className="w-2/5 px-2 py-2 md:px-4 md:py-2 text-sm md:text-base lg:text-lg text-center">
                        Points
                      </th>
                      {/* <th className="w-2/5 pr-8 px-2 py-2 text-xs md:px-4 md:py-2 text-sm md:text-base lg:text-lg text-center">Winning Amount (₹)</th> */}
                      <th className="w-2/5 pr-8 px-2 py-2 md:px-4 md:py-2 text-sm md:text-base lg:text-lg text-center">
                        Prize Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-gradient-to-tr from-blue-100 to-purple-100">
                    {userDetails.userName && (
                      <tr className="bg-gradient-to-tr from-blue-400 to-violet-400 hover:bg-gradient-to-tr hover:from-blue-500 hover:to-violet-500 hover:shadow-lg text-violet-950 hover:font-semibold transition duration-300 ease-in-out">
                      <td className="px-4 py-3 text-sm md:text-base lg:text-lg text-center">
                        {myRank + 1}
                      </td>
                      <td className="px-4 py-3 text-sm md:text-base lg:text-lg text-left">
                        {userDetails?.userName}
                      </td>
                      <td className="w-2/5 pr-8 px-4 py-3 text-sm md:text-base lg:text-lg text-center">
                        {userDetails?.points}
                      </td>
                      {/* <td className="w-2/5 pr-8 px-4 py-3 text-sm md:text-base lg:text-lg text-center">{parseFloat(prize).toFixed(2)}</td> */}
                      <td className="w-2/5 pr-8 px-4 py-3 text-sm md:text-base lg:text-lg text-center">
                        {userDetails?.prize}
                      </td>
                    </tr>
                    )}
                    
                    {data.map(({ rank, userName, points, prize }, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0
                            ? "bg-gradient-to-tr from-blue-200 to-purple-200"
                            : "bg-gradient-to-tr from-blue-100 to-purple-100"
                        } text-violet-950 hover:bg-gradient-to-tr hover:from-blue-300 hover:to-violet-300 hover:shadow-lg hover:text-violet-950 hover:font-semibold transition duration-300 ease-in-out`}
                      >
                        <td className="px-4 py-3 text-sm md:text-base lg:text-lg text-center">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 text-sm md:text-base lg:text-lg text-left">
                          {userName}
                        </td>
                        <td className="pr-8 px-4 py-3 text-sm md:text-base lg:text-lg text-center">
                          {points}
                        </td>
                        {/* <td className="w-2/5 pr-8 px-4 py-3 text-sm md:text-base lg:text-lg text-center">{parseFloat(prize).toFixed(2)}</td> */}
                        <td className="pr-8 px-4 py-3 text-sm md:text-base lg:text-lg text-center">
                          {prize}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center w-full px-4 max-md:mt-5">
            <h2 className="text-2xl md:text-3xl text-center lg:text-4xl font-bold mb-4 text-violet-950">
              Teams
            </h2>
            {/* Added a wrapper with a fixed height and overflow-y-auto */}
            <div className="w-full max-w-4xl lg:max-w-6xl shadow-lg rounded-lg overflow-hidden">
              <div className="max-h-[500px] overflow-auto">
                <table className="w-full table-fixed">
                  <thead className="bg-violet-950 text-white sticky top-0">
                    <tr>
                      <th className="w-1/5 px-2 py-2 md:px-4 md:py-2 text-sm md:text-base lg:text-lg text-center">
                        #
                      </th>
                      <th className="w-2/5 px-2 py-2 md:px-4 md:py-2 text-sm md:text-base lg:text-lg text-left">
                        Teams
                      </th>
                      <th className="w-2/5 pr-8 px-2 py-2 md:px-4 md:py-2 text-sm md:text-base lg:text-lg text-center">
                        Points
                      </th>
                      {/* <th className="w-2/5 pr-8 px-2 py-2 text-xs md:px-4 md:py-2 text-sm md:text-base lg:text-lg text-center">Winning Amount (₹)</th> */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-gradient-to-tr from-blue-100 to-purple-100">
                    {joinedTeams.map((team, index) => (
                      <tr
                        onClick={() => {
                          setModal(true);
                          setCurrTeam(team.team);
                        }}
                        key={index}
                        className={`${
                          index % 2 === 0
                            ? "bg-gradient-to-tr from-blue-100 to-purple-100"
                            : "bg-gradient-to-tr from-blue-200 to-purple-200"
                        } text-violet-950 hover:shadow-lg hover:font-semibold hover:bg-gradient-to-tr hover:from-blue-300 hover:to-purple-300 transition duration-300 ease-in-out`}
                      >
                        <td className="px-4 py-3 text-sm md:text-base lg:text-lg text-center">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 text-sm md:text-base lg:text-lg text-start">
                          Team{index + 1}
                        </td>
                        <td className="px-4 py-3 text-sm md:text-base lg:text-lg text-center">
                          {team.points}
                        </td>
                        {/* <td className="w-2/5 pr-8 px-4 py-3 text-sm md:text-base lg:text-lg text-center">{parseFloat(prize).toFixed(2)}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          {showSummaryButton && (
            <button
              className="px-4 py-2 bg-violet-700 text-white rounded hover:bg-violet-950"
              onClick={() => {
                // Navigate to match summary page
                navigate(`/matchsummary/${matchId}`);
              }}
            >
              Match Summary
            </button>
          )}

          <button
            className="px-4 py-2 bg-violet-700 text-white rounded hover:bg-violet-950 transition-all duration-100"
            onClick={() => {
              // Navigate to scorecard page
              navigate(`/scorecard/${matchId}`);
            }}
          >
            Scorecard
          </button>
        </div>
      </div>
    </>
  );
};

export default LeaderBoard;
