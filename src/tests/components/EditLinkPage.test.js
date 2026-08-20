import React from "react";
import { shallow } from "enzyme";
import links from "../fixtures/links";
import { EditLinkPage } from "../../components/EditLinkPage";

let startEditLink, startRemoveLink, history, wrapper;

beforeEach(() => {
  startEditLink = jest.fn();
  startRemoveLink = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditLinkPage
      startEditLink={startEditLink}
      startRemoveLink={startRemoveLink}
      history={history}
      link={links[2]}
      //handleClose2={handleClose2}
    />
  );
});

test("should render EditLinkPage", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle startEditLink", () => {
  wrapper.find("LinkForm").prop("onSubmit")(links[2]);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startEditLink).toHaveBeenLastCalledWith(links[2].id, links[2]);
});

test("should handle startRemoveLink", () => {
  wrapper.find("button").simulate("click");
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startRemoveLink).toHaveBeenLastCalledWith({
    id: links[2].id,
  });
});
