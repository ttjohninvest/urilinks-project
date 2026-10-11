// test("search test is running", () => {
//   expect(true).toBe(true);
// });






jest.mock("../firebase/firebase", () => ({
  firebase: {},
  database: {
    ref: jest.fn()
  },
  googleAuthProvider: {}
}));

jest.mock("./MyInfiniteScroll", () => () => null);
jest.mock("./MyInfiniteScroll3", () => () => null);
jest.mock("./MyInfiniteScroll2", () => () => null);
jest.mock("./MyInfiniteScroll4", () => () => null);
jest.mock("./LinkList", () => () => null);
jest.mock("./LinkListFilters", () => () => null);

// import { getSearchTerm } from "./LinkListFilters";

// test("search term is trimmed", () => {
//   document.body.innerHTML = `
//     <input id="termid" value=" church " />
//   `;

//   expect(getSearchTerm()).toBe("church");
// });

const getSearchTerm = require("./getSearchTerm");

test("search term is trimmed", () => {
  document.body.innerHTML = `
    <input id="termid" value=" church " />
  `;

  expect(getSearchTerm()).toBe("church");
});