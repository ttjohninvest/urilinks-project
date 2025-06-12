// Firebase Storage Url Reducer

const storageReducerDefaultState = "https://firebasestorage.googleapis.com/v0/b/see-my-index-project-7.firebasestorage.app/o/files%2Fbookmarks_6_9_25.html?alt=media&token=6fc9650d-d319-43ab-b2ed-529b3bfcec8b";

export default (state = storageReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_STORAGEURL":
      //return [...state, ...action.hashtags];
      return action.url;
    default:
      return state;
  }
};