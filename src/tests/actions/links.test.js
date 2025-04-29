import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startAddLink,
  addLink,
  editLink,
  startEditLink,
  removeLink,
  startRemoveLink,
  setLinks,
  startSetLinks,
} from "../../actions/links";
import links from "../fixtures/links";
import database from "../../firebase/firebase";

const uid = "thisismytestuid";
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const linksData = {};
  links.forEach(({ id, description, note, amount, createdAt }) => {
    linksData[id] = { description, note, amount, createdAt };
  });
  database
    .ref(`users/${uid}/links`)
    .set(linksData)
    .then(() => done());
});

test("should setup remove link action object", () => {
  const action = removeLink({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_LINK",
    id: "123abc",
  });
});

test("should remove link from firebase", (done) => {
  const store = createMockStore(defaultAuthState);
  const id = links[2].id;
  store
    .dispatch(startRemoveLink({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_LINK",
        id,
      });
      return database.ref(`users/${uid}/links/${id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test("should setup edit link action object", () => {
  const action = editLink("123abc", { note: "New note value" });
  expect(action).toEqual({
    type: "EDIT_LINK",
    id: "123abc",
    updates: {
      note: "New note value",
    },
  });
});

test("should edit link from firebase", (done) => {
  const store = createMockStore(defaultAuthState);
  const id = links[0].id;
  const updates = { amount: 21045 };
  store
    .dispatch(startEditLink(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "EDIT_LINK",
        id,
        updates,
      });
      return database.ref(`users/${uid}/links/${id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val().amount).toBe(updates.amount);
      done();
    });
});

test("should setup add url link action object with provided values", () => {
  const action = addLink(links[2]);
  expect(action).toEqual({
    type: "ADD_LINK",
    link: links[2],
  });
});

test("should add url link to database and store", (done) => {
  const store = createMockStore(defaultAuthState);
  const linkData = {
    description: "Mouse",
    amount: 3000,
    note: "This one is better",
    createdAt: 1000,
  };

  store
    .dispatch(startAddLink(linkData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_LINK",
        link: {
          id: expect.any(String),
          ...linkData,
        },
      });

      return database
        .ref(`users/${uid}/links/${actions[0].link.id}`)
        .once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(linkData);
      done();
    });
});

test("should add url link with defaults to database and store", (done) => {
  const store = createMockStore(defaultAuthState);
  const linkDefaults = {
    description: "",
    amount: 0,
    note: "",
    createdAt: 0,
  };

  store
    .dispatch(startAddLink({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_LINK",
        link: {
          id: expect.any(String),
          ...linkDefaults,
        },
      });

      return database
        .ref(`users/${uid}/links/${actions[0].link.id}`)
        .once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(linkDefaults);
      done();
    });
});

test("should setup set link action object with data", () => {
  const action = setLinks(links);
  expect(action).toEqual({
    type: "SET_LINKS",
    links,
  });
});

test("should fetch the links from firebase", (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetLinks()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_LINKS",
      links,
    });
    done();
  });
});
