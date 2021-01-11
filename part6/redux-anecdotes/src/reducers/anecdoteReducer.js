const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "VOTE":
      const { anecdoteId } = action.data;
      return state.map((oldAnecdote) =>
        oldAnecdote.id === anecdoteId
          ? {
              ...oldAnecdote,
              votes: oldAnecdote.votes + 1,
            }
          : oldAnecdote
      );
    case "ADD":
      return state.concat(asObject(action.data.content));
    case "INIT":
      return action.data.anecdotes;
    default:
      return state;
  }
};

export const voteAction = (anecdoteId) => ({
  type: "VOTE",
  data: { anecdoteId },
});

export const addAnecdoteAction = (data) => ({
  type: "ADD",
  data,
});

export const initAction = (anecdotes) => ({
  type: "INIT",
  data: { anecdotes },
});

export default reducer;
