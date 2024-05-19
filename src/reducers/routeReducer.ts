import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IRouteState {
  route: { name: string; currentBottomRoute: string };
}
const initialState: IRouteState = {
  route: { name: "", currentBottomRoute: "" },
};

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<string>) => {
      state.route.name = action?.payload;
    },
    setBottomRoute: (state, action: PayloadAction<string>) => {
      state.route.currentBottomRoute = action?.payload;
    },
    getRoute: (state) => {
      state.route = state.route;
    },
  },
});
export const { getRoute, setRoute, setBottomRoute } = routeSlice.actions;
export default routeSlice.reducer;
