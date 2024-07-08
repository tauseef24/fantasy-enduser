import { useState, useEffect } from "react";
import { getLeagues } from "../services/sports";
import { Link, useParams } from "react-router-dom";

const Leagues = ({ sportId }) => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    console.log(sportId);
    const fetchLeagues = async () => {
      try {
        const res = await getLeagues(sportId);
        console.log(res.data);
        setLeagues(res.data);
      } catch (err) {
        console.error("Error fetching leagues", err);
      }
    };
    fetchLeagues();
  }, [sportId]);

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-slate-300">
      <div className="flex flex-col sm:flex-row gap-5 px-4 sm:gap-10 w-full">
        {leagues.map((league, index) => (
          // <LeagueCard
          //   key={league._id}
          //   imageUrl="https://upload.wikimedia.org/wikipedia/ta/thumb/d/d4/DLF_IPL_Logo.svg/1280px-DLF_IPL_Logo.svg.png"
          //   leagueName={league.league}
          // />
          <div className="w-full sm:max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={index}>
            <a href="#" className="block">
              <img
                className="p-8 rounded-t-lg w-full h-[200px] object-cover"
                src="https://upload.wikimedia.org/wikipedia/ta/thumb/d/d4/DLF_IPL_Logo.svg/1280px-DLF_IPL_Logo.svg.png"
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5 flex flex-col items-center">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {league.league}
                </h5>
              </a>
              <div className="flex items-center justify-between w-full">
                <Link
                  to={`/${sportId}/${league._id}`}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-10"
                >
                  Select
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leagues;
