const yourSlice = createSlice({
  name: 'links',
  initialState: { links: [] },
  reducers: {
    toggleItemShow: (state, action) => {
      // action.payload should contain the ID or index of the item to toggle
      state.links = state.links.map((link) => {
        // Use a unique identifier (like item.id) to find the correct object
        if (link.id === action.payload.id) {
          // Create a new object with the toggled property
          return { ...link, show: !link.show };
        }
        return link;
      });
    },
  },
});