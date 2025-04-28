import React from "react";
import { shallow } from "enzyme";
import links from "../fixtures/links";
import LinkListItem from "../../components/LinkListItem";

test("should render LinkListItem correctly", () => {
  const wrapper = shallow(<LinkListItem {...links[0]} />);
  expect(wrapper).toMatchSnapshot();
});
