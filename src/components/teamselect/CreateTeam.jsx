import React, { useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Theme } from "@radix-ui/themes";
import { useSelector, useDispatch } from "react-redux";
import { setMatchPlayerList } from "../../redux/playerSlice";
import "boxicons";
import { createDreamTeam, getPlayersForMatch } from "../../services/sports";
import { useNavigate } from "react-router-dom";

const CreateTeam = ({ matchId }) => {
  const [totalCredits, setTotalCredits] = useState(100);
  const userIdVal = useSelector((state) => state.auth.id);
  const navigate = useNavigate();

  const [playerList, setPlayerList] = useState([]);
  const [wicketkeepers, setWicketkeepers] = useState(0);
  const [batsman, setBatsman] = useState(0);
  const [allrounders, setAllrounders] = useState(0);
  const [bowlers, setBowlers] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPlayersForMatch = async () => {
      try {
        const response = await getPlayersForMatch(matchId);
        if(typeof response.data == "string"){
          throw new Error("Match not initialized");
        }
        dispatch(setMatchPlayerList(response.data));
        console.log(response.data);
      } catch (error) {
        console.log(error);
        alert(error);
        navigate(-1);
      }
    };

    fetchPlayersForMatch();
  }, []);

  const matchPlayerList = useSelector((state) => state.players.matchPlayerList);

  const addPlayerToList = (playerObject, role, credit) => {
    if (playerList.includes(playerObject)) {
      alert("Player Already Selected");
      return;
    } else if (playerList.length >= 11) {
      alert("11 Players Already Selected");
      return;
    } else {
      if (role == "wicketkeeper") setWicketkeepers(wicketkeepers + 1);
      if (role == "batsman") setBatsman(batsman + 1);
      if (role == "allrounder") setAllrounders(allrounders + 1);
      if (role == "bowler") setBowlers(bowlers + 1);
      setPlayerList([...playerList, playerObject]);
      setTotalCredits(totalCredits - parseInt(credit));
    }
  };

  const removePlayer = (playerObject, role, credit) => {
    let indexToRemove = playerList.indexOf(playerObject);
    if (indexToRemove !== -1) {
      if (role == "wicketkeeper") setWicketkeepers(wicketkeepers - 1);
      if (role == "batsman") setBatsman(batsman - 1);
      if (role == "allrounder") setAllrounders(allrounders - 1);
      if (role == "bowler") setBowlers(bowlers - 1);
      setPlayerList((prevItems) => {
        return prevItems.filter((item, index) => index !== indexToRemove);
      });
      setTotalCredits(totalCredits + parseInt(credit));
    } else {
      alert("Player Not in List");
    }
    console.log(wicketkeepers, batsman, allrounders, bowlers);
  };

  const validation = () => {
    if (playerList.length < 11) {
      alert("Select 11 Players");
      return false;
    } else if (wicketkeepers < 1) {
      alert("Minimum 1 WicketKeeper");
      return false;
    } else if (batsman < 3) {
      alert("Minimum 3 Batsmen");
      return false;
    } else if (allrounders < 1) {
      alert("Minimum 2 Allrounders");
      return false;
    } else if (bowlers < 3) {
      alert("Minimum 3 Bowlers");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async () => {
    const validate = validation();

    if (validate) {
      const data = {
        dreamTeam: {
          userId: userIdVal,
          matchId: { matchId },
          teamCredit: 100 - totalCredits,
          team: playerList,
        },
      };
      try {
        const response = await createDreamTeam(matchId, data);
        console.log(response.data);
        alert("Team Created Successfully, please choose a contest");
        navigate(0);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full h-auto ">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between  mb-8">
          <div className="flex w-[1/3]">
            <h1 className="font-bold text-xl text-violet-950">
              Choose Your Dream Team
            </h1>
          </div>
          <div className="flex w-[1/3]">
            <h1 className="font-bold text-xl text-violet-950">
              Players Selected: {playerList.length}
            </h1>
          </div>
          <div className="flex flex-row w-[1/3] justify-end items-center gap-2 ">
            <p className="pr-4">
              <span className="font-bold text-violet-950">
                Credits Remaining:{" "}
              </span>
              {totalCredits}
            </p>
            <button
              onClick={handleSubmit}
              className="w-[130px] bg-violet-500 text-white bg-primary-600 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm lg:px-5 px-2 py-2 text-center"
            >
              Create Team
            </button>
          </div>
        </div>
        <Tabs.Root
          className="flex flex-col w-full shadow-[0_2px_10px] shadow-blackA2"
          defaultValue="tab1"
        >
          <Tabs.List
            className="shrink-0 flex border-b border-mauve6"
            aria-label="Manage your account"
          >
            <Tabs.Trigger
              className="bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 font-bold lg:lg:px-5 px-2 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
              value="tab1"
            >
              WK ({wicketkeepers})
            </Tabs.Trigger>
            <Tabs.Trigger
              className="bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 font-bold lg:px-5 px-2 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
              value="tab2"
            >
              Batsmen ({batsman})
            </Tabs.Trigger>
            <Tabs.Trigger
              className="bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 font-bold lg:px-5 px-2 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
              value="tab3"
            >
              All Rounders ({allrounders})
            </Tabs.Trigger>
            <Tabs.Trigger
              className="bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 font-bold lg:px-5 px-2 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
              value="tab4"
            >
              Bowlers ({bowlers})
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content
            className="grow p-5 bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            value="tab1"
          >
            <Theme className="bg-gradient-to-tr from-blue-100 to-purple-50">
              <div className="relative overflow-x-auto h-[45%] ml-0">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-violet-950 uppercase bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700">
                    <tr>
                      <th scope="col" className="px-8 py-4 w-1/7 min-w-20">
                        #
                      </th>
                      <th scope="col" className="px-8 py-4 w-2/7">
                        Name
                      </th>
                      <th scope="col" className="px-8 py-4 w-2/7">
                        Credits
                      </th>
                      <th scope="col" className="px-8 py-4 w-2/7">
                        Button
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border border-blue-100">
                    {matchPlayerList.wicketkeeper?.map((ele, index) => (
                      <tr
                        className="bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 border-b"
                        key={index}
                      >
                        <th scope="row" className="px-8 py-4 w-2/7">
                          <img
                            src={ele.url}
                            alt={ele.name}
                            className="min-w-20 w-28 h-28"
                          />
                        </th>
                        <td className="lg:px-8 py-4 px-2 w-2/7 font-bold text-xl">
                          {ele.playerName}
                        </td>
                        <td className="px-8 py-4 w-2/7 font-bold text-xl">
                          {ele.credit}
                        </td>
                        <td className="px-8 py-4 w-2/7">
                          {!playerList.includes(ele) ? (
                            <button
                              onClick={() =>
                                addPlayerToList(ele, "wicketkeeper", ele.credit)
                              }
                            >
                              <box-icon
                                name="plus-circle"
                                size="md"
                                color="green"
                              ></box-icon>
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                removePlayer(ele, "wicketkeeper", ele.credit)
                              }
                            >
                              <box-icon
                                name="minus-circle"
                                size="md"
                                color="red"
                              ></box-icon>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Theme>
          </Tabs.Content>
          <Tabs.Content
            className="grow p-5 bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            value="tab2"
          >
            <Theme className="bg-gradient-to-tr from-blue-100 to-purple-50">
              <div className="relative overflow-x-auto h-[45%] ml-0">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700">
                    <tr>
                      <th scope="col" className="px-8 py-4 w-1/7">
                        #
                      </th>
                      <th scope="col" className="px-8 py-4 w-2/7">
                        Name
                      </th>
                      <th scope="col" className="px-8 py-4 w-2/7">
                        Credits
                      </th>
                      <th scope="col" className="px-8 py-4 w-2/7">
                        Button
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border border-blue-100">
                    {matchPlayerList.batsman?.map((ele, index) => (
                      <tr
                        className="bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 border-b"
                        key={index}
                      >
                        <th scope="row" className="px-8 py-4 w-2/7">
                          <img
                            src={ele.url}
                            alt={ele.name}
                            className="min-w-20 w-28 h-28"
                          />
                        </th>
                        <td className="px-8 py-4 w-2/7 font-bold text-xl">
                          {ele.playerName}
                        </td>
                        <td className="px-8 py-4 w-2/7 font-bold text-xl">
                          {ele.credit}
                        </td>
                        <td className="px-8 py-4 w-2/7">
                          {!playerList.includes(ele) ? (
                            <button
                              onClick={() =>
                                addPlayerToList(ele, "batsman", ele.credit)
                              }
                            >
                              <box-icon
                                name="plus-circle"
                                size="md"
                                color="green"
                              ></box-icon>
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                removePlayer(ele, "batsman", ele.credit)
                              }
                            >
                              <box-icon
                                name="minus-circle"
                                size="md"
                                color="red"
                              ></box-icon>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Theme>
          </Tabs.Content>
          <Tabs.Content
            className="grow p-5 bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            value="tab3"
          >
            <Theme className="bg-gradient-to-tr from-blue-100 to-purple-50">
              <div className="relative overflow-x-auto h-[45%] ml-0">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700">
                    <tr>
                      <th scope="col" className="px-8 py-4 w-1/7">
                        #
                      </th>
                      <th scope="col" className="px-8 py-4 w-2/7">
                        Name
                      </th>
                      <th scope="col" className="px-8 py-4 w-2/7">
                        Credits
                      </th>
                      <th scope="col" className="px-8 py-4 w-2/7">
                        Button
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border border-blue-100">
                    {matchPlayerList.allrounder?.map((ele, index) => (
                      <tr
                        className="bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 border-b"
                        key={index}
                      >
                        <th scope="row" className="px-8 py-4 w-2/7">
                          <img
                            src={ele.url}
                            alt={ele.name}
                            className="min-w-20 w-28 h-28"
                          />
                        </th>
                        <td className="px-8 py-4 w-2/7 font-bold text-xl">
                          {ele.playerName}
                        </td>
                        <td className="px-8 py-4 w-2/7 font-bold text-xl">
                          {ele.credit}
                        </td>
                        <td className="px-8 py-4 w-2/7">
                          {!playerList.includes(ele) ? (
                            <button
                              onClick={() =>
                                addPlayerToList(ele, "allrounder", ele.credit)
                              }
                            >
                              <box-icon
                                name="plus-circle"
                                size="md"
                                color="green"
                              ></box-icon>
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                removePlayer(ele, "allrounder", ele.credit)
                              }
                            >
                              <box-icon
                                name="minus-circle"
                                size="md"
                                color="red"
                              ></box-icon>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Theme>
          </Tabs.Content>
          <Tabs.Content
            className="grow p-5 bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            value="tab4"
          >
            <Theme className="bg-gradient-to-tr from-blue-100 to-purple-50">
              <div className="relative overflow-x-auto h-[45%] ml-0 bg-gradient-to-tr from-blue-100 to-purple-50">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700">
                    <tr>
                      <th scope="col" className="px-8 py-4 w-1/7">
                        #
                      </th>
                      <th scope="col" className="px-8 py-4 w-2/7">
                        Name
                      </th>
                      <th scope="col" className="px-8 py-4 w-2/7">
                        Credits
                      </th>
                      <th scope="col" className="px-8 py-4 w-2/7">
                        Button
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border border-blue-100">
                    {matchPlayerList.bowler?.map((ele, index) => (
                      <tr
                        className="bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700 border-b"
                        key={index}
                      >
                        <th scope="row" className="px-8 py-4 w-2/7">
                          <img
                            src={ele.url}
                            alt={ele.name}
                            className="min-w-20 w-28 h-28"
                          />
                        </th>
                        <td className="px-8 py-4 w-2/7 font-bold text-xl">
                          {ele.playerName}
                        </td>
                        <td className="px-8 py-4 w-2/7 font-bold text-xl">
                          {ele.credit}
                        </td>
                        <td className="px-8 py-4 w-2/7">
                          {!playerList.includes(ele) ? (
                            <button
                              onClick={() =>
                                addPlayerToList(ele, "bowler", ele.credit)
                              }
                            >
                              <box-icon
                                name="plus-circle"
                                size="md"
                                color="green"
                              ></box-icon>
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                removePlayer(ele, "bowler", ele.credit)
                              }
                            >
                              <box-icon
                                name="minus-circle"
                                size="md"
                                color="red"
                              ></box-icon>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Theme>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default CreateTeam;
