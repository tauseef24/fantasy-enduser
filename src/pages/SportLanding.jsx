import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getLeagues } from "../services/sports";
import LeagueCard1 from "../components/cards/LeagueCard1";

export default function SportLanding() {
  const { sportId, sport } = useParams();
  const [leagues, setLeagues] = useState([]);

  const fetchLeagues = async () => {
    try {
      // const res= await axios.get(`http://localhost:8000/user/fantasy-league/${sportId}`);
      const res = await getLeagues(sportId);
      console.log(res.data);
      setLeagues(res.data);
    } catch (err) {
      console.error("Error fetching leagues", err);
    }
  };

  useEffect(() => {
    console.log(sportId);
    fetchLeagues();
  }, [sportId]);

  return (
    <div className="bg-gradient-to-tr from-violet-400 to-violet-200 w-full py-14">
      <div className="flex items-center justify-center ">
        <h5 className="text-base text-center mt-8 mb-12 font-bold text-violet-950 md:text-5xl w-100 py-4 px-4 rounded-md">
          Choose League
        </h5>
      </div>

      <div className="flex items-center justify-center ">
        <div className="flex xl:flex-row flex-col gap-10">
          {leagues.map((league) => (
            <LeagueCard1 key={league._id} league={league} sportId={sportId} />
          ))}
        </div>
      </div>
    </div>
  );
}
