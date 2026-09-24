// Links Reducer

const usersReducerDefaultState = [];

export default (state = usersReducerDefaultState, action) => {
  switch (action.type) {

      case "INCREMENT_UPDATE_USERS_SHOW" :
       
      return state.map((user) => {
        if (user.id === action.id) {
          //{ ...state, count: state.count + 1 };
          return {
            ...user,
           show: !!user.show? user.show + 1:1,
          };
        } else {
          return user;
        }
      });

      case "DECREMENT_UPDATE_USERS_SHOW" :
       
      // action.payload should contain the ID or index of the item to toggle
      return state.map((user) => {
        if (user.id === action.id) {
          //{ ...state, count: state.count + 1 };
          return {
            ...user,
           show: !!user.show? user.show - 1:0,
          };
        } else {
          return user;
        }
      });
    
    
      case "DECREMENT_USER_STAR_COUNT":
       return state.map((user) => {
        if (user.id === action.id) {
          //{ ...state, count: state.count + 1 };
          return {
            ...user,
           star: !!user.star? user.star - 1:0,
          };
        } else {
          return user;
        }
      });

     case "INCREMENT_USER_STAR_COUNT":
       return state.map((user) => {
        if (user.id === action.id) {
          //{ ...state, count: state.count + 1 };
          return {
            ...user,
           star: !!user.star? user.star + 1:1,
          };
        } else {
          return user;
        }
      });

      

     case "INCREMENT_USER_LIKES_COUNT":
       return state.map((user) => {
        if (user.id === action.id) {
          //{ ...state, count: state.count + 1 };
          return {
            ...user,
           likes: !!user.likes? user.likes + 1:1,
          };
        } else {
          return user;
        }
      });

        case "DECREMENT_USER_LIKES_COUNT":
       return state.map((user) => {
        if (user.id === action.id) {
          //{ ...state, count: state.count + 1 };
          return {
            ...user,
           likes: !!user.likes? user.likes - 1:0,
          };
        } else {
          return user;
        }
      });
 
     case "INCREMENT_USER_COUNT":
       return state.map((user) => {
        if (user.id === action.id) {
          //{ ...state, count: state.count + 1 };
          return {
            ...user,
           frequency: !!user.frequency? user.frequency + 1:1,
          };
        } else {
          return user;
        }
      });

     case "ARCHIVE_USER":
       return state.map((user) => {
        if (user.id === action.id) {
          return {
            ...user,
            ...action.updates,
          };
        } else {
          return user;
        }
      });
     case "PRIVATE_USER":
       return state.map((user) => {
        if (user.id === action.id) {
          return {
            ...user,
            ...action.updates,
          };
        } else {
          return user;
        }
      });
    case "ADD_USER":
      return [...state, action.user];
    case "REMOVE_USER":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_USER":
      return state.map((user) => {
        if (user.id === action.id) {
          return {
            ...user,
            ...action.updates,
          };
        } else {
          return user;
        }
      });
    case "SET_USERS":
      return action.users;
    
    default:
      return state;
  }
};
