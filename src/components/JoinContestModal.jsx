import React from 'react';
import { getWallet, joinContest, updateWallet } from '../services/sports';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setWallet } from '../redux/authSlice';
 
const JoinContestModal = ({setModal,contestId,contestAmount}) => {
 
  const {matchId} = useParams()
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id)
  const balance = useSelector((state) => (state.auth.wallet));
 
 
  const navigate = useNavigate();
 
  const updateWalletAmount = async (amount) => {
    let data = {
      userId: userId,
      amount: parseInt(amount)
    }
    try{
      const res = await updateWallet(data);
      console.log("Wallet Update");
      console.log(res);
    }
    catch(err) {
      console.log("Catch Block");
      console.log(err);
    }
  }

  const deductWalletAmount = ()=> {
      // console.log("Contest Amount",contestAmount);    
      const newWalletAmount = parseInt(balance)-parseInt(contestAmount);
      console.log("new wallet Amount",newWalletAmount);
      dispatch(setWallet(newWalletAmount));
      updateWalletAmount(newWalletAmount);
  }
 
  const onJoinContest = async (e)=>{
    e.preventDefault()
    const joiningDetails = {
      userId,
      contestId
    }
    joinContest(matchId,{joiningDetails})
      .then((res)=>{
        deductWalletAmount()
        navigate(`/view-contest/${matchId}/${contestId}`)
      })
      .catch((err)=>{
        alert(err.response.data)
        console.log(err)
      })
      setModal(false)
  }
  return (
    <>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen bg-gray-500/75">
          <div className="bg-white p-16 rounded-lg">
            <form action="">
              <p className="text-1xl font-semibold mb-4">Click yes to Join the Contest</p>
              <div className="flex justify-between">
                <button onClick={onJoinContest} type='submit' className="bg-blue-500 w-full hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">Yes</button>
                <button onClick={()=>setModal(false)} className="bg-red-500 w-full hover:bg-red-600 text-white font-bold py-2 px-4 rounded">No</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
 
export default JoinContestModal;

// import React from 'react';
// import { joinContest } from '../services/sports';
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const JoinContestModal = ({setModal,contestId}) => {

//   const {matchId} = useParams()
//   const userId = useSelector((state) => state.auth.id)
//   const navigate = useNavigate();
//   const onJoinContest = (e)=>{
//     e.preventDefault()
//     const joiningDetails = {
//       userId,
//       contestId
//     }
//     joinContest(matchId,{joiningDetails})
//       .then((res)=>{
//         alert(res)
//         setModal(false)
//       })
//       .catch((err)=>{
//         console.log(err)
//       })
//       navigate(`/view-contest/${matchId}/${contestId}`)
//   }
//   return (
//     <>
//       <div className="fixed z-10 inset-0 overflow-y-auto">
//         <div className="flex items-center justify-center min-h-screen bg-gray-500/75">
//           <div className="bg-white p-16 rounded-lg">
//             <form action="" onSubmit={onJoinContest}>
//               <p className="text-1xl font-semibold mb-4">Click yes to Join the Contest</p>
//               <div className="flex justify-between">
//                 <button type='submit' className="bg-blue-500 w-full hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">Yes</button>
//                 <button onClick={()=>setModal(false)} className="bg-red-500 w-full hover:bg-red-600 text-white font-bold py-2 px-4 rounded">No</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default JoinContestModal;