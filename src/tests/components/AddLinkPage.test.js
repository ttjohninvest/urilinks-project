import React from "react";
import { shallow } from "enzyme";
import { AddLinkPage } from "../../components/AddLinkPage";
import links from "../fixtures/links";

let startAddLink, history, wrapper;

beforeEach(() => {
  startAddLink = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <AddLinkPage startAddLink={startAddLink} history={history} />
  );
});

test("should render AddLinkPage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit", () => {
  wrapper.find("LinkForm").prop("onSubmit")(links[1]);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startAddLink).toHaveBeenLastCalledWith(links[1]);
});
