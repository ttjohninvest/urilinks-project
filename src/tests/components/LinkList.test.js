import React from "react";
import { shallow } from "enzyme";
import { LinkList } from "../../components/LinkList";
import links from "../fixtures/links";

test("should render LinkList with links", () => {
  const wrapper = shallow(<LinkList links={links} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render LinkList with empty message", () => {
  const wrapper = shallow(<LinkList links={[]} />);
  expect(wrapper).toMatchSnapshot();
});
