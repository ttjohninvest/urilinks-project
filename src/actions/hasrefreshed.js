export const setHasrefreshed = (hasrefreshed) => ({
  type: "ADD_HASREFRESHED",
  hasrefreshed,
});

const startSetHasrefreshed = (hasrefreshed = {}) => {
    return (dispatch, getState) => {
   

    return (
       dispatch(
            setHasrefreshed({
              ...hasrefreshed,
            })
          )
    );
  };
};

export default startSetHasrefreshed;