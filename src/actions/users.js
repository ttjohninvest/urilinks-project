export const setUsers = (users) => ({
  type: "SET_USERS",
  users,
});

export const startSetOtherUsers = (uid) => {
  console.log("startSetOtherUsers");
  return (dispatch, getState) => {
    const hashtags = [];

    return database
      .ref(`users`)
      .once("value")
      .then((snapshot) => {
        const users2 = [];

        //console.log("snapshot=" + JSON.stringify(snapshot));
        snapshot.forEach((childSnapshot) => {
          console.log("tt,childSnapshot=" + JSON.stringify(childSnapshot));
          console.log(
            "tt,childSnapshot.key=" + JSON.stringify(childSnapshot.key),
          );
          console.log(
            "tt,childSnapshot.val()=" + JSON.stringify(childSnapshot.val()),
          );
          
          users2.push({
            id: childSnapshot.key,
            ...aval //...childSnapshot.val(),
          });
        });
        console.log("435634, startSetUsers, about to call dispatch(setUsers(users)),users2="+JSON.stringify(users2))
        dispatch(setUsers(users2)); //links2[0].showpublic

      })
      .catch((error) => console.log("error=" + error));
  };
};