const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET":
      return action.data.content;
    case "REMOVE":
      return null;
    default:
      return state;
  }
};

export const setNotificationAction = (content) => ({
  type: "SET",
  data: { content },
});

export const unsetNotificationAction = () => ({
  type: "REMOVE",
});

export default reducer;
