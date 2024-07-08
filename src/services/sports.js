import { instance } from "./axiosBase";

export const getSports = async () => {
    return instance
      .get("/user/fantasy-sports")
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  };

export const getLeagues = async (sportId) => {
    const response = await instance.get(`/user/fantasy-league/${sportId}`);
    return response;
}

export const getUserTeams = async (userId, matchId) => {
    const response = await instance.get(`/user/dream-team-byUser/${userId}/${matchId}`);
    return response;
}

export const getMatches = async (leagueId) => {
    const response = await instance.get(`/user/fantasy-matches/league/${leagueId}`);
    return response;
}

export const getPlayersForMatch = async (matchId) => {
    const response = await instance.get(`/admin/matchPlayers/${matchId}`);
    return response;
}

export const createDreamTeam = async (matchId, data) => {
    const response = await instance.post(`/user/fantasy-create-team/${matchId}`, data);
    return response;
}

export const getContests = async(matchId)=>{
    return instance.get(`/user/match-contests/${matchId}`)
            .then((res)=>res.data)
            .catch((err)=>{throw err})
}

export const joinContest = async(matchId,data)=>{
    return instance.post(`/user/fantasy-match/join-contest/${matchId}`,data)
            .then((res)=>res.data)
            .catch((err)=>{throw err})
}

export const leaderBoard = async(matchId,contestId,userId)=>{
    return instance.get(`/admin/matchLeaderboard/${matchId}/${contestId}/${userId}`)
            .then((res)=>res.data)
            .catch((err)=>{throw err})
}

export const joinedFantasyTeams = async(matchId,contestId,userId)=>{
    return instance.get(`/user/contest-team/${matchId}/${userId}/${contestId}`)
            .then((res)=>res.data)
            .catch((err)=>{throw err})
}

export const getMatchData = async (matchId)=>{
    return instance.get(`admin/matchData/${matchId}`)
          .then((res) => res.data)
          .catch((err) => {throw err})
  }

export const getCurrentScore = async (matchId) => {
return instance
    .get(`user/matchlive-score/${matchId}`)
    .then((res) => res.data)
    .catch((err) => {
    throw err;
    });
};

export const updateWallet = async (data) => {
    return instance.post(`/user/wallet-update`,data)
            .then((res)=>res.data)
            .catch((err)=>{throw err})
}

export const getWallet = async(userId) => {
    const response = await instance.get(`http://localhost:8000/user/user-wallet/${userId}`);
    return response;
}
  
// export const getPlayers = async (matchId) => {
//     const response = await instance.get(`/user/fantasy-match/${matchId}`);
//     return response;
// }