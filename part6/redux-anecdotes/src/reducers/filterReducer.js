const initialState = "";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.data.filter;
    default:
      return state;
  }
};

export const setAction = (filter) => ({
  type: "SET_FILTER",
  data: { filter },
});

export default reducer;
