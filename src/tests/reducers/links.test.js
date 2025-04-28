import linksReducer from "../../reducers/links";
import links from "../fixtures/links";

test("should set default state", () => {
  const state = linksReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should remove link by id", () => {
  const action = {
    type: "REMOVE_LINK",
    id: links[1].id,
  };
  const state = linksReducer(links, action);
  expect(state).toEqual([links[0], links[2]]);
});

test("should not remove links if id not found", () => {
  const action = {
    type: "REMOVE_LINK",
    id: "-1",
  };
  const state = linksReducer(links, action);
  expect(state).toEqual(links);
});

test("should add an link", () => {
  const link = {
    id: "109",
    description: "Laptop",
    note: "",
    createdAt: 20000,
    amount: 29500,
  };
  const action = {
    type: "ADD_LINK",
    link,
  };
  const state = linksReducer(links, action);
  expect(state).toEqual([...links, link]);
});

test("should edit an link", () => {
  const amount = 122000;
  const action = {
    type: "EDIT_LINK",
    id: links[1].id,
    updates: {
      amount,
    },
  };
  const state = linksReducer(links, action);
  expect(state[1].amount).toBe(amount);
});

test("should not edit an link if id not found", () => {
  const amount = 122000;
  const action = {
    type: "EDIT_LINK",
    id: "-1",
    updates: {
      amount,
    },
  };
  const state = linksReducer(links, action);
  expect(state).toEqual(links);
});

test("should set links", () => {
  const action = {
    type: "SET_LINKS",
    links: [links[1]],
  };
  const state = linksReducer(links, action);
  expect(state).toEqual([links[1]]);
});
