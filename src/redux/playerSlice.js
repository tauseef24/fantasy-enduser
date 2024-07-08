import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  matchPlayerList: {},
  selectTeam: [],
  team: [],
};

export const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setMatchPlayerList: (state, action) => {
      state.matchPlayerList = action.payload;
      // console.log(state.matchPlayerList);
    },
    addPlayer: (state, action) => {
      state.selectTeam = [...state.selectTeam, action.payload];
      // console.log(state.selectTeam);
    },
    setDreamTeam: (state, action) => {
      state.team = action.payload;
      console.log("Redux for dream team: ",state.team);
    }
  },
});

export const { setMatchPlayerList, addPlayer, setDreamTeam } = playerSlice.actions;
export default playerSlice.reducer;
