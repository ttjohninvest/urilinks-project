import database from "../firebase/firebase";

export const setUsers = (users) => ({
  type: "SET_USERS",
  users,
});

export const startSetUsers = (uid) => {
  console.log("startSetUsers");
  return (dispatch, getState) => {
    const hashtags = [];
   
    //const promises = []
    //promises.push(
      return database
      .ref(`users`)
      .once("value")
      .then((snapshot) => {
         const users2 = [];
        //if(snapshot !== null) {
        snapshot.forEach((childSnapshot) => {
          //console.log("tt,childSnapshot=" + JSON.stringify(childSnapshot));
          console.log(
            "startSetUsers,childSnapshot.key=" + JSON.stringify(childSnapshot.key),
          );

          console.log(
            "startSetUsers,childSnapshot.val()=" + JSON.stringify(childSnapshot.val()),
          );
          
          if(!!childSnapshot.val()===true && !!childSnapshot.val().gud === true)
          users2.push({
            //uid: childSnapshot.key
            gud:childSnapshot.val().gud.gud
          });
          
        })

          console.log("startSetUsers, about to call dispatch(setUsers(users)),users2="+JSON.stringify(users2))
        dispatch(setUsers(users2)); //links2[0].showpublic
        
      //}
      })
      .catch((error) => console.log("error=" + error))
    //)

      // Promise.all(promises).then(()=>{
      //   console.log("startSetUsers, about to call dispatch(setUsers(users)),users2="+JSON.stringify(users2))
      //   dispatch(setUsers(users2)); //links2[0].showpublic
      // })
  }
}