import React, { useEffect, useState } from "react";
import Contests from "../components/teamselect/Contests";
import MyTeams from "../components/teamselect/MyTeams";
import * as Tabs from "@radix-ui/react-tabs";
import { setMatchPlayerList } from "../redux/playerSlice";
import { useParams } from "react-router-dom";
import ShowContest from "../components/ShowContest";
import { getUserTeams } from "../services/sports";
import { useSelector } from "react-redux";
import HoverComponent from "../components/HoverComponent";


const TeamSelect = () => {
  const [team, setTeam] = useState([]);
  const { matchId } = useParams();
  const userId = useSelector((state) => state.auth.id);

  console.log(matchId);

  const fetchUserTeams = async () => {
    try {
      const response = await getUserTeams(userId, matchId);
      console.log(response.data);
      setTeam(response.data);
    } catch (error) {
      console.log("Team Not Found");
    }
  };

  const handleClick = () => {
    if (team.length === 0) {
      alert("Create a Dream Team First!");
    }
  };

  useEffect(() => {
    fetchUserTeams();
  }, []);

  return (
    <div className="flex justify-center mt-16 bg-gradient-to-tr from-violet-400 to-violet-200">
      <Tabs.Root
        className="flex flex-col w-full sm:w-[90%] md:w-[80%] lg:w-[70%]"
        defaultValue="tab1"
      >
        <Tabs.List
          className="shrink-0 flex flex-col sm:flex-row my-4 border-b border-mauve6"
          aria-label="Manage your account"
        >
          <Tabs.Trigger
            className="px-3 sm:px-5 h-12 sm:h-[45px] flex-1 flex items-center justify-center font-bold text-lg sm:text-xl leading-none text-mauve11 select-none hover:text-violet11 active:text-violet11 shadow-[inset_0_-1px_0_0,0_1px_0_0] focus:relative outline-none cursor-default"
            value="tab1"
          >
            My Teams
          </Tabs.Trigger>
          <Tabs.Trigger
            className="px-3 sm:px-5 h-12 sm:h-[45px] flex-1 flex items-center justify-center text-lg sm:text-xl font-bold leading-none text-mauve11 select-none hover:text-violet11 active:text-violet11 shadow-[inset_0_-1px_0_0,0_1px_0_0] focus:relative outline-none cursor-default"
            value="tab2"
            disabled={team.length === 0}
          >
            <div className="flex items-center justify-center gap-3 w-full">
              Contests
              {team.length === 0 ? (
                <HoverComponent />
              ) : (
                <></>
              )}
            </div>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          className="grow p-4 sm:p-5 rounded-b-md outline-none"
          value="tab1"
        >
          <MyTeams matchId={matchId} team={team} />
        </Tabs.Content>
        <Tabs.Content
          className="grow p-4 sm:p-5 rounded-b-md outline-none"
          value="tab2"
        >
          <ShowContest matchId={matchId} />
          {/* <Contests /> */}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default TeamSelect;
