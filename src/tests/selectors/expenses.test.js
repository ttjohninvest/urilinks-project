import moment from "moment";
import selectLinks from "../../selectors/links";
import links from "../fixtures/links";

test("should filter by text value", () => {
  const filters = {
    text: "e",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined,
  };
  const result = selectLinks(links, filters);
  expect(result).toEqual([links[2], links[1]]);
});

test("should filter by startDate", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: moment(0),
    endDate: undefined,
  };
  const result = selectLinks(links, filters);
  expect(result).toEqual([links[2], links[0]]);
});

test("should filter by endDate", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: moment(0).add(2, "days"),
  };
  const result = selectLinks(links, filters);
  expect(result).toEqual([links[0], links[1]]);
});

test("should sort by date", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined,
  };
  const result = selectLinks(links, filters);
  expect(result).toEqual([links[2], links[0], links[1]]);
});

test("should sort by amount", () => {
  const filters = {
    text: "",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined,
  };
  const result = selectLinks(links, filters);
  expect(result).toEqual([links[1], links[2], links[0]]);
});
