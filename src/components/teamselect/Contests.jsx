import { React, useState } from "react";
import {useNavigate,useParams} from 'react-router-dom'
import "boxicons";
import JoinContestModal from "../JoinContestModal";
import { useSelector } from "react-redux";
//Progress bar representing the contest user count
 
 
const ProgressBar = ({
  progress,
  bgColor = "bg-violet-200",
  fillColor = "bg-blue-600",
}) => {
  // Ensure progress does not go outside 0 to 100 bounds.
  const validProgress = Math.min(100, Math.max(0, progress));
 
  return (
    <div className={`w-full ${bgColor} rounded-full h-2 dark:bg-violet-700`}>
      <div
        style={{ width: `${validProgress}%` }}
        className={`${fillColor} h-2 rounded-full transition-width duration-200 ease-in-out`}
      />
    </div>
  );
};
 
// HoverInfo Component
const HoverInfoLeft = ({ children, info }) => {
  const [isHovered, setIsHovered] = useState(false);
 
  return (
    <div
      className="inline-block relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <div className="absolute -left-56 mt-2 w-auto px-4 py-2 text-sm text-violet-900 bg-violet-100 rounded shadow-lg max-w-xs">
          {info}
        </div>
      )}
    </div>
  );
};
 
const HoverInfoRight = ({ children, info }) => {
  const [isHovered, setIsHovered] = useState(false);
 
  return (
    <div
      className="inline-block relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <div
          className="absolute left-0 mt-2 w-auto min-w-max px-4 py-2 text-sm text-violet-900 bg-violet-100 rounded shadow-lg"
          style={{ whiteSpace: "nowrap" }}
        >
          {info}
        </div>
      )}
    </div>
  );
};
 
const Contests = ({contestDetails}) => {
 
  const balance = useSelector((state) => (state.auth.wallet));
 
  const {matchId} = useParams()
  const [modal,setModal] = useState(false)
  const [contestAmount, setContestAmount] = useState(0);
  const [BalAv, setBalAv] =useState(true);
  const navigate = useNavigate()
 
  const ContestAmountHandler =(e) =>{
    const amount= e;
    console.log("Balance",balance)
    if(parseInt(balance)-parseInt(amount)<0){
      alert('You dont have enough balance');
      setBalAv(false);
    }
    else{
      console.log("Amount",e);
      setContestAmount(amount);
    }  
  }
 
  console.log(contestDetails)
  return (
    <div className="flex flex-col justify-center items-center">
      {
        modal && BalAv && <JoinContestModal contestId={contestDetails.contestId}  setModal={setModal} contestAmount={contestAmount}/>
      }
      <div className="w-full max-w-full 2xl:max-w-4xl xl:max-w-2xl lg:max-w-1xl md:max-w-lg sm:max-w-md xs:w-full p-6 m-6 font-bold bg-gradient-to-tr from-blue-100 to-purple-50 text-violet-700 rounded-lg border border-violet-200 shadow-md dark:bg-violet-800 dark:border-violet-700 divide-y divide-slate-200">
        {/* Row 1: Only Text */}
        <div className="mb-2 justify-between flex">
          <p className="text-violet-700">{contestDetails.name}</p>
          <p onClick={()=>navigate(`/view-contest/${matchId}/${contestDetails.contestId}`)} className="text-violet-700 hover:text-violet-600">View contest</p>
        </div>
 
        {/* Row 2 */}
        <div className="mb-2 pb-4">
          <div className="p-4">
            <div className="flex justify-between items-center pb-4">
              <div className="flex items-center space-x-2">
                <p className="text-lg text-violet-600">
                  ₹{contestDetails.poolMoney}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-6 rounded transition duration-150 ease-in-out"
                  onClick={() => {
                    setModal(true);
                    ContestAmountHandler(contestDetails.entryPrize);
                  }}
                >
                  ₹{contestDetails.entryPrize}
                </button>
              </div>
            </div>
            <ProgressBar
              progress={((contestDetails.joinedUsers)/contestDetails.count)*100}
              bgColor="bg-red-200"
              fillColor="bg-red-500"
            />
          </div>
 
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <p className="text-md text-violet-600 pl-4">
                {contestDetails.count-contestDetails.joinedUsers}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-md text-red-600 pr-4">
                {contestDetails.count} spots
              </p>
            </div>
          </div>
        </div>
 
        {/* Row 3: Icons with Text */}
        <div className="flex justify-between pt-4">
        <HoverInfoRight info={`Win Minimum First Prize of ₹ ${Math.ceil(Number(contestDetails.poolMoney)*0.1)}`} >
            <div className="flex items-center space-x-2">
              <svg
                className="h-6 w-6 flex-none fill-violet-100 stroke-violet-500 stroke-2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="11" />
                <text
                  x="12"
                  y="16"
                  textAnchor="middle"
                  fontSize="10"
                  fill="white"
                >
                  1st
                </text>
              </svg>
              <p className="text-md text-violet-600 dark:text-violet-400">
               
              </p>
            </div>
          </HoverInfoRight>
 
          <HoverInfoRight info={`${Math.ceil((contestDetails.count * 2)/3)} Teams win the contest`}>
            <div className="flex items-center space-x-2">
              <box-icon name="trophy" color="#6d28d9"></box-icon>
              <p className="text-md text-violet-600">Min 30%</p>
            </div>
          </HoverInfoRight>
 
          <HoverInfoRight info="Max 1 entries per user">
            <div className="flex items-center space-x-2">
              <box-icon type="logo" name="medium" color="#6d28d9"></box-icon>
            </div>
          </HoverInfoRight>
 
          <HoverInfoLeft info="Takes place even if 2 spots fill, and the Prize Pool will depend on how many spots are filled.">
            <div className="flex items-center space-x-2">
              <svg
                className="h-6 w-6 flex-none fill-violet-100 stroke-violet-500 stroke-2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="11" />
                <path
                  d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                  fill="none"
                />
              </svg>
              <p className="text-md text-violet-600">
                Flexible
              </p>
            </div>
          </HoverInfoLeft>
        </div>
      </div>
     
    </div>
  );
};
 
export default Contests;