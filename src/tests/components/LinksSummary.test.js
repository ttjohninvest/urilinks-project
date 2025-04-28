import React from "react";
import { shallow } from "enzyme";
import { LinksSummary } from "../../components/LinksSummary";

test("should correctly render LinksSummary with 1 link", () => {
  const wrapper = shallow(<LinksSummary linkCount={1} linksTotal={235} />);
  expect(wrapper).toMatchSnapshot();
});

test("should correctly render LinksSummary with multiple links", () => {
  const wrapper = shallow(
    <LinksSummary linkCount={23} linksTotal={23512340987} />
  );
  expect(wrapper).toMatchSnapshot();
});
