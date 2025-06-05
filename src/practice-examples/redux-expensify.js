import { createStore, combineReducers } from "redux";
import uuid from "uuid";

// ADD_LINK
const addLink = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: "ADD_LINK",
  link: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

// REMOVE_LINK
const removeLink = ({ id } = {}) => ({
  type: "REMOVE_LINK",
  id,
});

// EDIT_LINK
const editLink = (id, updates) => ({
  type: "EDIT_LINK",
  id,
  updates,
});

// SET_TEXT_FILTER
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text,
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE",
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT",
});

// SET_START_DATE
const setStartDate = (startDate) => ({
  type: "SET_START_DATE",
  startDate,
});

// SET_END_DATE
const setEndDate = (endDate) => ({
  type: "SET_END_DATE",
  endDate,
});

// Links Reducer

const linksReducerDefaultState = [];

const linksReducer = (state = linksReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_LINK":
      return [...state, action.link];
    case "REMOVE_LINK":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_LINK":
      return state.map((link) => {
        if (link.id === action.id) {
          return {
            ...link,
            ...action.updates,
          };
        } else {
          return link;
        }
      });
    default:
      return state;
  }
};

// Filters Reducer

const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined,
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text,
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount",
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date",
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate,
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate,
      };
    default:
      return state;
  }
};

// Get visible links
const getVisibleLinks = (links, { text, sortBy, startDate, endDate }) => {
  return links
    .filter((link) => {
      const startDateMatch =
        typeof startDate !== "number" || link.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || link.createdAt <= endDate;
      const textMatch = link.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

// Store creation

const store = createStore(
  combineReducers({
    links: linksReducer,
    filters: filtersReducer,
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleLinks = getVisibleLinks(state.links, state.filters);
  console.log(visibleLinks);
});

const linkOne = store.dispatch(
  addLink({ description: "Rent", amount: 100, createdAt: -21000 })
);
const linkTwo = store.dispatch(
  addLink({ description: "Coffee", amount: 300, createdAt: -1000 })
);

// store.dispatch(removeLink({ id: linkOne.link.id }));
// store.dispatch(editLink(linkTwo.link.id, { amount: 500 }));

// store.dispatch(setTextFilter('ffe'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0)); // startDate 125
// store.dispatch(setStartDate()); // startDate undefined
// store.dispatch(setEndDate(999)); // endDate 1250

const demoState = {
  links: [
    {
      id: "poijasdfhwer",
      description: "January Rent",
      note: "This was the final payment for that address",
      amount: 54500,
      createdAt: 0,
    },
  ],
  filters: {
    text: "rent",
    sortBy: "amount", // date or amount
    startDate: undefined,
    endDate: undefined,
  },
};
