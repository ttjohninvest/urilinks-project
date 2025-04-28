import selectLinksTotal from "../../selectors/links-total";
import links from "../fixtures/links";

test("should return 0 if no links", () => {
  const res = selectLinksTotal([]);
  expect(res).toBe(0);
});

test("should correctly add up a single link", () => {
  const res = selectLinksTotal([links[0]]);
  expect(res).toBe(195);
});

test("should correctly add up multiple links", () => {
  const res = selectLinksTotal(links);
  expect(res).toBe(114195);
});
