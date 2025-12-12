const peopleReducerDefaultState = [];

export default (state = peopleReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_PEOPLE":
      return [...state, action.person];
    case "REMOVE_PEOPLE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_PEOPLE":
      return state.map((person) => {
        if (person.id === action.id) {
          return {
            ...person,
            ...action.updates,
          };
        } else {
          return person;
        }
      });
    case "SET_PEOPLE":
      return action.people;
    default:
      return state;
  }
};
