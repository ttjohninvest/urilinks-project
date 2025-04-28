import React from "react";
import { shallow } from "enzyme";
import LinkDashboardPage from "../../components/LinkDashboardPage";

test("should render LinkDashboardPage correctly", () => {
  const wrapper = shallow(<LinkDashboardPage />);
  expect(wrapper).toMatchSnapshot();
});
